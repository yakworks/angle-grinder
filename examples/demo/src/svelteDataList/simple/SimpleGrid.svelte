
<script>
  import { Gridz } from '@yakit/svelte/index'
  import sessionStores from '~/store/sessionServices'

  let gridOptions = {
    colModel: [
      { name: 'id', label: 'id', width: 20, sorttype: 'int', align: 'right' },
      { name: 'customer.id', label: 'CustomerId', hidden: true },
      { name: 'customer.name', label: 'Customer', formatter: 'editPopoverLink' },
      { name: 'state.name', label: 'State' },
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

  let editForm = {
    'customer.name':{ required: true },
    state:{
      input: 'select',
      selectOptions:{
        isValueObject: true,
        data:[{id:0, name: 'Open'}, {id:1, name: 'Closed'}]
      }
    },
    refnum:{ required: true },
    amount:{ type: 'number', required: true, multipleOf: 0.01 },
    hasTax:{ type: 'boolean' }
  }
  let ctx = { gridOptions, editForm }
  //local, not export so not exposed
  let dataApi = sessionStores.invoice

</script>

<Gridz {dataApi} {ctx} />
<!-- <JqGrid {ctx}/> -->
