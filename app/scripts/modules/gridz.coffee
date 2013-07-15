gridz = angular.module("angleGrinder.gridz", ["ui.bootstrap"])

gridz.value "defaultValidationMessages",
  required: "This field is required"
  mismatch: "Does not match the confirmation"
  minlength: "Too short"

gridz.directive "agGrid", [
  "hasSearchFilters", (hasSearchFilters) ->
    link = ($scope, element, attrs) ->
      $grid = $("#grid", element)

      gridOptions = $scope.$eval(attrs.agGrid)
      $grid.gridz(gridOptions)

      invokeEditItemDialogFor = (id) ->
        $scope.$apply -> $scope.editDialog id

      # handles click on edit action insite the dropdown menu
      $grid.on "editAction", (event, id) ->
        event.preventDefault()
        invokeEditItemDialogFor(id)

      # handles click on the cell with `editActionLink` formatter
      $grid.on "click", "a.editActionLink", (event) ->
        event.preventDefault()
        id = $(this).parents("tr:first").attr("id")
        invokeEditItemDialogFor(id)

      $grid.on "deleteAction", (event, id) ->
        event.preventDefault()
        $scope.$apply -> $scope.deleteItem id

      # catch broadcast event after save. This will need to change
      $scope.$on "itemUpdated", (event, data) ->
        if $grid.jqGrid("getInd", data.id)
          $grid.jqGrid "setRowData", data.id, data
        else
          $grid.jqGrid "addRowData", data.id, data, "first"

        # flash the row so user knows its updated
        ind = $grid[0].rows.namedItem(data.id)
        $(ind).css "background-color", "#DFF0D8"
        $(ind).delay(100).fadeOut("medium", ->
          $(ind).css "background-color", ""
        ).fadeIn "fast"

      $scope.$on "itemDeleted", ->
        $grid.trigger "reloadGrid"

      $scope.$on "searchUpdated", (event, filters) ->
        params =
          search: hasSearchFilters(filters)
          postData: filters: JSON.stringify(filters)

        $grid.setGridParam(params).trigger "reloadGrid"

    restrict: "A"
    template: """
              <table id="grid"></table>
              <div id="gridPager"></div>
              """
    link: link
]

gridz.directive "fieldGroup", ->
  restrict: "A"
  require: "^form"
  replace: true
  transclude: true
  template: """
    <div class="control-group" ng-transclude></div>
  """

  link: ($scope, element, attrs, ctrl) ->
    formName = ctrl.$name
    fields = (attrs["for"] or "").split(",")

    watchExpression = (formName, fields) ->
      conditions = []
      for field in fields
        conditions.push "(#{formName}.#{field}.$dirty && #{formName}.#{field}.$invalid)"
      conditions.join(" || ")

    $scope.$watch watchExpression(formName, fields), ->
      allPristine = true
      allValid = true

      for field in fields
        $field = $scope[formName][field]

        allPristine = allPristine and $field.$pristine
        allValid = allValid and $field.$valid

      return if allPristine
      
      if allValid
        element.removeClass("error")
      else
        element.addClass("error")

gridz.directive "validationError", [
  "defaultValidationMessages", (defaultValidationMessages) ->
    restrict: "E"
    require: "^form"
    transclude: false

    link: ($scope, element, attrs, ctrl) ->
      formName = ctrl.$name
      fieldName = attrs["for"]

      expression = "#{formName}.#{fieldName}.$dirty && #{formName}.#{fieldName}.$invalid"
      $scope.$watch expression, ->
        $field = $scope[formName][fieldName]

        html = ""
        if $field.$dirty and $field.$invalid
          for error, invalid of $field.$error
            if invalid
              message = attrs[error] || defaultValidationMessages[error]

              if message?
                html += """
                  <span class="help-inline">#{message}</span>
                """

        element.html(html)
]

class EditItemCtrl

  @$inject = ["$scope", "$rootScope", "$log", "dialog", "item", "createNew", "flatten"]
  constructor: ($scope, $rootScope, $log, dialog, item, createNew, flatten) ->
    $scope.item = item
    $scope.createNew = createNew

    # Closes the dialog
    $scope.closeEditDialog = ->
      $log.info "Closing the dialog"
      dialog.close($scope.item)

    # If form is valid performs server side update
    $scope.save = ->
      if $scope.editForm.$valid
        $log.info "The form is valid", $scope.editForm
        item.save (response) ->
          $log.info "Updating item", item

          # Flattening the object before insering it to the grid
          $rootScope.$broadcast("itemUpdated", flatten(response))
          $scope.closeEditDialog()
      else
        $log.warn "The form is invalid", $scope.editForm

gridz.controller "EditItemCtrl", EditItemCtrl

class EditDialog
  @$inject = ["$dialog"]
  constructor: (@$dialog) ->

  open: (templateUrl, item) ->
    dialog = @$dialog.dialog
      backdropFade: false
      dialogFade: false
      resolve:
        item: -> item
        createNew: -> not item.id?

    # override so we can intercept form dirty and prevent escape
    dialog.handledEscapeKey = (e) ->
      if e.which is 27
        e.preventDefault()
        unless dialog.$scope.editForm.$dirty
          dialog.close()
          dialog.$scope.$apply()

    # override so we can intercept form dirty and prevent backdrop click
    dialog.handleBackDropClick = (e) ->
      e.preventDefault()
      unless dialog.$scope.editForm.$dirty
        dialog.close()
        dialog.$scope.$apply()

    dialog.open templateUrl, "EditItemCtrl"

gridz.service "editDialog", EditDialog

flatten = (target, opts = { delimiter: "." }) ->
  delimiter = opts.delimiter

  getKey = (key, prev) ->
    (if prev then prev + delimiter + key else key)

  step = (object, prev) ->
    Object.keys(object).forEach (key) ->
      isarray = opts.safe and Array.isArray(object[key])
      type = Object::toString.call(object[key])
      isobject = (type is "[object Object]" or type is "[object Array]")
      return step(object[key], getKey(key, prev)) if not isarray and isobject
      output[getKey(key, prev)] = object[key]

  output = {}
  step target
  output

# Takes a nested Javascript object and flatten it.
# see: https://github.com/hughsk/flat
gridz.value "flatten", flatten

# Retunrs true if `filters` contain at least one non-empty search field
hasSearchFilters = (filters) ->
  for _, value of filters
    return true if value? and value.trim() isnt ""
  return false

gridz.value "hasSearchFilters", hasSearchFilters

# Custom validation directive for fields match.
# Might be used for password confirmation validation.
gridz.directive "match", ->
  require: "ngModel"
  link: (scope, elem, attrs, ctrl) ->
    validateEqual = (value, otherValue) ->
      if value is otherValue
        ctrl.$setValidity "mismatch", true
        return value
      else
        ctrl.$setValidity "mismatch", false

    scope.$watch attrs.match, (otherValue) ->
      validateEqual(ctrl.$viewValue, otherValue)

    ctrl.$parsers.unshift (value) ->
      otherValue = scope.$eval(attrs.match)
      validateEqual(value, otherValue)

    ctrl.$formatters.unshift (value) ->
      validateEqual(value, scope.$eval(attrs.match))
