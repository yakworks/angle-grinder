
<script>
  import { onMount } from 'svelte'
  import GridCtrl from 'angle-grinder/src/gridz/GridCtrl'
  import sessionStores from '../../store/sessionServices'
  const jq = window.$

  let gridOptions = {
    colModel: [
      { name: 'id', label: 'id', width: 20, sorttype: 'int', align: 'right' },
      { name: 'customer.id', label: 'CustomerId', hidden: true },
      { name: 'customer.name', label: 'Customer', formatter: 'editActionLink' },
      { name: 'tranDate', label: 'Date', width: 100, formatter: 'date' },
      { name: 'refnum', label: 'Refnum', width: 100 },
      { name: 'amount', label: 'Amount', width: 80, formatter: 'currency' },
      { name: 'comments', label: 'Comments' },
      { name: 'state.id', label: 'StateId', width: 80, align: 'center', hidden: true },
      { name: 'state.name', label: 'State', width: 60, align: 'center' },
      { name: 'hasTax', label: 'Taxable', width: 60, align: 'center', formatter: 'okIcon' } // formatter: 'okIcon' }
    ],
    sortname: 'id',
    shrinkToFit: true,
    contextMenu: true,
    pager: true,
    dataApi: sessionStores.invoice,
    gridId: 'someGrid'
    // datatype: (params) => ctrl.gridLoader(params)
  }

  function init(node) {
    let gridCtrl = new GridCtrl()
    let gridWrapper = jq(node)
    const gridEl = gridWrapper.find('table.gridz')
    gridCtrl.setupGrid(gridWrapper, gridEl, gridOptions)
    gridCtrl.initGridz()
  }

</script>

<div use:init class="gridz-wrapper">
  <table class="gridz"></table>
  <div class="gridz-pager"></div>
</div>
