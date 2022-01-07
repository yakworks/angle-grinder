<script>
  import { BlockTitle, Columns, Col, Card, CardContent, Button } from '@ag-svelte/index';
  import { ListForm, ListSelect, ListField } from '@ag-svelte/Formify';
  import stringify from 'fast-safe-stringify'

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

  }

  let data = {}

  function setPizza(){
    data.favFood = 2
    data.multiLabel = 2
    data.favFoods = [2]
  }

</script>

<Columns>
  <Col class="is-8">
    <BlockTitle>Simple List</BlockTitle>
    <Card>
      <CardContent class="p0">
        <ListForm {initData} bind:data>
          <ListField name="name" />
          <ListSelect name="favFood" {itemData} />
          <ListSelect name="favFoods" opts={{isMulti:true, keepOpen: true}} {itemData} />
          <ListSelect name="multiLabel" opts={{propertyLabel: ['code', 'name']}} {itemData} />

          <ListSelect name="favFoodObj" opts={{isItemValue:true}} {itemData} />
          <ListSelect name="favFoodsArr" opts={{isMulti:true, keepOpen: true, isItemValue:true}} {itemData} />
        </ListForm>
      </CardContent>
    </Card>
  </Col>
</Columns>

<Button class="mt-1" on:click={setPizza}>Pizza all around</Button>
<pre class="mt-4">field model: {stringify(data, null, 2)}</pre>
