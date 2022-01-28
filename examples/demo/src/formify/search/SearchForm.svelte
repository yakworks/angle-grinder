<script>
  import { Columns, Col, BlockTitle, Card, CardContent, Button } from '@yakit/svelte/index'
  import { ListForm, SearchCardForm, FormifyField } from '@yakit/svelte/Formify';
  import { transformFields } from '@yakit/core/transformer'

  // import stringify from '@yakit/core/stringify'
  import stringify from 'fast-safe-stringify'

  export let initData={}
  let noref = "javascript:void(0)"

  let searchConfig = {
    column1:[
      {key: "refnum", type: "input-list"},
      {key: "ponum", type: "input-wildcard"},
      {key: "date", type: 'date-range'},
      {key: "amount", type: 'amount-range'}
    ],
    column2:[
      {
        key: "simple",
        type: 'select',
        selectOptions: {
          data: ['blue', 'red', 'green' ]
        }
      },
      {
        key: "restId",
        type: 'select',
        selectOptions: {
          dataApi:{ key: 'customer' }
        }
      },
      {
        key: "rest",
        type: 'select',
        selectOptions: {
          isMulti: true,
          isValueObject: true,
          dataApi:{ key: 'customer' }
        }
      }
    ],
    column3:[
      {
        key: "restTwoCol",
        type: 'select',
        selectOptions: {
          propertyLabel: ['num', 'name'],
          isMulti: true,
          isValueObject: true,
          dataApi:{ key: 'customer' }
        }
      },
      {
        key: "minChars",
        type: 'select',
        selectOptions: {
          minSearchChars:1,
          isMulti: true,
          isValueObject: true,
          dataApi:{ key: 'customer' }
        }
      }
    ]
  }

  let data = {}
  let state
  let formContext = undefined
  let fieldConfig = undefined

  $: if(formContext) {
    // console.log("formContext", formContext)
    state = formContext.state
  }

  function setPizza(){
    let newVals = {
      ponum:"pizza"
    }
    formContext.updateInitialValues(newVals)
  }

  function clearForm(){
    let newVals = {}
    formContext.updateInitialValues(newVals)
  }

</script>

<SearchCardForm {searchConfig} {initData} bind:data bind:formContext bind:fieldConfig/>

<Button class="mt-1" on:click={setPizza}>Pizza all around</Button>
<Button class="mt-1" on:click={clearForm}>Clear</Button>
<Columns>
<Col>
  <pre class="mt-4">field model: {stringify(data, null, 2)}</pre>
  <pre class="mt-4">state: {stringify($state, null, 2)}</pre>
</Col>
<Col>
  <pre class="mt-4">translated config: {stringify(fieldConfig, null, 2)}</pre>
</Col>
</Columns>

