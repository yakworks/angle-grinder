<script>
  import { getContext } from 'svelte';
  import { ctxKey } from './ListForm.svelte';
  import get from 'lodash/get';
  import { classNames } from '../shared/utils';
  import { fieldDefaults } from '../../src/utils/config/transformer'

  import ListInput  from 'framework7-svelte/esm/svelte/list-input.svelte'

  // import { isUndefined } from '../../src/utils/inspect'

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

  const {form, handleChange} = getContext(ctxKey);

</script>

<ListInput {...$$props} {...opts} class={classes}
  onChange={handleChange} onBlur={handleChange}
  value={get($form, name)}
/>

<!-- <input
  {name}
  {type}
  value={$form[name]}
  on:change={handleChange}
  on:blur={handleChange}
  {...$$props}
/> -->
