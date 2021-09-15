<script>
	import Select from 'svelte-select';

	const items = [{id: 1, name: 'Blue'}, {id: 2, name: 'Red'}, {id:3, name: 'Green'}];

	const optionIdentifier = 'id';
  const getOptionLabel = (option) => option.name;
  const getSelectionLabel = (option) => option.name;

  function handleSelect(event) {
    console.log('selected item', event.detail);
  }

  let basicVal;
  let multiVal = [{"id":1}];

  let opts = {
    showIndicator: true,
    optionIdentifier,
    getOptionLabel,
    getSelectionLabel
  }

</script>

<h2>Single basic</h2>
<Select bind:value={basicVal} {items} {...opts} on:select={handleSelect}></Select>
<p>
	Selected item: {JSON.stringify(basicVal)}
</p>

<h2>Multi basic</h2>
<Select isMulti={true} bind:value={multiVal} {items} {...opts} on:select={handleSelect}></Select>
<p>
	Selected item: {JSON.stringify(multiVal)}
</p>

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
