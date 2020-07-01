// import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import {generateData} from '../dataGenerator'
import exampleGridOptions from "./exampleGridOptions"
import Log from 'angle-grinder/src/utils/Log'
import Swal from 'angle-grinder/src/tools/swal'
import _ from 'lodash'

/* @ngInject */
export default class ListCtrl {
  foo = "bar"
  showSearchForm = true
  data = generateData(100)

  toolbarOptions = {
    rightSection: {
      template:`
        <div class="buttons has-addons">
          <ag-button ng-model="$ctrl.vm.quickPick.states" uib-btn-radio="'all'">All</ag-button>
          <ag-button ng-model="$ctrl.vm.quickPick.states" uib-btn-radio="'open'">Open</ag-button>
          <ag-button ng-model="$ctrl.vm.quickPick.states" uib-btn-radio="'closed'">Closed</ag-button>
        </div>`,
      scope: () => this.$scope
    },
    selectedButtons: {
      ptp: { icon: 'fa-heart', tooltip: "Promise To Pay", action: () => this.ptp() },
      showSelected: { display:'Display Selected' , action: () => this.displaySelectedRowsData() }
    },
    leftButtons: {
      import: { display:'import' , action: () => this.import() },
      drop: {
        display:'drop',
        menuItems: [
          {
            display: '<strong>Main Action</strong>',
            icon: 'fa-thumbs-up',
            action: () => Swal.fire('Main Action')
          },
          {
            display: 'Other Action',
            icon: 'mdi-gauge',
            action: () => Swal.fire('Other Action')
          }
        ]
      }
    }
  }

  // gridOptions = exampleGridOptions({
  //   // onSelectRow: this.onSelect,
  //   // onSelectAll: this.onSelect,
  //   pager: false,
  //   datatype: (params, loadingDivSelector) => {
  //     Log.debug("params", params)
  //     Log.debug("loadingDivSelector", loadingDivSelector)
  //     Log.debug("this.grid.getGridz", this.gridCtrl.getGridz())
  //     this.data = _.orderBy(this.data, params.sort , params.order)
  //     this.gridCtrl.addJSONData(this.data)
  //     // show/hide the loading animation
  //     // const loadingEl = $document.find('#' + $.jgrid.jqID(loadingDivSelector))
  //     // loadingEl.show()
  //     // loadingEl.hide()
  //   }
  // })

  get gridCtrl() { return this.$element.find('ag-gridz').controller('agGridz') }

  /* @ngInject */
  constructor($scope, $element, $uibModal, Invoices) {
    this.$scope = $scope
    this.$element = $element
    this.$uibModal = $uibModal
    this.Invoices = Invoices
  }

  $onInit() {
    this.gridOptions = exampleGridOptions({
      pager: false,
      datatype: (params) => {
        this.gridCtrl.toggleLoading(true)
        this.Invoices.query(params)
          .then( response => {
            return this.gridCtrl.addJSONData(response)
            // console.log("response", response)
            // return gridCtrl.addJSONData(response.data)
          })
          .finally(() =>  {
            this.gridCtrl.toggleLoading(false)
          })
      }
    })
  }

  editRecord(id) {
    let data = this.gridCtrl.getRowData(id)
    // normally when dealing with rest we would get the object from server based on selected id
    // here we need to get the "flattened" grid data back into object form
    data.customer = {name: data['customer.name']}
    this.showForm(data)
  }

  deleteRecord(id){
    this.gridCtrl.removeRow(id)
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

  showForm(data) {
    this.vm = data
    this.form = this.$uibModal.open(
      this.modalOptions(require('./form/editDialog.html'))
    )
  }

  save(data){
    if (data.id) {
      this.gridCtrl.updateRow(data.id, data)
    } else {
      data.id = new Date().getMilliseconds() //random id
      this.gridCtrl.addRow(data.id, data)
    }
    this.closeDialog()
  }

  closeDialog = () => {
    this.form.close()
  }

  displaySelectedRowsData() {
    console.log("displaySelectedRowsData")
    this.selectedRowsData = this.gridCtrl.getSelectedRows()
  }

  import() {
    console.log("import")
    Swal.fire('import something')
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
