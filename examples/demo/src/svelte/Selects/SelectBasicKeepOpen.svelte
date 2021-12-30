<script>
  import Select from 'svelte-select';
  const items = [
		{value: 'chocolate', label: '🍫 Chocolate', group: 'Sweet'},
    {value: 'pizza', label: '🍕 Pizza', group: 'Savory'},
    {value: 'cake', label: '🎂 Cake', group: 'Sweet'},
    {value: 'cookies', label: '🍪 Cookies', group: 'Savory'},
    {value: 'ice-cream', label: '🍦 Ice Cream', group: 'Sweet'}
	];

	let favouriteFood = undefined;
	let	listOpen = false;

	$: {
		keepListOpenIfFocused(listOpen);
	}

	function keepListOpenIfFocused() {
		const element = document.getElementById('food1');
    console.log("element", element)
		const isFocused = (document.activeElement === element);
		if (isFocused) listOpen = true;
	}

	function handleSelect(event) {
		favouriteFood = event.detail;
	}
</script>

<h1>Svelte Select Example</h1>
<p> WIP from here https://svelte.dev/repl/e1ca7867e3b543539b25ccba1ef4de0a?version=3.44.0
  not working yet, has some issues
</p>
<form>
	<label for="food1">Favourite food:
		<Select bind:listOpen id="food1" {items} on:select={handleSelect} isMulti />
	</label>
</form>

<style>
	form {
		max-width: 400px;
		background: #f4f4f4;
		padding: 20px;
		border-radius: 4px;
	}

	label {
		margin: 0 0 10px;
	}
</style>
