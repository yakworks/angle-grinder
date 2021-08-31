<script>
  import {getContext} from 'svelte';
  import {key} from './key';

  export let name;
  export let type = 'text';
  export let clazz = ''
	export { clazz as class } //work around since class is reserved

  const {form, handleChange} = getContext(key);

  export function foo() {
		console.log("foo called")
	}

</script>

<input
  class="input {clazz}"
  {name}
  {type}
  value={$form[name]}
  on:focus
  on:input
  on:change={handleChange}
  on:blur={handleChange}
  {...$$props}
/>
