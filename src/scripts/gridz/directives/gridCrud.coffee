app = angular.module "angleGrinder.gridz"
# Uses to show edit panel for grid row. Supports dbl click on grid cell.
app.directive "gridCrud", ["$controller", "$timeout", ($controller, $timeout) ->
  {
    restrict: "A"
    replace: true
    scope: true
    template: '<div ng-show="showForm"><ng-include src="template | withContext"></ng-include></div>'
    link: (scope, element, attrs) ->
      clicks = () ->
        gridEl = angular.element(document.querySelectorAll("[ag-grid-name=#{attrs.gridName}]")).find("table.gridz")
        gridEl.jqGrid('setGridParam', ondblClickRow: scope.dblClick)
      attrs.$observe("gridCrud", clicks)

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
  @$inject = ["$scope", "$element", "$attrs",  "$parse", "$log", "resourceBuilder", "$window", "restrictResource"]
  constructor: ($scope, $element, $attrs,  $parse, $log, resourceBuilder, $window, restrictResource) ->

    Resource = null
    beforeSave = null
    afterSave = null

    if $attrs.beforeSave then beforeSave = $scope[$attrs.beforeSave]
    if $attrs.afterSave then afterSave = $scope[$attrs.afterSave]

    resourceName = $attrs.resource
    Resource = resourceBuilder("/#{resourceName}", resourceName)
    actionSuffix = resourceName.charAt(0).toUpperCase() + resourceName.substring(1)

    $scope.template = $attrs.template

    grid =  -> $parse($attrs.gridName)($scope)

    allowedFields = $parse($attrs.allowedFields)($scope)

    hideForm = () -> $scope.showForm = false

    showForm = -> $scope.showForm = true

    editAction = (id) ->
      $log.info "[gridCrud] Edit #{resourceName} : #{id}"
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

      return [promise, record]

    $scope.cancel = () ->
      hideForm()

    $scope.dblClick = (rowid, iRow, iCol, e) ->
      $scope.columnNameForFocus = $scope["#{e.currentTarget.id}"].getGridEl().getGridParam().colModel[iCol]["name"]
      editAction(rowid)

    $scope.setFocus = (element) ->
      if $scope.columnNameForFocus # check if variable exists
        inputs = element.find("input")
        for input in inputs
          input.focus() if input.name.toUpperCase() is $scope.columnNameForFocus.toUpperCase()



    $parse("edit#{actionSuffix}").assign($scope.$parent, editAction)
    $parse("create#{actionSuffix}").assign($scope.$parent, createAction)

angular.module("angleGrinder.gridz").controller("GridCrudCtrl", GridCrudCtrl)
