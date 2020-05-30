// import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import { expose } from 'angle-grinder/src/ng/utils/ngHelpers'
import { generateData } from '../dataGenerator'
import gridOptions from "../gridOptions";

/* @ngInject */
export default class ListCtrl {
  constructor($scope, resourceBuilder, DialogCrudCtrlMixin) {
    this.$scope = $scope
    this.resourceBuilder = resourceBuilder
    this.DialogCrudCtrlMixin = DialogCrudCtrlMixin
  }

  $onInit() {
    // initialize the grid with generated data
    const data = generateData(100)

    const selectedRow = function() { return console.log('exampleGridOptions selected row:', arguments) }.bind(this)
    this.$scope.gridOptions = gridOptions({ data, onSelectRow: selectedRow, pager: false, datatype: 'local' })
  }

  getSelectedRowsData() {
    return this.$scope.exampleGrid.getSelectedRows()
  }
}
