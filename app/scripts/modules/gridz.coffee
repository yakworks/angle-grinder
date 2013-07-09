gridz = angular.module("angleGrinder.gridz", ["ui.bootstrap"])

gridz.directive "agGrid", ->
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

    $scope.$on "searchUpdated", (event, filter, currentScope = null) ->
      currentScope?.searching = true

      $grid.setGridParam(
        search: true
        postData: filters: JSON.stringify(filter)
      ).trigger "reloadGrid"

      currentScope?.searching = false

  restrict: "A"
  template: """
            <table id="grid"></table>
            <div id="gridPager"></div>
            """
  link: link

class EditItemCtrl

  @$inject = ["$scope", "$rootScope", "dialog", "item", "createNew", "flatten"]
  constructor: ($scope, $rootScope, dialog, item, createNew, flatten) ->
    $scope.item = item
    $scope.createNew = createNew

    $scope.closeEditDialog = ->
      dialog.close($scope.item)

    $scope.save = ->
      item.save (response) ->
        # Flattening the object before insering it to the grid
        $rootScope.$broadcast("itemUpdated", flatten(response))
        $scope.closeEditDialog()

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
