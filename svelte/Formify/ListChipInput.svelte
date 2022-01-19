<script>
  import { getContext, createEventDispatcher, onMount } from 'svelte';
  import { ctxKey } from './ListForm.svelte'
  import { _defaults } from '../utils/dash'
  import Select from 'svelte-select'
  import ListInput  from 'framework7-svelte/esm/svelte/list-input.svelte'
  import get from 'lodash/get';
  import { classNames } from '../shared/utils';
  import { fieldDefaults } from '../../src/utils/config/transformer'
  import {selectData} from '../Select/selectData'

  const dispatch = createEventDispatcher()

  /** name is the required key or object field path */
  export let name
  export let label = undefined
  export let placeholder = undefined

  export let opts = {}

  fieldDefaults(name, opts)
  label = opts.label
  placeholder = opts.placeholder ? opts.placeholder : 'Select...'

  let className = undefined;
  export { className as class }

  const { form, updateValidateField, getValue } = getContext(ctxKey);

  $: selectedValue = getValue($form, name)

  export let id = null

  /** itemValue is the selected item object */
  export let value = null
  /** selected item object */
  export let selectedItem = null
  export let inputStyles = ''
  export let items = []
  export let Item = undefined
  export let noOptionsMessage = '...'
  export let listOffset = 2
  export let selectEl = undefined

  export let handleSelect = (event) => {
    console.log("listSelect.handleSelect", event)
    selectedItem = event.detail
    // console.log("listSelect.handleSelect val", value)
    if(selectedItem) {
      value = selectedItem.map((selection) => selection.value)
      console.log("listSelect.handleSelect value", value)
    } else {
      selectedItem = null
      value = null
    }
    updateValidateField(name, value)
  }

  export let handleClear = (event) => {
    console.log("handleClear", event)
    updateValidateField(name, event.detail)
    selectedItem = event.detail
    value = event.detail
  }

  // create unique id if not set
  if (!id) id = _.uniqueId('select')

  _defaults(opts, { Item, id, inputStyles, listOffset, noOptionsMessage, items, placeholder})

</script>

<ListInput {label} clearButton={false} input={false} class={className}>
  <div class="select-theme f7" slot="input">
      <Select isMulti isCreatable items={[]} containerClasses="{className}" {...opts} value={selectedValue}
        on:select={handleSelect} on:clear={handleClear} bind:this={selectEl}/>
  </div>
</ListInput>

<style>
  .select-theme.f7 {
    --listBorder: 0px;
    --borderRadius: 0px;
    --itemFirstBorderRadius: 0;
    --itemIsActiveBG: var(--color-primary-light);
    --listShadow: var(--f7-card-box-shadow);
    --borderFocusColor: none;
    --inputPadding: 0px;
    --height: 36px;
    --border: none;
    --padding: 0px;
    --multiSelectPadding: 0px;
    --indicatorRight: 0px;
    --clearSelectRight: 0px;
    --listZIndex: 99;
  }

</style>
