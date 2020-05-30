import { generateData } from '../dataGenerator'

/*
  Example with resource based on grails based endpoint names
*/

/* @ngInject */
export default class ListCtrl {
  constructor($scope, exampleGridOptions, resourceBuilder, DialogCrudCtrlMixin) {
    this.$scope = $scope
    this.exampleGridOptions = exampleGridOptions
    this.resourceBuilder = resourceBuilder
    this.DialogCrudCtrlMixin = DialogCrudCtrlMixin
  }

  $onInit() {
    const Invoices = this.resourceBuilder('/invoices', 'invoice')

    this.$scope.gridOptions = this.exampleGridOptions({
      path: '/invoices'
    })

    this.DialogCrudCtrlMixin(this.$scope, {
      Resource: Invoices,
      gridName: 'exampleGrid',
      templateUrl: 'formDialog.html'
    })

    this.$scope.getSelectedRowsData = () =>{
      return this.$scope.exampleGridOptions.getSelectedRows()
    }

  }


}
