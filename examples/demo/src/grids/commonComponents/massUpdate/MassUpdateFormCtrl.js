/* @ngInject */
export default class MassUpdateFormCtrl {
  constructor($scope, massUpdateFormCtrlMixin, $uibModalInstance, resourceBuilder, selectedIds, grid, extraParams) {
    const Resource = resourceBuilder("/invoices")
    massUpdateFormCtrlMixin(this, {
        dialog: $uibModalInstance,
        Resource,
        selectedIds,
        grid
      }
    )
  }
}
