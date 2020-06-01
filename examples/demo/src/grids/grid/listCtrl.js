import exampleGridOptions from "../exampleGridOptions"
import MassUpdateFormCtrl from "../commonComponents/massUpdate/MassUpdateFormCtrl";

/*
  Example with resource based on grails based endpoint names
  data is retrived from mocker
*/

/* @ngInject */
export default class ListCtrl {
  showSearchForm = true

  constructor($scope, resourceBuilder, DialogCrudCtrlMixin, MassUpdateMixin) {
    this.$scope = $scope
    this.resourceBuilder = resourceBuilder
    this.DialogCrudCtrlMixin = DialogCrudCtrlMixin
    this.MassUpdateMixin = MassUpdateMixin
  }

  $onInit() {
    const Invoices = this.resourceBuilder('/invoices', 'invoice')
    let {$scope} = this
    this.DialogCrudCtrlMixin($scope, {
      Resource: Invoices,
      gridName: 'exampleGrid',
      template: require('../commonComponents/form/formDialog.html')
    })

    this.MassUpdateMixin(this, {
      template: require('../commonComponents/massUpdate/massUpdateForm.html'),
      controller: MassUpdateFormCtrl,
      gridName: 'exampleGrid'
    })
  }

  gridOptions = exampleGridOptions({
    path: '/invoices'
  })

  createRecord(){
    this.$scope.createRecord()
  }
  getSelectedRowsData() {
    this.selectedRowsData = this.$scope.exampleGrid.getSelectedRows()
  }
}
