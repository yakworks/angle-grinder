<script>
  import { getContext } from 'svelte';
  import {ctxKey} from './ctxKey'
  import { classNames } from '../shared/utils';
  import { fieldDefaults } from '@yakit/core/transformer'

  import ListInput  from 'framework7-svelte/esm/svelte/list-input.svelte'

  let className = undefined;
  export { className as class }

  /**
   * name is the required key or object field path
   */
  export let name
  export let type = 'text'

  export let opts = {
    type,
    label: undefined,
    placeholder: undefined,
    clearButton :true
  }

  fieldDefaults(name, opts)

  $: classes = classNames(className, {
    'item-input-date5': opts.type === 'date',
  })

  const {form, handleChange, getValue} = getContext(ctxKey);

  export let value = null

  $: value = getValue($form, name)

</script>

<ListInput {...$$props} {...opts} class={classes}
  onChange={handleChange} onBlur={handleChange}
  {value}
/>

<!-- <input
  {name}
  {type}
  value={$form[name]}
  on:change={handleChange}
  on:blur={handleChange}
  {...$$props}
/> -->
