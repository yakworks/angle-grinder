
<script>
  import { Gridz } from '@yakit/svelte/index'
  import sessionStores from '~/store/sessionServices'
  import QuickFilter from './QuickFilter.svelte'

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
    // state:{
    //   input: 'select',
    //   selectOptions:{
    //     isValueObject: true,
    //     data:[{id:0, name: 'Open'}, {id:1, name: 'Closed'}]
    //   }
    // },
    // refnum:{ required: true },
    // amount:{ type: 'number', required: true, multipleOf: 0.01 },
    // hasTax:{ type: 'boolean' }
  }

  let searchForm = {
    column1:{
      'refnum':{
        input: 'chips'
      },
      'date':{
        label: "Date Range",
        input: 'date-range'
      }
    },
    column2:{
      'amount':{
        label: "Amount Range",
        type: "number",
        input: 'amount-range'
      },
      state:{
        input: 'select',
        options:{
          isMulti: false,
          isValueObject: true,
          data:[{id:0, name: 'Open'}, {id:1, name: 'Closed'}]
        }
      }
    },
    column3:{
      customer:{
        input: 'select',
        options:{
          dataApi:{
            key:'customer'
          }
        }
      },
    }
  }

  let searchFormSimp = {
    'customer.name':{ }
  }

  let ctx = { gridOptions, editForm, searchForm }
  //local, not export so not exposed
  let dataApi = sessionStores.invoice

</script>

<Gridz {dataApi} {ctx} {QuickFilter}/>
<!-- <JqGrid {ctx}/> -->
