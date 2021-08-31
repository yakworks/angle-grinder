<script>
  import {getContext} from 'svelte';
  import {key} from './key';

  export let label = ''
  export let name;
  export let type = 'text';
  export let required = false
  export let placeholder = ''

  let id = `form_${name}`

  const {form, handleChange} = getContext(key);

</script>

<div class="field">
  {#if label}
    <label class="label" class:required for="{id}">{label}</label>
  {/if}
  <div class="field mb-0">
    <div class="control">
      <input
        class="input"
        {id}
        {name}
        {type}
        {placeholder}
        autocomplete="off"
        value={$form[name]}
        on:change={handleChange}
        on:blur={handleChange}
        {...$$props}
      >
    </div>
  </div>
</div>
