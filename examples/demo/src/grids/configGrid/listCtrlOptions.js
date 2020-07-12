import Swal from 'angle-grinder/src/tools/swal'
import _ from 'lodash'

export default function buildOptions(ctrl){ return {
  toolbarOptions: {
    scope: () => ctrl.$scope,
    rightSection: {
      template:`
        <div class="buttons has-addons">
          <ag-button ng-model="$ctrl.vm.quickPick.states" uib-btn-radio="'all'">All</ag-button>
          <ag-button ng-model="$ctrl.vm.quickPick.states" uib-btn-radio="'open'">Open</ag-button>
          <ag-button ng-model="$ctrl.vm.quickPick.states" uib-btn-radio="'closed'">Closed</ag-button>
        </div>`
    },
    selectedButtons: {
      ptp: { icon: 'fa-heart', tooltip: "Promise To Pay", action: () => ctrl.ptp() },
      // shows a example of using action
      showSelected: {
        label:'Display Selected', //label or display can be used
        tooltip: "Display selected rows data in panel below",
        action: () => ctrl.displaySelectedRowsData()
      }
    },
    leftButtons: {
      import: { display:'import' , action: () => ctrl.import() },
      drop: {
        display:'drop menu',
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
  },
  gridOptions: {
    colModel: [
      { name: 'id', label: 'id', width: 20, sorttype: 'int', align: 'right'},
      { name: 'customer.name', label: 'Customer', formatter: 'editActionLink'},
      { name: 'tranDate', label: 'Date', width: 100, formatter: 'date' },
      { name: 'refnum', label: 'Ref#', width: 100},
      { name: 'amount', label: 'Amount', width: 80, formatter: 'currency'},
      { name: 'comments', label: 'Comments'},
      { name: 'state', label: 'State', width: 80, fixed: true, align: 'center'} // formatter: 'okIcon' }
    ],
    sortname: 'id',
    shrinkToFit: true,
    // selectFirstRow: true,
    contextMenu: true,
    pager: false,
    // denseRows: true,
    // filterToolbar: true,
    // searching: { defaultSearch: "cn" },
    datatype: ctrl.gridLoader()
  },
  formFields: [
    {
      key: 'customer.name',
      type: 'input',
      templateOptions: {
        label: 'Customer',
        required: true,
        placeholder: 'Cust Name'
      }
    },
    {
      key: 'refnum',
      type: 'input',
      templateOptions: {
        label: 'Ref #',
        required: true,
        placeholder: 'Invoice or Memo Num'
      }
    },
    {
      key: 'comments',
      type: 'input',
      templateOptions: {
        placeholder: 'Comments or Note'
      }
    }
  ]
}}
