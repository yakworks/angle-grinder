import exampleGridOptions from "../exampleGridOptions"
import MassUpdateFormCtrl from "../commonComponents/massUpdate/MassUpdateFormCtrl";

/*
  Example with resource based on grails based endpoint names
  data is retrived from mocker
*/

/* @ngInject */
export default class ListCtrl {
  constructor($scope, resourceBuilder, DialogCrudCtrlMixin, MassUpdateMixin) {
    this.$scope = $scope
    this.resourceBuilder = resourceBuilder
    this.DialogCrudCtrlMixin = DialogCrudCtrlMixin
    this.MassUpdateMixin = MassUpdateMixin
  }

  $onInit() {
    const Invoices = this.resourceBuilder('/invoices', 'invoice')

    this.DialogCrudCtrlMixin(this.$scope, {
      Resource: Invoices,
      gridName: 'exampleGrid',
      template: require('../commonComponents/form/formDialog.html')
    })

    this.MassUpdateMixin(this.$scope, {
      template: require('../commonComponents/massUpdate/massUpdateForm.html'),
      controller: MassUpdateFormCtrl,
      gridName: 'exampleGrid'
    })
  }

  gridOptions = exampleGridOptions({
    path: '/invoices'
  })

  getSelectedRowsData() {
    this.selectedRowsData = this.$scope.exampleGrid.getSelectedRows()
  }
}
