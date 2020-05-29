// import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import { expose } from 'angle-grinder/src/ng/utils/ngHelpers'
import { generateData } from '../dataGenerator'

/* @ngInject */
export default class ListCtrl {
  constructor($scope, exampleGridOptions, resourceBuilder, DialogCrudCtrlMixin) {
    this.$scope = $scope
    this.exampleGridOptions = exampleGridOptions
    this.resourceBuilder = resourceBuilder
    this.DialogCrudCtrlMixin = DialogCrudCtrlMixin
  }

  $onInit() {
    expose(this, this.$scope, 'getSelectedRowsData', 'editRecord', 'createRecord', 'deleteRecord')

    // initialize the grid with generated data
    this.data = generateData(100)
    this.$scope.data = this.data

    const selectedRow = function() { return this.$log.debug('exampleGridOptions selected row:', arguments) }.bind(this)
    // this.$scope.gridOptions = this.exampleGridOptions({ data: this.data, onSelectRow: selectedRow })
    this.$scope.otherGridOptions = this.exampleGridOptions({ data: this.data, pager: false, datatype: 'local' })
    const Invoices = this.resourceBuilder('/invoices', 'invoice')

    this.$scope.gridOptions = this.exampleGridOptions({
      path: '/invoices'
    })

    this.DialogCrudCtrlMixin(this.$scope, {
      Resource: Invoices,
      gridName: 'exampleGrid',
      template: require('../simpleDialog.html')
    }
    )
  }

  getSelectedRowsData() {
    return this.$scope.exampleGridOptions.getSelectedRows()
  }
}
