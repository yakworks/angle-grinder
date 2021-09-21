<script>
  import {getContext} from 'svelte';
  import {key} from './key';

  export let name;

  const {errors} = getContext(key);
</script>

{#if $errors[name]}
  <p class="help is-danger" {...$$props}>{$errors[name]}</p>
{/if}
