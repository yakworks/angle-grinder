// import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import { expose } from 'angle-grinder/src/ng/utils/ngHelpers'
import MassUpdateFormCtrl from "./massUpdate/MassUpdateFormCtrl";

/* @ngInject */
export default class ListCtrl {
  constructor($scope, exampleGridOptions, ConfigCache, resourceBuilder, DialogCrudCtrlMixin, MassUpdateMixin) {
    this.$scope = $scope
    this.exampleGridOptions = exampleGridOptions
    this.ConfigCache = ConfigCache
    this.resourceBuilder = resourceBuilder
    this.DialogCrudCtrlMixin = DialogCrudCtrlMixin
    this.MassUpdateMixin = MassUpdateMixin
  }

  $onInit() {
    expose(this, this.$scope, 'getSelectedRowsData', 'editRecord', 'createRecord', 'deleteRecord')

    // initialize the grid with generated data
    this.data = []
    this.$scope.data = this.data

    const selectedRow = function() { return this.$log.debug('exampleGridOptions selected row:', arguments) }.bind(this)
    this.$scope.otherGridOptions = this.exampleGridOptions({ data: this.data, pager: false, datatype: 'local' })
    const Invoices = this.resourceBuilder('/invoices', 'invoice', '/api')

    const updateGridOptions = (gridOptions) => {
      return { ...gridOptions, path: '/api/invoices' }
    }
    this.$scope.gridOptions = this.ConfigCache.get('/api/invoices/gridOptions', updateGridOptions)

    this.DialogCrudCtrlMixin(this.$scope, {
      Resource: Invoices,
      gridName: 'exampleGrid',
      templateUrl: 'simpleDialog.html'
    }
    )

    this.MassUpdateMixin(this.$scope, {
      template: require('./massUpdate/massUpdateForm.html'),
      controller: MassUpdateFormCtrl,
      gridName: 'exampleGrid'
    })
  }

}
