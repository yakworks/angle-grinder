<script>
  import { Select, Button } from '@yakit/svelte/index';

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

</script>

<h2>Bound value key</h2>
<!-- <Select bind:selectedValue={basicVal} {items} /> -->
<Select class="w-50" bind:value={favFood} {itemData} />
<Button class="mt-1" on:click={(_) => favFood=2}>Set Pizza</Button>
<p>
	Selected item: {JSON.stringify(favFood)}
</p>

<h2 class="mt-4">Multi Labels</h2>
<!-- <Select bind:selectedValue={basicVal} {items} /> -->
<Select class="w-50" bind:value={favFood} {itemData} propertyLabel={['code', 'name']}/>
<Button class="mt-1" on:click={(_) => favFood=2}>Set Pizza</Button>
<p>
	Selected item: {JSON.stringify(favFood)}
</p>

<h2 class="mt-4">Multi Bound value key</h2>
<Select class="w-50" isMulti keepOpen {itemData} bind:value={favFoods}/>
<Button class="mt-1" on:click={(_) => favFoods=[2]}>Set Pizza</Button>
<p>
	Selected items: {JSON.stringify(favFoods)}
</p>

<h2>Bound value object</h2>
<Select isValueObject {itemData} bind:value={favFoodObj} />
<Button class="mt-1" on:click={(_) => favFoodObj={id:2}}>Set Pizza</Button>
<p>
	Selected item: {JSON.stringify(favFoodObj)}
</p>

<h2>Multi Bound value object</h2>
<Select isMulti keepOpen isValueObject {itemData} bind:value={favFoodsArr}/>
<Button class="mt-1" on:click={(_) => favFoodsArr=[{id:2}]}>Set Pizza</Button>
<p>
	Selected items: {JSON.stringify(favFoodsArr)}
</p>
