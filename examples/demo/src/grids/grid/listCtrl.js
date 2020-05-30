import exampleGridOptions from "../exampleGridOptions"

/*
  Example with resource based on grails based endpoint names
  data is retrived from mocker
*/

/* @ngInject */
export default class ListCtrl {
  constructor($scope, resourceBuilder, DialogCrudCtrlMixin) {
    this.$scope = $scope
    this.resourceBuilder = resourceBuilder
    this.DialogCrudCtrlMixin = DialogCrudCtrlMixin
  }

  $onInit() {
    const Invoices = this.resourceBuilder('/invoices', 'invoice')

    this.DialogCrudCtrlMixin(this.$scope, {
      Resource: Invoices,
      gridName: 'exampleGrid',
      template: require('../commonComponents/form/formDialog.html')
    })
  }

  gridOptions = exampleGridOptions({
    path: '/invoices'
  })

  getSelectedRowsData() {
    this.selectedRowsData = this.$scope.exampleGrid.getSelectedRows()
  }
}
