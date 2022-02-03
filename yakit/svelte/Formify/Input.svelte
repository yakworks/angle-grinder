<script>
  import {getContext} from 'svelte';
  import {ctxKey} from './ctxKey';
  import { classNames } from '../shared/utils';
  import { fieldDefaults } from '@yakit/core/transformer'
  import { _defaults } from '@yakit/core/dash'

  let classes = undefined;
  export { classes as class }

  /**
   * name is the required key or object field path
   */
  export let name
  export let type = 'text'
  export let placeholder = undefined
  export let clearButton = true
  export let disabled = undefined

  $: inputWrapClasses = classNames('item-input-wrap', {
    'item-input-date5': type === 'date',
  });

  const {form, handleChange, getValue} = getContext(ctxKey);

  export let value = null

  $: value = getValue($form, name)

</script>


<div class={inputWrapClasses}>
  <input
    {name}
    {type}
    class={classes}
    {value}
    {placeholder}
    {disabled}
    on:change={handleChange}
    on:blur={handleChange}
  />
  {#if clearButton}<span class="input-clear-button" />{/if}
</div>
