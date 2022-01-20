<script>
  import { Select } from '@yakit/svelte/index';

  const items = [ 'Chocolate', 'Pizza', '🍪 Cookies']

  let favFood = 'Pizza';
  let favFoods = undefined;

</script>

<h2>Single basic</h2>
<!-- <Select bind:selectedValue={basicVal} {items} /> -->
<Select bind:value={favFood} {items} />
<p>
	Selected item: {JSON.stringify(favFood)}
</p>

<h2>Multi basic</h2>
<Select isMulti keepOpen {items} bind:value={favFoods}/>
<p>
	Selected items: {JSON.stringify(favFoods)}
</p>
