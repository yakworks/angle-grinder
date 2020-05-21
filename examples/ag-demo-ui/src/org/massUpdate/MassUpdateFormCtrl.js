/* @ngInject */
export default class MassUpdateFormCtrl {
  constructor($scope, massUpdateFormCtrlMixin, $uibModalInstance, resourceBuilder, selectedIds, grid, extraParams) {
    $scope.records = { timeZone: 'UTC' }
    massUpdateFormCtrlMixin($scope, {
      dialog: $uibModalInstance,
      Resource: resourceBuilder('/org'),
      selectedIds,
      grid
    }
    )
  }
}
