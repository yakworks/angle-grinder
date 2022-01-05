<script>
  import { BlockTitle, Columns, Col, Card, CardContent, Select, Button } from '@ag-svelte/index';
  import { ListForm, ListField, ListSelect } from '@ag-svelte/Formify/index';
  import stringify from 'fast-safe-stringify'

  //array of object data. identifier defaults to id and label is name.
  //added code in for the demo of multi labels.
  const simpleData = ['🍫 Chocolate', '🍕 Pizza', '🍪 Cookies', '🎉 Big Really Long Desc Lorem Ipsum 123 abc def']

  //initial data
  let initData = {
    user: {
      name: 'Bill'
    },
    dates: { date1: '2022-01-06' }
  }

  let data = {}

  // function setPizza(){
  //   data.favFood = 2
  //   data.favFoodMultiLabel = 2
  //   data.favFoods = [2]
  // }

</script>

<Columns>
  <Col class="is-8">
    <BlockTitle>Simple Form</BlockTitle>
    <Card>
      <CardContent class="p0">
        <ListForm name="list-form-example1" {initData} bind:data >
          <ListField name="user.name" />
          <ListField name="user.password" placeholder="Enter Password"/>
          <ListField name="flex.text1" label="Test Flex"/>
          <ListField name="dates.date1" type="date"/>
          <ListField name="dates.date2" type="date"/>
          <ListSelect name="selects.simple" opts={{label:"Select", placeholder:"Id Value Select"}} itemData={simpleData}/>
          <ListSelect name="selects.customer" opts={{label:"Select", placeholder:"Id Value Select", }}/>
        </ListForm>
      </CardContent>
    </Card>
  </Col>
</Columns>

<!-- <Button class="mt-1" on:click={setPizza}>Set Pizza</Button> -->
<pre class="mt-4">field model: {stringify(data, null, 2)}</pre>
