// import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import {generateData} from '../dataGenerator'
import exampleGridOptions from "../exampleGridOptions"
import Log from 'angle-grinder/src/utils/Log'

/* @ngInject */
export default class ListCtrl {
  foo = "bar"
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

    // FIXME, get rid of these by passing the actionCtrl to the grid somehow
    $scope.deleteRecord = (id) => { this.deleteRecord(id) }
    $scope.editRecord = (id) => { this.editRecord(id) }
  }

  editRecord(id) {
    let data = this.grid.getRowData(id)
    // normally when dealing with rest we would get the object from server based on selected id
    // here we need to get the "flattened" grid data back into object form
    data.customer = {name: data['customer.name']}
    this.showForm(data)
  }

  deleteRecord(id){
    this.grid.removeRow(id)
  }

  createRecord(){
    this.showForm({})
  }

  showForm(data) {
    this.vm = data
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

  save(data){
    if (data.id) {
      this.grid.updateRow(data.id, data)
    } else {
      data.id = new Date().getMilliseconds() //random id
      this.grid.addRow(data.id, data)
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
