/* @ngInject */
export default class MassUpdateFormCtrl {
  constructor($scope, massUpdateFormCtrlMixin, dialog, Resource, selectedIds, grid) {
    $scope.records = { timeZone: 'UTC' }

    massUpdateFormCtrlMixin($scope, {
      dialog,
      Resource,
      selectedIds,
      grid
    }
    )
  }
}
