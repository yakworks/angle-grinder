// import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import { expose } from 'angle-grinder/src/ng/utils/ngHelpers'
import { generateData } from '../dataGenerator'
import gridOptions from "../gridOptions"

/* @ngInject */
export default class ListCtrl {
  constructor($scope, resourceBuilder, DialogCrudCtrlMixin, $log) {
    this.$scope = $scope
    this.DialogCrudCtrlMixin = DialogCrudCtrlMixin
    this.$log = $log
  }

  $onInit() {
    // initialize the grid with generated data
    const data = generateData(100)

    const selectedRow = function() { return this.$log.debug('exampleGridOptions selected row:', arguments) }.bind(this)
    this.gridOptions = gridOptions({ data, onSelectRow: selectedRow, pager: false, datatype: 'local' })
  }

  getSelectedRowsData() {
    this.selectedRowsData = this.$scope.exampleGrid.getSelectedRows()
  }
}
