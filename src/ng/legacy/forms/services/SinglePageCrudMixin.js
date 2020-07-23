import formsModule from '../formsModule'

var mixin = angular.module(formsModule)

mixin.factory('SinglePageCrudCtrlMixin', [
  '$log', '$location', 'DialogCrudCtrlMixin',
  ($log, $location, DialogCrudCtrlMixin) => function($scope, args) {
    if (args == null) { args = {} }
    const { resourcePath, gridName, Resource } = args

    // include `deleteRecord` method
    DialogCrudCtrlMixin($scope, {
      gridName,
      Resource
    }
    )

    // unset `createRecord` method from the parent mixin
    $scope.createRecord = angular.noop

    // Generic method navigating to the show record page
    $scope.showRecord = function(id) {
      const showRecordPath = [resourcePath, id].join('/')
      return $location.path(showRecordPath)
    }

    // Generic method navigating to the edit item page
    return $scope.editRecord = function(id) {
      const editRecordPath = [resourcePath, id, 'edit'].join('/')
      return $location.path(editRecordPath)
    }
  }

])
