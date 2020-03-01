//import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import {expose} from 'angle-grinder/src/ng/utils/ngHelpers'
import _ from 'lodash'
import { generateData } from './dataGenerator'

/* @ngInject */
export default class ListCtrl {

  constructor($scope, $q, exampleGrid, FormDialogServ, $uibModal, resourceBuilder, DialogCrudCtrlMixin){
    this.$scope = $scope
    this.$q = $q
    this.exampleGrid = exampleGrid
    this.FormDialogServ = FormDialogServ
    this.$uibModal = $uibModal
    this.resourceBuilder = resourceBuilder
    this.DialogCrudCtrlMixin = DialogCrudCtrlMixin
  }

  $onInit() {
    expose(this, this.$scope, 'getSelectedRowsData', 'editRecord', 'createRecord', 'deleteRecord')

    // initialize the grid with generated data
    this.data = generateData(100)
    this.$scope.data = this.data

    const selectedRow = function() { return this.$log.debug('exampleGrid selected row:', arguments) }.bind(this)
    //this.$scope.gridOptions = this.exampleGrid({ data: this.data, onSelectRow: selectedRow })
    this.$scope.otherGridOptions = this.exampleGrid({ data: this.data, pager: false, datatype: 'local'})
    const Invoices = this.resourceBuilder("/invoices", "invoice");

    this.$scope.gridOptions = this.exampleGrid({
      path: `/invoices`
    });

    this.DialogCrudCtrlMixin(this.$scope, {
        Resource: Invoices,
        gridName: "exampleGrid",
        template: require('./simpleDialog.html')
      }
    );
  }

 /* getSelectedRowsData() {
    const ids = this.$scope.exampleGrid.getSelectedRowIds()
    return this.$scope.selectedRowsData = _.map(ids, function(id) {
      return this.$scope.exampleGrid.getRowData(id)
    })
  }

  editRecord(id) {
    const record = this.findRecordById(id)

    const deferred = this.$q.defer()
    deferred.resolve(record)

    angular.extend(record, {
      persisted() { return true },

      save() { return { $promise: deferred.promise } },

      delete: () => {
        this.deleteRecordById(id)
        return { $promise: deferred.promise }
      }
    })

    const dialogOptions = { record, grid: this.$scope.exampleGrid }
    return this.FormDialogServ.open('/partials/gridExample/form.html', dialogOptions)
  }

  createRecord() {
    const record = {}

    const deferred = this.$q.defer()
    deferred.resolve(record)

    angular.extend(record, {
      persisted() { return false },

      save() {
        record.id = new Date().getTime()
        return { $promise: deferred.promise }
      }
    })

    const dialogOptions = { record, grid: this.$scope.exampleGrid }
    return this.FormDialogServ.open('/partials/gridExample/form.html', dialogOptions).result
      .then(record => this.data.push(record))
  }

  deleteRecord(id) {
    const record = this.deleteRecordById(id)
    return this.$scope.exampleGrid.removeRow(record.id)
  }

  findRecordById(id) {
    id = parseInt(id)
    return _.find(this.data, row => row.id === id)
  }

  deleteRecordById(id) {
    const row = this.findRecordById(id)
    if (row != null) {
      this.data = _.reject(this.data, record => record.id === row.id)
      return row
    }
  }
*/

}
