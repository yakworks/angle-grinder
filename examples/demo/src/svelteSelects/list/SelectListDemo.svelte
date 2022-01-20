<script>
  import { BlockTitle, Columns, Col, Card, CardContent, Button } from '@yakit/svelte/index';
  import { ListForm, ListSelect, ListField, ListChipInput } from '@yakit/svelte/Formify';
  import stringify from 'fast-safe-stringify'

  const simpleData = ['Pie', 'Red', 'Green']

  //array of object data. identifier defaults to id and label is name.
  //added code in for the demo of multi labels.
  const itemData = [
    {id: 1, code:'choc', name: '🍫 Chocolate'},
    {id: 2, code:'piz', name: '🍕 Pizza'},
    {id: 3, code:'cook', name: '🍪 Cookies'},
    {id: 4, code:'1234 12345566', name: '🎉 Big Really Long Desc 1234 1234 1234 1234 1234 1234 1234'}
  ]

  //initial data
  let initData = {
    chips: ['cheese', 'sausage']
  }

  let data = {}
  let state
  let formContext = undefined

  $: if(formContext) {
    // console.log("formContext", formContext)
    state = formContext.state
  }

  function setPizza(){
    let newVals = {
      name:"pizza", simple:'Pie', singleId:2, multiId:[2, 3],
      valueObject: {id:2, name: "Pizza"},
      valueObjectMulti: [{id:2, name: "Pizza"}],
      chips:['cheese', 'sausage']
    }
    formContext.updateInitialValues(newVals)
  }

  function clearForm(){
    let newVals = {}
    formContext.updateInitialValues(newVals)
  }

</script>

<Columns>
  <Col class="is-12">
    <BlockTitle>Simple List</BlockTitle>
    <Card>
      <CardContent class="p0">
        <ListForm {initData} bind:data bind:context={formContext} >
          <ListField name="name" />
          <ListSelect name="simple"  itemData={simpleData} />
          <ListSelect name="singleId" {itemData} />
          <ListSelect name="multiId" opts={{label:"WTF", isMulti:true}} {itemData} />
          <ListSelect name="multiLabel" opts={{propertyLabel: ['code', 'name']}} {itemData} />
          <ListSelect name="valueObject" opts={{isValueObject:true}} {itemData} />
          <ListSelect name="valueObjectMulti" opts={{isMulti:true, isValueObject:true}} {itemData} />
          <ListChipInput name="chips" />
        </ListForm>
      </CardContent>
    </Card>
  </Col>
</Columns>

<Button class="mt-1" on:click={setPizza}>Pizza all around</Button>
<Button class="mt-1" on:click={clearForm}>Clear</Button>
<pre class="mt-4">field model: {stringify(data, null, 2)}</pre>
<pre class="mt-4">state: {stringify($state, null, 2)}</pre>
