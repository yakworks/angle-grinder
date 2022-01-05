<script>
  import { BlockTitle, Columns, Col, Card, CardContent, List, ListInput, Select, Button } from '@ag-svelte/index';
  import stringify from 'fast-safe-stringify'

  //array of object data. identifier defaults to id and label is name.
  //added code in for the demo of multi labels.
  const itemData = [
    {id: 1, code:'choc', name: '🍫 Chocolate'},
    {id: 2, code:'piz', name: '🍕 Pizza'},
    {id: 3, code:'cook', name: '🍪 Cookies'},
    {id: 4, code:'1234 12345566', name: '🎉 Big Really Long Desc 1234 1234 1234 1234 1234 1234 1234'}
  ]

  let favFood //= 1;
  let favFoods = undefined;

  let favFoodObj //= {id:1};
  let favFoodsArr //= [{id:1}, {id:2}];

  let data = {
    user: {
      name: 'Bill'
    }
  }

  function setPizza(){
    data.favFood = 2
    data.favFoodMultiLabel = 2
    data.favFoods = [2]
  }

</script>

<Columns>
  <Col class="is-8">
    <BlockTitle>Simple List</BlockTitle>
    <Card>
      <CardContent class="p0">
        <List form name="list-form-example1" inlineLabels noHairlinesMd novalidate="true" autocomplete="off">
          <ListInput
            label="Name"
            type="text"
            placeholder="Simple Text Input"
            clearButton
            bind:value={data.user.name}
          />
          <ListInput label="Food" clearButton input={false}>
            <span slot="input">
              <Select theme="f7" bind:value={data.favFood} {itemData} />
            </span>
          </ListInput>
          <ListInput label="Food Multi" input={false}>
            <span slot="input">
              <Select theme="f7" isMulti keepOpen {itemData} bind:value={data.favFoods}/>
            </span>
          </ListInput>
          <ListInput label="Multi Label" input={false}>
            <span slot="input">
              <Select theme="f7" bind:value={data.favFoodMultiLabel} {itemData} propertyLabel={['code', 'name']}/>
            </span>
          </ListInput>
          <ListInput label="Object Bind" input={false}>
            <span slot="input">
              <Select theme="f7" isItemValue bind:value={data.favFoodObj} {itemData} />
            </span>
          </ListInput>
          <ListInput label="Multi Object Bind" input={false}>
            <span slot="input">
              <Select theme="f7" isMulti keepOpen isItemValue bind:value={data.favFoodsArr} {itemData} />
            </span>
          </ListInput>
        </List>
      </CardContent>
    </Card>
  </Col>
</Columns>

<Button class="mt-1" on:click={setPizza}>Set Pizza</Button>
<pre class="mt-4">field model: {stringify(data, null, 2)}</pre>

<h2>Bound value object</h2>
<Select isItemValue {itemData} bind:value={favFoodObj} />
<Button class="mt-1" on:click={(_) => favFoodObj={id:2}}>Set Pizza</Button>
<p>
	Selected item: {JSON.stringify(favFoodObj)}
</p>

<h2>Multi Bound value object</h2>
<Select isMulti keepOpen isItemValue {itemData} bind:value={favFoodsArr}/>
<Button class="mt-1" on:click={(_) => favFoodsArr=[{id:2}]}>Set Pizza</Button>
<p>
	Selected items: {JSON.stringify(favFoodsArr)}
</p>
