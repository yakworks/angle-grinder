// import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import {generateData} from '../dataGenerator'
import exampleGridOptions from "../exampleGridOptions"
import Log from 'angle-grinder/src/utils/Log'
import Swal from 'angle-grinder/src/tools/swal'

/* @ngInject */
export default class ListCtrl {
  foo = "bar"
  showSearchForm = true
  data = generateData(100)
  hasSelected = false

  // onSelect = () => {
  //   this.$scope.$evalAsync(()=>{
  //     this.hasSelected = this.grid.hasSelectedRowIds()
  //   })
  // }
  gridOptions = exampleGridOptions({
    // onSelectRow: this.onSelect,
    // onSelectAll: this.onSelect,
    pager: false,
    datatype: (params, loadingDivSelector) => {
      Log.debug("params", params)
      Log.debug("loadingDivSelector", loadingDivSelector)
      Log.debug("this.grid.getGridz", this.grid.getGridz())
      this.grid.addJSONData(this.data)
      // show/hide the loading animation
      // const loadingEl = $document.find('#' + $.jgrid.jqID(loadingDivSelector))
      // loadingEl.show()
      // loadingEl.hide()
    }
  })

  menuItems = [
    {
      display: 'Refresh', icon: 'fa-refresh', action: () => this.grid.reloadKeepSelected()
    },
    { display: 'Reset Sort', icon: 'fa-sort', action: () => this.grid.resetSort() },
    { display: 'Column Config', icon: 'fa-exchange', action: () => this.ColumnConfigServ.open(this.grid) },
    { divider: true },
    { display: 'Hide/Show Toggle', icon: 'fa-minus' },
    { display: 'Expand', icon: 'fa-expand' }
  ]

  menuItemClick = function(menuItem, event) {
    console.log('menuItemClick params', { menuItem, event })
    Swal.fire(
      `${menuItem.display} item clicked `,
      `<pre><code class="json">${JSON.stringify(menuItem, null, 2)}</code></pre>`
    )
  }
  //getter to get scope reference
  get grid() { return this.$scope.exampleGrid }

  constructor($scope, $uibModal, ColumnConfigServ) {
    this.$scope = $scope
    this.$uibModal = $uibModal
    this.ColumnConfigServ = ColumnConfigServ
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

  createRecord() {
    this.showForm({})
  }

  modalOptions(template) {
    return {
      // controller: function ($uibModalInstance, $scope) {
      //   this.cancel = () => {
      //     console.log("MassUpdateCtrl cancel scope", $scope)
      //     $uibModalInstance.dismiss('cancel')
      //   }
      // },
      // controllerAs: '$ctrl',
      // bindToController: true,
      template: template,
      keyboard: false, // do not close the dialog with ESC key
      backdrop: 'static', // do not close on click outside of the dialog,
      scope: this.$scope
    }
  }

  showMassUpdate() {
    let modalOpts = {
      controller: function ($uibModalInstance, $scope) {
        this.cancel = () => {
          console.log("MassUpdateCtrl cancel scope", $scope)
          $uibModalInstance.dismiss('cancel')
        }
      },
      controllerAs: '$ctrl',
      // bindToController: true,
      template: require('./form/massUpdateForm.html'),
      keyboard: false, // do not close the dialog with ESC key
      backdrop: 'static', // do not close on click outside of the dialog,
      // scope: this.$scope
    }
    // here just for example, does nothing
    this.form = this.$uibModal.open(modalOpts)
    console.log("showMassUpdate", this.form)
  }

  xlsExport() {
    this.grid.xlsExport()
  }

  showForm(data) {
    this.vm = data
    this.form = this.$uibModal.open(
      this.modalOptions(require('./form/editDialog.html'))
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

  closeDialog = () => {
    this.form.close()
  }

  getSelectedRowsData() {
    this.selectedRowsData = this.grid.getSelectedRows()
  }
}

class MassUpdateCtrl {

  constructor($scope, $uibModalInstance) {
    console.log("MassUpdateCtrl constructor scope", $scope)
    this.$scope = $scope
    this.$uibModalInstance = $uibModalInstance
  }

  cancel() {
    console.log("MassUpdateCtrl cancel scope", this.$scope)
    this.$uibModalInstance.dismiss('cancel')
  }
}
