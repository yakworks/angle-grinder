
<script>
  import { JqGrid } from 'angle-grinder/svelte/index'
  import sessionStores from '../../../store/sessionServices'

  export let foo = 42
  export let dataApi = {}

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
    dataApi: sessionStores.invoice,
    gridId: 'someGrid'
  }

  let ctx = {gridOptions}

</script>

<p>dataApi is {dataApi.key}</p>
<p>foo is {foo}</p>

<JqGrid ctx={ctx} />
