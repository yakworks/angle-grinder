<script>
  // import { onMount, createEventDispatcher } from 'svelte'

  import {getContext} from 'svelte';
  import { ctxKey } from './ListForm.svelte';
  import Select from '../Select/Select.svelte';
  import ListInput  from 'framework7-svelte/esm/svelte/list-input.svelte'
  import get from 'lodash/get';
  import { classNames } from '../shared/utils';
  import { fieldDefaults } from './transformer'

  let className = undefined;
  export { className as class }

  /** name is the required key or object field path */
  export let name
  export let itemData = null

  export let opts = {}

  fieldDefaults(name, opts)
  let { label } = opts

  let manager //bound select manager
  let selectedValue

  $: classes = classNames(className, {
    // 'item-input-date5': opts.type === 'date',
  })

  const { form, updateValidateField } = getContext(ctxKey);

  selectedValue = get($form, name)

  export let handleSelect = (event) => {
    console.log("ListSelect.handleSelect", event)
    updateValidateField(name, selectedValue)
  }

</script>

<ListInput {label} clearButton={false} input={false} class={classes}>
  <span slot="input">
    <Select theme="f7" bind:manager bind:value={selectedValue} {...opts} {itemData}
      on:select={handleSelect} />
  </span>
</ListInput>
