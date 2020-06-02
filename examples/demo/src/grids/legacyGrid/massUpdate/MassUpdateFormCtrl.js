/* @ngInject */
export default class MassUpdateFormCtrl {
  constructor($scope, massUpdateFormCtrlMixin, $uibModalInstance, resourceBuilder, selectedIds, grid, extraParams) {

    const Resource = resourceBuilder("/invoices")
    massUpdateFormCtrlMixin($scope, {
        dialog: $uibModalInstance,
        Resource,
        selectedIds,
        grid
      }
    )
  }
}
