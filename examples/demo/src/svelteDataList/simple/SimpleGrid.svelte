
<script>
  import { Gridz } from '@yakit/svelte/index'
  import sessionStores from '~/store/sessionServices'

  let gridOptions = {
    colModel: [
      { name: 'id', label: 'id', width: 20, sorttype: 'int', align: 'right' },
      { name: 'customer.id', label: 'CustomerId', hidden: true },
      { name: 'customer.name', label: 'Customer', formatter: 'editActionLink' },
      { name: 'amount', label: 'Amount', width: 80, formatter: 'currency' },
      { name: 'comments', label: 'Comments' },
      { name: 'hasTax', label: 'Taxable', width: 60, align: 'center', formatter: 'okIcon' } // formatter: 'okIcon' }
    ],
    sortname: 'id',
    shrinkToFit: true,
    contextMenu: true,
    pager: true,
    gridId: 'someGrid'
  }

  let ctx = {gridOptions}
  //local, not export so not exposed
  let dataApi = sessionStores.invoice

</script>

<Gridz {dataApi} {ctx} />
<!-- <JqGrid {ctx}/> -->
