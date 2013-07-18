gridz = angular.module("angleGrinder.gridz", ["ui.bootstrap"])

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

      $scope.$on "itemDeleted", (event, item) ->
        $grid.jqGrid "delRowData", item.id

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

# TODO move it to the forms module
class EditItemCtrl
  @$inject = ["$scope", "$rootScope", "$log", "dialog", "item", "flatten"]
  constructor: ($scope, $rootScope, $log, dialog, item, flatten) ->
    $scope.item = item
    $scope.createNew = not item.persisted()

    $scope.serverValidationErrors = {}

    # Closes the dialog
    $scope.closeEditDialog = ->
      $log.info "Closing the dialog"
      dialog.close($scope.item)

    # If form is valid performs server side update
    $scope.save = (item) ->
      if $scope.editForm.$valid
        $log.info "The form is valid", $scope.editForm

        $scope.saving = true
        $scope.serverValidationErrors = {}

        onSuccess = (response) ->
          $scope.saving = false
          $log.info "Item has been updated/created", response

          # Flattening the object before insering it to the grid
          $rootScope.$broadcast "itemUpdated", flatten(response)
          $scope.closeEditDialog()

        onError = (response) ->
          $scope.saving = false

          $log.error "Something went wront", response
          if response.status is 422
            errors = response.data.errors
            $scope.serverValidationErrors = errors
            $log.error "Server side validation errors", errors

        item.save success: onSuccess, error: onError
      else
        $log.warn "The form is invalid", $scope.editForm

    # Performs server side delete
    $scope.delete = ->
      $scope.deleting = true

      onSuccess = (response) ->
        $scope.deleting = false
        $log.info "Item has been deleted", response

        $rootScope.$broadcast "itemDeleted", item
        $scope.closeEditDialog()

      onError = (response) ->
        $scope.deleting = false
        $log.error "Something went wront", response

      item.delete success: onSuccess, error: onError

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

class ConfirmationDialogCtrl
  @$inject = ["$scope", "$log", "dialog", "message"]
  constructor: ($scope, $log, dialog, message) ->
    $scope.message = message
    $scope.close = (confirmed) ->
      $log.info "Confirmation dialog closed", confirmed
      dialog.close(confirmed)

gridz.controller "ConfirmationDialogCtrl", ConfirmationDialogCtrl

# TODO temporaty cache the templete
# TODO cache templates for this module
gridz.run ["$templateCache", ($templateCache) ->
  $templateCache.put "templates/dialogs/confirmation.html", """
    <div class="modal-body">{{message}}</div>
    <div class="modal-footer">
     <button class="btn" ng-click="close(false)">Cancel</button>
      <button class="btn btn-primary" ng-click="close(true)">OK</button>
    </div>
  """
]

class ConfirmationDialog
  @$inject = ["$dialog", "$log"]
  constructor: (@$dialog, @$log) ->

  open: (message = null) ->
    @$log.info "Opening confirmation dialog, message:", message

    dialog = @$dialog.dialog
      resolve:
        message: -> if message? then message else "Are you sure?"

    dialog.open "templates/dialogs/confirmation.html", "ConfirmationDialogCtrl"

gridz.service "confirmationDialog", ConfirmationDialog

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
