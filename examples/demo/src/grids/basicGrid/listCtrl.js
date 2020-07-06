import BaseListCtrl from 'angle-grinder/src/ng/gridz/list/BaseListCtrl'
import exampleGridOptions from "./exampleGridOptions"
import Log from 'angle-grinder/src/utils/Log'
import Swal from 'angle-grinder/src/tools/swal'
import _ from 'lodash'

/* @ngInject */
export default class ListCtrl extends BaseListCtrl {

  showSearchForm = true
  editFormTpl = require('./form/editDialog.html')
  massUpdateTpl = require('./form/massUpdateForm.html')

  toolbarOptions = {
    scope: () => this.$scope,
    rightSection: {
      template:`
        <div class="buttons has-addons">
          <ag-button ng-model="$ctrl.vm.quickPick.states" uib-btn-radio="'all'">All</ag-button>
          <ag-button ng-model="$ctrl.vm.quickPick.states" uib-btn-radio="'open'">Open</ag-button>
          <ag-button ng-model="$ctrl.vm.quickPick.states" uib-btn-radio="'closed'">Closed</ag-button>
        </div>`
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
            // icon: 'mdi-gauge',
            action: () => Swal.fire('Other Action')
          }
        ]
      }
    }
  }

  colModel = [
    { name: 'id', label: 'id', width: 20, sorttype: 'int', align: 'right'},
    { name: 'customer.name', label: 'Customer', formatter: 'editActionLink'},
    { name: 'tranDate', label: 'Date', width: 100, formatter: 'date' },
    { name: 'refnum', label: 'Ref#', width: 100},
    { name: 'amount', label: 'Amount', width: 80, formatter: 'currency'},
    { name: 'comments', label: 'Comments'},
    { name: 'state', label: 'State', width: 80, fixed: true, align: 'center'} // formatter: 'okIcon' }
  ]

  /* @ngInject */
  constructor($scope, $element, $uibModal, Invoices) {
    super($scope, $element, $uibModal)
    this.Invoices = Invoices
    this.dataStore = Invoices
  }

  $onInit() {
    this.gridOptions = {
      colModel: this.colModel,
      sortname: 'id',
      shrinkToFit: true,
      // selectFirstRow: true,
      contextMenu: true,
      pager: false,
      // denseRows: true,
      // filterToolbar: true,
      // searching: { defaultSearch: "cn" },
      datatype: this.dataLoader()
    }
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
