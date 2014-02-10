mixin = angular.module("angleGrinder.forms")

mixin.factory "singlePageCrudCtrlMixin", [
  "$log", "$location", "dialogCrudCtrlMixin",
  ($log, $location, dialogCrudCtrlMixin) ->
    ($scope, args = {}) ->
      {resourcePath, gridName, Resource} = args

      # include `deleteItem` method
      dialogCrudCtrlMixin $scope,
        gridName: gridName
        Resource: Resource

      # unset `createItem` method from the parent mixin
      $scope.createItem = angular.noop

      # Generic method navigating to the show item page
      $scope.showItem = (id) ->
        showItemPath = [resourcePath, id].join("/")
        $location.path(showItemPath)

      # Generic method navigating to the edit item page
      $scope.editItem = (id) ->
        editItemPath = [resourcePath, id, "edit"].join("/")
        $location.path(editItemPath)

]
