// import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import {generateData} from '../dataGenerator'
import exampleGridOptions from "../exampleGridOptions"
import Log from 'angle-grinder/src/utils/Log'

/* @ngInject */
export default class ListCtrl {
  showSearchForm = true

  gridOptions = exampleGridOptions({
    data: generateData(100),
    onSelectRow: args => Log.debug('exampleGridOptions selected row:', args),
    pager: false,
    datatype: 'local'
  })

  //getter to get scope reference
  get grid() { return this.$scope.exampleGrid }

  constructor($scope, $uibModal) {
    this.$scope = $scope
    this.$uibModal = $uibModal
  }

  $onInit() {
    let {$scope} = this
    // Below are some functions to emulate grid CRUD  that usually is done with mixins for resource

    $scope.deleteRecord = (id) => {
      this.grid.removeRow(id)
    }

    $scope.editRecord = (id) => {
      let data = this.grid.getRowData(id)
      invoice.customer = {name: invoice['customer.name']}
      this.showForm(data)
    }
  }

  createRecord(){
    this.showForm({})
  }

  showForm(data) {
    this.invoice = data
    const modalOptions = {
      template: require('./form/formDialog.html'),
      keyboard: false, // do not close the dialog with ESC key
      backdrop: 'static', // do not close on click outside of the dialog,
      scope: this.$scope
    }
    this.form = this.$uibModal.open(
      modalOptions
    )
  }

  save(invoice){
    if (invoice.id) {
      this.grid.updateRow(invoice.id, invoice)
    } else {
      invoice.id = new Date().getMilliseconds() //random id
      this.grid.addRow(invoice.id, invoice)
    }
    this.closeDialog()
  }

  closeDialog(){
    this.form.close()
  }

  getSelectedRowsData() {
    this.selectedRowsData = this.grid.getSelectedRows()
  }
}
