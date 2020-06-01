// import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import { expose } from 'angle-grinder/src/ng/utils/ngHelpers'
import MassUpdateFormCtrl from "../commonComponents/massUpdate/MassUpdateFormCtrl"

/* @ngInject */
export default class ListCtrl {
  showSearchForm = true

  constructor($scope, ConfigCache, resourceBuilder, DialogCrudCtrlMixin, MassUpdateMixin) {
    this.$scope = $scope
    this.ConfigCache = ConfigCache
    this.resourceBuilder = resourceBuilder
    this.DialogCrudCtrlMixin = DialogCrudCtrlMixin
    this.MassUpdateMixin = MassUpdateMixin
  }

  $onInit() {
    let {$scope} = this
    const Invoices = this.resourceBuilder('/invoices', 'invoice', '/api')
    this.DialogCrudCtrlMixin($scope, {
      Resource: Invoices,
      gridName: 'exampleGrid',
      templateUrl: 'formDialog.html'
    }
    )

    const updateGridOptions = (gridOptions) => {
      return { ...gridOptions, path: '/api/invoices' }
    }

    this.gridOptions = this.ConfigCache.get('/api/invoices/gridOptions', updateGridOptions)

    this.MassUpdateMixin($scope, {
      template: require('../commonComponents/massUpdate/massUpdateForm.html'),
      controller: MassUpdateFormCtrl,
      gridName: 'exampleGrid'
    })
  }

  createRecord(){
    this.$scope.createRecord()
  }
  getSelectedRowsData() {
    this.selectedRowsData = this.$scope.exampleGrid.getSelectedRows()
  }

}
