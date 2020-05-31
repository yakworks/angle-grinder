// import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import { expose } from 'angle-grinder/src/ng/utils/ngHelpers'
import MassUpdateFormCtrl from "../commonComponents/massUpdate/MassUpdateFormCtrl"

/* @ngInject */
export default class ListCtrl {
  constructor($scope, ConfigCache, resourceBuilder, DialogCrudCtrlMixin, MassUpdateMixin) {
    this.$scope = $scope
    this.ConfigCache = ConfigCache
    this.resourceBuilder = resourceBuilder
    this.DialogCrudCtrlMixin = DialogCrudCtrlMixin
    this.MassUpdateMixin = MassUpdateMixin
  }

  $onInit() {
    expose(this, this.$scope, 'getSelectedRowsData', 'editRecord', 'createRecord', 'deleteRecord')

    const Invoices = this.resourceBuilder('/invoices', 'invoice', '/api')

    const updateGridOptions = (gridOptions) => {
      return { ...gridOptions, path: '/api/invoices' }
    }
    this.$scope.gridOptions = this.ConfigCache.get('/api/invoices/gridOptions', updateGridOptions)

    this.DialogCrudCtrlMixin(this.$scope, {
      Resource: Invoices,
      gridName: 'exampleGrid',
      templateUrl: 'formDialog.html'
    }
    )

    this.MassUpdateMixin(this.$scope, {
      template: require('../commonComponents/massUpdate/massUpdateForm.html'),
      controller: MassUpdateFormCtrl,
      gridName: 'exampleGrid'
    })
  }

}
