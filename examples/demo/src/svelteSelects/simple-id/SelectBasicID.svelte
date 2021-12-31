<script>
  import { Select, Button } from '@ag-svelte/index';

  const items = [
    {id: 1, name: '🍫 Chocolate'},
    {id: 2, name: '🍕 Pizza'},
    {id: 3, name: '🍪 Cookies'}
  ]

  let favFood = 1;
  let favFoods = undefined;

  let favFoodObj = {id:1};
  let favFoodsArr = [{id:1}, {id:2}];

</script>

<h2>Bound valueKey</h2>
<!-- <Select bind:selectedValue={basicVal} {items} /> -->
<Select bind:valueKey={favFood} {items} />
<Button class="mt-1" on:click={(_) => favFood=2}>Set Pizza</Button>
<p>
	Selected item: {JSON.stringify(favFood)}
</p>

<h2>Multi Bound valueKey</h2>
<Select isMulti keepOpen {items} bind:valueKey={favFoods}/>
<Button class="mt-1" on:click={(_) => favFoods=[2]}>Set Pizza</Button>
<p>
	Selected items: {JSON.stringify(favFoods)}
</p>

<h2>Bound value object</h2>
<Select bind:value={favFoodObj} {items} />
<Button class="mt-1" on:click={(_) => favFoodObj={id:2}}>Set Pizza</Button>
<p>
	Selected item: {JSON.stringify(favFoodObj)}
</p>

<h2>Multi Bound value object</h2>
<Select isMulti keepOpen {items} bind:value={favFoodsArr}/>
<Button class="mt-1" on:click={(_) => favFoodsArr=[{id:2}]}>Set Pizza</Button>
<p>
	Selected items: {JSON.stringify(favFoodsArr)}
</p>
