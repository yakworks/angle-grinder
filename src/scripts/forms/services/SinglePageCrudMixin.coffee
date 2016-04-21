mixin = angular.module("angleGrinder.forms")

mixin.factory "SinglePageCrudCtrlMixin", [
  "$log", "$location", "DialogCrudCtrlMixin",
  ($log, $location, DialogCrudCtrlMixin) ->
    ($scope, args = {}) ->
      {resourcePath, gridName, Resource} = args

      # include `deleteRecord` method
      DialogCrudCtrlMixin $scope,
        gridName: gridName
        Resource: Resource

      # unset `createRecord` method from the parent mixin
      $scope.createRecord = angular.noop

      # Generic method navigating to the show record page
      $scope.showRecord = (id) ->
        showRecordPath = [resourcePath, id].join("/")
        $location.path(showRecordPath)

      # Generic method navigating to the edit item page
      $scope.editRecord = (id) ->
        editRecordPath = [resourcePath, id, "edit"].join("/")
        $location.path(editRecordPath)

]
