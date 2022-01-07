<script>
  import { onMount } from 'svelte';
  import { Select, Button } from '@ag-svelte/index';

  const itemData = [ 'Chocolate', 'Pizza', '🍪 Cookies']

  let data = {
    // favFood: undefined,
    favFoods: undefined
  }

  onMount(async () => {
    // uncomment to simulate loading data in onMount
    // favFood = 'Chocolate'
  });

</script>

<h2>Single basic</h2>
<!-- <Select bind:selectedValue={basicVal} {items} /> -->
<Select bind:value={data.favFood} {itemData} />
<Button class="mt-1" on:click={(_) => data.favFood='Pizza'}>Set Pizza</Button>
<p>
	Selected item: {JSON.stringify(data.favFood)}
</p>

<h2>Multi basic</h2>
<Select isMulti keepOpen {itemData} bind:value={data.favFoods}/>
<Button class="mt-1" on:click={(_) => data.favFoods=['Pizza']}>Set Pizza</Button>

<h2 class=mt-4>data:</h2>
<pre>{JSON.stringify(data)}</pre>
