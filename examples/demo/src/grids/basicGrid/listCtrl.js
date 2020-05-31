// import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import {generateData} from '../dataGenerator'
import exampleGridOptions from "../exampleGridOptions"

/* @ngInject */
export default class ListCtrl {
  constructor($scope, $log, $uibModal) {
    this.$scope = $scope
    this.$log = $log
    this.$uibModal = $uibModal
  }

  $onInit() {
    /*!!!!!!!!!!!!!!!! Below are some functions to emulate grid CRUD  that usually is done with mixins for resource !!!!!!!!!!!!!!!!!!!!!!!!!!!   */
    this.$scope.createRecord = () => {
      this.showForm()
    }

    this.$scope.deleteRecord = (id) => {
      this.$scope.exampleGrid.removeRow(id)
    }

    this.$scope.editRecord = (id) => {
      this.$scope.invoice = this.$scope.exampleGrid.getRowData(id)
      this.$scope.invoice.customer = {name: this.$scope.invoice['customer.name']}
      this.showForm()
    }
  }

  selectedRow = function () {
    return this.$log.debug('exampleGridOptions selected row:', arguments)
  }.bind(this)
  gridOptions = exampleGridOptions({
    data: generateData(100),
    onSelectRow: this.selectedRow,
    pager: false,
    datatype: 'local'
  })

  showForm = (data) => {
    const modalOptions = {
      template: require('./form/formDialog.html'),
      keyboard: false, // do not close the dialog with ESC key
      backdrop: 'static', // do not close on click outside of the dialog,
      scope: this.$scope
    }
    this.$scope.modal = this.$uibModal.open(
      modalOptions
    )
  }

  save = (invoice) => {
    if (invoice.id) {
      this.$scope.exampleGrid.updateRow(invoice.id, invoice)
    } else {
      invoice.id = new Date().getMilliseconds() //random id
      this.$scope.exampleGrid.addRow(invoice.id, invoice)
    }
    this.closeDialog()
  }

  closeDialog = () => {
    this.$scope.modal.close()
  }

  getSelectedRowsData() {
    this.selectedRowsData = this.$scope.exampleGrid.getSelectedRows()
  }
}
