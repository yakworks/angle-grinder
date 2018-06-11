app = angular.module "angleGrinder.gridz"
# Uses to show edit panel for grid row. Supports dbl click on grid cell.
app.directive "gridCrud", ["$controller", "$timeout", ($controller, $timeout) ->
  {
    restrict: "A"
    replace: true
    scope: true
    template: '<div  ng-show="showForm"><ng-include ng-if="!isModal" src="template | withContext"></ng-include></div>'
    link: (scope, element, attrs) ->
      gridEl = angular.element(document.querySelectorAll("[ag-grid-name=#{attrs.gridName}]")).find("table.gridz")
      clicks = () ->
        gridEl.jqGrid('setGridParam', ondblClickRow: scope.dblClick)
        if attrs.keyboardnav is true or attrs.keyboardnav is 'true'
          colNames = gridEl.jqGrid('getGridParam','colNames')
          gridEl.bind("keydown", (event)->
            if scope.lastSelectedRow
              if event.which isnt 13
                scope.unHighlightCell(scope.lastSelectedRow, scope.lastSelectedCell)
              ids = gridEl.jqGrid('getDataIDs')
              firstId = ids[0]
              lastId = ids[ids.length-1]
              switch event.which
                when 13 #enter
                  scope.dblClick(scope.lastSelectedRow, null, scope.lastSelectedCell, event)
                when 40 #down
                  if scope.lastSelectedRow isnt lastId
                    scope.lastSelectedRow = ids[ids.indexOf(scope.lastSelectedRow) + 1]
                when 38 #up
                  if scope.lastSelectedRow isnt firstId
                    scope.lastSelectedRow = ids[ids.indexOf(scope.lastSelectedRow) - 1]
                when 39 #right
                  scope.lastSelectedCell++ unless (scope.lastSelectedCell is colNames.length)
                when 37 #left
                  scope.lastSelectedCell-- unless (scope.lastSelectedCell is 0)
            scope.highlightCell(scope.lastSelectedRow, scope.lastSelectedCell)
          )
      attrs.$observe("gridCrud", clicks)
      scope.isModal = attrs.isModal is true or attrs.isModal is 'true'

      ctrlLocals =
        $scope: scope
        $element: element
        $attrs: attrs

      controllerName = if attrs.controller then attrs.controller else "GridCrudCtrl"
      $controller(controllerName, ctrlLocals)

      scope.$watch(
        () ->
          scope.showForm or false
        (newVal) ->
          if newVal
            $timeout ->
              scope.setFocus(element)
      )
  }
]

class @GridCrudCtrl
  #Controller for gridCrud directive
  @$inject = ["$scope", "$element", "$attrs",  "$parse", "$log", "resourceBuilder", "$window", "restrictResource", "$uibModal", "pathWithContext", "$timeout"]
  constructor: ($scope, $element, $attrs, $parse, $log, resourceBuilder, $window, restrictResource, $uibModal, pathWithContext, $timeout) ->

    Resource = null
    beforeSave = null
    afterSave = null
    $scope.lastSelectedRow = null
    $scope.lastSelectedCell = null

    if $attrs.beforeSave then beforeSave = $scope[$attrs.beforeSave]
    if $attrs.afterSave then afterSave = $scope[$attrs.afterSave]

    resourceName = $attrs.resource
    Resource = resourceBuilder("/#{resourceName}", resourceName)
    actionSuffix = resourceName.charAt(0).toUpperCase() + resourceName.substring(1)

    $scope.template = $attrs.template

    grid =  -> $parse($attrs.gridName)($scope)

    allowedFields = $parse($attrs.allowedFields)($scope)

    hideForm = () ->
      if $scope.isModal
        $scope.modal.close()
      else
        $scope.showForm = false
      $scope.highlightCell($scope.lastSelectedRow, $scope.lastSelectedCell)

    showForm = ->
      if $scope.isModal
        defaultModalOptions =
          templateUrl: pathWithContext($scope.template)
          keyboard: false # do not close the dialog with ESC key
          backdrop: "static" # do not close on click outside of the dialog
          scope: $scope
          windowClass: ""
        modalOptions = angular.fromJson($attrs.modalOptions)
        modalOptions = angular.extend(defaultModalOptions, modalOptions)
        modalOptions.windowClass = modalOptions.windowClass + " grid-crud-modal "

        $scope.modal = $uibModal.open(
          modalOptions
        )
        $scope.modal.rendered.then ->
          $timeout ->
            $scope.setFocus(angular.element angular.element(".grid-crud-modal")[0])
          ,
            500
      else
        $scope.showForm = true

    editAction = (id) ->
      $scope.unHighlightCell($scope.lastSelectedRow, $scope.lastSelectedCell)
      $log.info "[gridCrud] Edit #{resourceName} : #{id}"
      $scope.lastSelectedRow = id
      record = Resource.get {id: id}, (r) ->
        $scope[resourceName] = restrictResource(r, allowedFields)
        showForm()

    createAction =() ->
      $log.info "[gridCrud] Create #{resourceName}"
      record = new Resource()
      $scope[resourceName] = record
      showForm()

    $scope.save = (record) =>
      $log.info "[gridCrud] Saving record"
      if beforeSave
        $log.info "[gridCrud] Calling beforeSave: #{resourceName}"
        beforeSave(record)

      promise = record.save().$promise
      promise.then (record) ->
        $log.info "[gridCrud] record has been updated/created", record
        grid().saveRow(record.id, record)
        hideForm()
        if(afterSave)
          $log.info "[gridCrud] Calling afterSave: #{resourceName}"
          afterSave(record)
        $scope.highlightCell($scope.lastSelectedRow, $scope.lastSelectedCell)

      return [promise, record]

    $scope.highlightCell = (rowid, colname) ->
      grid().getGridEl().jqGrid('setCell', rowid, colname, "",  {"border-color": "green", "border-width": "thin", "border-style": "double"})
      null

    $scope.unHighlightCell = (rowid, colname) ->
      grid().getGridEl().jqGrid('setCell', rowid, colname, "",  {"border-width": "0px"})
      null

    $scope.cancel = () ->
      hideForm()

    $scope.dblClick = (rowid, iRow, iCol, e) ->
      options = $scope["#{e?.currentTarget?.id}"].getGridEl().getGridParam()
      if options.editable is false
        return
      colModel = options.colModel
      $scope.columnNameForFocus = colModel[iCol]?["name"]
      editAction(rowid)
      $scope.lastSelectedCell = iCol

    $scope.setFocus = (element) ->
      if $scope.columnNameForFocus # check if variable exists
        inputs = element.find("input")
        for input in inputs
          if input.name.toUpperCase() is $scope.columnNameForFocus.toUpperCase()
            input.focus()
            input.select()

        element.find("[id='s2id_#{$scope.columnNameForFocus}']").select2("open")
        $scope.columnNameForFocus = null

    $parse("edit#{actionSuffix}").assign($scope.$parent, editAction)
    $parse("create#{actionSuffix}").assign($scope.$parent, createAction)

angular.module("angleGrinder.gridz").controller("GridCrudCtrl", GridCrudCtrl)
