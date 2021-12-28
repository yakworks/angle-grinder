import Swal from 'angle-grinder/src/tools/swal'
import _ from 'lodash'

export default function buildOptions(ctrl){
  return {
    toolbarOptions: {
      scope: () => ctrl.$scope,
      rightSection: {
        template: `
        <div class="buttons has-addons">
          <ag-button ng-model="$ctrl.vm.quickPick.states" uib-btn-radio="'all'">All</ag-button>
          <ag-button ng-model="$ctrl.vm.quickPick.states" uib-btn-radio="'open'">Open</ag-button>
          <ag-button ng-model="$ctrl.vm.quickPick.states" uib-btn-radio="'closed'">Closed</ag-button>
        </div>`
      },
      selectedButtons: {
        ptp: { icon: 'fa-heart', tooltip: 'Promise To Pay', action: () => ctrl.ptp() },
        // shows a example of using action
        showSelected: {
          label: 'Display Selected', // label or display can be used
          tooltip: 'Display selected rows data in panel below',
          action: () => ctrl.displaySelectedRowsData()
        }
      },
      leftButtons: {
        import: { display: 'import', action: () => ctrl.import() },
        drop: {
          display: 'drop menu',
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
        { name: 'id', label: 'id', width: 20, sorttype: 'int', align: 'right' },
        { name: 'customer.id', label: 'CustomerId', hidden: true },
        { name: 'customer.name', label: 'Customer', formatter: 'editActionLink' },
        { name: 'tranDate', label: 'Date', width: 100, formatter: 'date' },
        { name: 'refnum', label: 'Refnum', width: 100 },
        { name: 'amount', label: 'Amount', width: 80, formatter: 'currency', align: 'right' },
        { name: 'comments', label: 'Comments' },
        { name: 'state.id', label: 'StateId', width: 80, align: 'center', hidden: true },
        { name: 'state.name', label: 'State', width: 60, align: 'center' },
        { name: 'hasTax', label: 'Taxable', width: 60, align: 'center', formatter: 'okIcon' } // formatter: 'okIcon' }
      ],
      sortname: 'id',
      shrinkToFit: true,
      // selectFirstRow: true,
      contextMenu: true,
      pager: true,
      footerrow: true,
      // denseRows: true,
      // filterToolbar: true,
      // searching: { defaultSearch: "cn" },
      onSelectRow: () => {
        const selectedRowsData = ctrl.getGridCtrl().getSelectedRows()
        ctrl.updateFooter({
          refnum: 'Total',
          amount: selectedRowsData.reduce((sum, row) => {
            return sum + row.amount
          }, 0)
        })
      }
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

  }
}
