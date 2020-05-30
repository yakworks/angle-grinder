// import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import { expose } from 'angle-grinder/src/ng/utils/ngHelpers'
import { generateData } from '../dataGenerator'
import gridOptions from "../gridOptions"
import angular from "angular";

/* @ngInject */
export default class ListCtrl {
  constructor($scope, $log, $uibModal) {
    this.$scope = $scope
    this.$log = $log
    this.$uibModal = $uibModal
  }

  $onInit() {
    /*!!!!!!!!!!!!!!!! Below are some functions to emulate grid CRUD  that usually is done with mixins for resource !!!!!!!!!!!!!!!!!!!!!!!!!!!   */
    this.$scope.createRecord = ()=> {
      this.showForm()
    }

    this.$scope.deleteRecord = (id)=> {
      this.$scope.exampleGrid.removeRow(id)
    }

    //TODO: fix it
    this.$scope.editRecord = (invoice) => {
      this.showForm(invoice)
    }
  }

  selectedRow = function() { return this.$log.debug('exampleGridOptions selected row:', arguments) }.bind(this)
  gridOptions = gridOptions( {data: generateData(100), onSelectRow: this.selectedRow, pager: false, datatype: 'local' })
  showForm = (data) => {
    if (data){
      this.$scope.invoice = data
    }
      const modalOptions = {
        templateUrl: 'formDialog.html',
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
      this.closeDialog()
    }
  }

  closeDialog = () => {
    this.$scope.modal.close()
  }

  getSelectedRowsData() {
    this.selectedRowsData = this.$scope.exampleGrid.getSelectedRows()
  }
}
