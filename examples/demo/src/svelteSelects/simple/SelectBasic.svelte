<script>
  import { Select, Button } from '@ag-svelte/index';

  const items = [ 'Chocolate', 'Pizza', '🍪 Cookies']

  let favFood = 'Chocolate';
  let favFoods = undefined;

</script>

<h2>Single basic</h2>
<!-- <Select bind:selectedValue={basicVal} {items} /> -->
<Select bind:value={favFood} {items} />
<Button class="mt-1" on:click={(_) => favFood='Pizza'}>Set Pizza</Button>
<p>
	Selected item: {JSON.stringify(favFood)}
</p>

<h2>Multi basic</h2>
<Select isMulti keepOpen {items} bind:value={favFoods}/>
<Button class="mt-1" on:click={(_) => favFoods=['Pizza']}>Set Pizza</Button>
<p>
	Selected items: {JSON.stringify(favFoods)}
</p>
