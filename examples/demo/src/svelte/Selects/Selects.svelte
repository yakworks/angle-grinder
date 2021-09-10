<script>
	import Select from 'svelte-select';
	import Item from './BeerItem.svelte';
	import loadOptions from './beers.js';
	import Icon from './Icon.svelte';

	const items = ['One', 'Two', 'Three'];

	const complexItems = [
		{value: 'chocolate', label: 'Chocolate', group: 'Sweet'},
    {value: 'pizza', label: 'Pizza', group: 'Savory'},
    {value: 'cake', label: 'Cake', group: 'Sweet', selectable: false},
    {value: 'chips', label: 'Chips', group: 'Savory'},
    {value: 'ice-cream', label: 'Ice Cream', group: 'Sweet'}
	];

	const groupBy = (item) => item.group;
	const optionIdentifier = 'id';
  const getOptionLabel = (option) => option.name;
  const getSelectionLabel = (option) => option.name;

  function handleSelect(event) {
    console.log('selected item', event.detail);
    // .. do something here 🙂
  }

  let basicVal = "One";
  let multiVal
</script>

<h2>Single basic</h2>
<Select bind:value={basicVal} {items} on:select={handleSelect}></Select>
<p>
	Selected item: {JSON.stringify(basicVal)}
</p>

<h2>Complex</h2>
<Select items={complexItems}></Select>

<h2>Group</h2>
<Select items={complexItems} {groupBy}></Select>

<h2>Multi</h2>
<Select items={complexItems} isMulti={true} bind:value={multiVal}></Select>
<p>
	Selected item: {JSON.stringify(multiVal)}
</p>

<h2>Async</h2>
<Select {loadOptions} {optionIdentifier} {getSelectionLabel} {getOptionLabel} {Item} placeholder="Search for <"></Select>

<div class="themed">
	<h2>Theming</h2>
	<Select {items}></Select>
</div>

<div class="icon">
	<h2>Icons</h2>
	<Select {items} {Icon} showChevron={true}></Select>
</div>

<style>
	/*
			CSS variables can be used to control theming.
			https://github.com/rob-balfre/svelte-select/blob/master/docs/theming_variables.md
	*/

	.themed {
		--border: 3px solid blue;
		--borderRadius: 10px;
		--placeholderColor: blue;
	}

	.icon {
		--selectedItemPadding: 0 10px 0 8px;
		--inputPadding: 0 10px 0 40px;
	}
</style>
