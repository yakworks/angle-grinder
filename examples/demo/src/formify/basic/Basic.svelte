<script>
  import { BlockTitle, Columns, Col, Card, CardContent,
    Select, Button, Button7, CardFooter, Link } from '@yakit/svelte/index';
  import { ListForm, ListField, ListSelect, ListRangeFields, ListToggle, ListChipInput } from '@yakit/svelte/Formify';
  import stringify from 'fast-safe-stringify'

  //array of object data. identifier defaults to id and label is name.
  //added code in for the demo of multi labels.
  const simpleData = ['🍫 Chocolate', '🍕 Pizza', '🍪 Cookies']

  let opts = {
    initData: {
      user: {
        name: 'Bill'
      },
      dates: { date1: '2022-01-06' }
    },
    onSubmit(values){
      alert(stringify(values))
    }
  }

  let data = {}
  let state
  let formContext = undefined

  $: if(formContext) {
    state = formContext.state
  }

  function cancelClick(){
    formContext.handleReset()
  }

</script>

<Columns>
  <Col class="is-4">
    <BlockTitle>Simple Form</BlockTitle>
    <Card>
      <CardContent class="p0">
        <ListForm name="list-form-example1" bind:data bind:formContext {opts}>
          <ListField name="user.name" opts={{validate:true, minlength:3, required:true}}/>
          <ListField name="user.password" placeholder="Enter Password"/>
          <ListField name="flex.text1" opts={{label:"Test Flex", validate:true, minlength:3, required:true}}/>
          <ListField name="dates.date1" type="date"/>
          <ListField name="dates.date2" type="date"/>
          <ListToggle name="toggle" />
          <ListChipInput name="chips" />
          <ListRangeFields name="dates.dateRange" type="date"/>
          <ListRangeFields name="dates.amountRange" type="number"/>
          <ListSelect name="selects.simple" opts={{label:"Select", placeholder:"Id Value Select"}} itemData={simpleData}/>
          <ListSelect name="selects.customer"
            opts={{ label:"Select", placeholder:"Id Value Select", dataApiKey: 'customer' }}/>
          <ListField name="dates.date2" type="date"/>
          <CardFooter>
            <Button7 onClick={cancelClick}>Cancel</Button7>
            <Button7 type=submit>Save</Button7>
          </CardFooter>
        </ListForm>
      </CardContent>
    </Card>
  </Col>
  <Col class="is-4">
    <pre class="mt-4">field model: {stringify(data, null, 2)}</pre>
  </Col>
  <Col class="is-4">
    <pre class="mt-4">state: {stringify($state, null, 2)}</pre>
  </Col>
</Columns>

<!-- <Button class="mt-1" on:click={setPizza}>Set Pizza</Button> -->
<pre class="mt-4">field model: {stringify(data, null, 2)}</pre>
