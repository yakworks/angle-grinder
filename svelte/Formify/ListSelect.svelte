<script>
  // import { onMount, createEventDispatcher } from 'svelte'
  import { getContext, createEventDispatcher, onMount } from 'svelte';
  import { ctxKey } from './ListForm.svelte'
  import { _defaults } from '../utils/dash'
  import Select from 'svelte-select'
  import ListInput  from 'framework7-svelte/esm/svelte/list-input.svelte'
  import get from 'lodash/get';
  import { classNames } from '../shared/utils';
  import { fieldDefaults } from '../../src/utils/config/transformer'

  import {selectData} from '../Select/selectData'
  import ItemMulti from '../Select/ItemMulti.svelte'
  import ItemSingle from '../Select/ItemSingle.svelte'

  const dispatch = createEventDispatcher()

  /** name is the required key or object field path */
  export let name
  export let label = undefined
  export let placeholder = undefined
  // export let type = 'select'

  export let opts = {}

  fieldDefaults(name, opts)
  label = opts.label
  placeholder = opts.placeholder ? opts.placeholder : 'Select...'

  let className = undefined;
  export { className as class }

  const { form, updateValidateField, getValue } = getContext(ctxKey);

  export let dataApiKey = undefined
  export let dataApi = undefined
  /** will eagerely load the data set and not on demand in conjunction with  minimumSearchLength */
  export let isEagerLoad = true
  // if isEagerLoad is false then this is number of chars for search before it does a load
  export let minimumSearchLength = 2

  export let id = null

  export let isMulti = false
  export let isWaiting = false
  /** if isMulti then keep open after value.*/
  export let keepOpen = undefined

  // export let isDisabled = false;
  // export let isFocused = false;
  /** value is the selected item object */
  export let value = null
  /** if true then bound value will be the object vs the key/id */
  export let isValueObject = false
  /** selected item object */
  export let selectedItem = null
  export let inputStyles = '';
  export let listOpen = false
  export let loadOptionsInterval = 300;
  export let items = null
  export let itemData = null
  export let Item = undefined
  export let noOptionsMessage = 'start typing to search ....'
  export let showIndicator = true
  export let listOffset = 2
  export let propertyKey = 'id'
  export let propertyLabel = undefined
  export let selectEl = undefined

  export let getOptionLabel = (itm, filterText) => {
    return manager.getOptionLabel(itm, filterText)
  }

  export let getSelectionLabel = (itm) => {
    return manager.getSelectionLabel(itm)
  }

  //setup defaults
  if(!propertyLabel) propertyLabel = 'name'
  if (Array.isArray(propertyLabel)) {
      Item = ItemMulti
  } else {
      Item = ItemSingle
  }

  _defaults(opts, {
    dataApi,
    dataApiKey,
    isEagerLoad,
    getOptionLabel,
    getSelectionLabel,
    Item,
    id,
    isMulti,
    isWaiting,
    isValueObject,
    inputStyles,
    loadOptionsInterval,
    listOffset,
    propertyLabel,
    propertyKey,
    labelIdentifier: propertyLabel, //for selectComp
    optionIdentifier: propertyKey, //for selectComp
    minimumSearchLength,
    noOptionsMessage,
    items,
    itemData,
    placeholder,
    showIndicator
  })

  // create unique id if not set
  if (!opts.id) opts.id = _.uniqueId('select')
  //default to true for isMulti
  if (opts.keepOpen === undefined) opts.keepOpen = opts.isMulti

  export let manager = selectData(opts).init()

  console.log("keep list open", opts.keepOpen)
  $: if (opts.keepOpen) {
    keepListOpen(listOpen) // we dont use the listOpen in method but this registers it with svelete to react
  }

  function keepListOpen(_) {
    console.log("keep list open")
    // if activeElement is the input then its focused, so keep open
    if (document.activeElement === document.getElementById(opts.id)) {
      listOpen = true
    }
  }

  // reacte to listOpen to load items if they have not been yet.
  $: (async () => {
    if(listOpen) opts.items = await manager.loadItemsIfNeeded(listOpen)
  })(); //trick way to call svelte reactive for async


  //Subscribe to the form changes
  form.subscribe(async _data => {
    let _val = getValue(_data, name)
    // console.log('form.subscribe with _val:value', _val, value)
    if(!_val && !value) return //skip it if both are blank so we dont initialize the data
    await manager.loadItemsIfNeeded()
    selectedItem = manager.getSelectedItem(_val)
  })

  export let handleClear = (event) => {
    console.log("handleClear", event)
    updateValidateField(name, event.detail)
    selectedItem = event.detail
    value = event.detail
  }

  export let handleSelect = (event) => {
    selectedItem = event.detail
    if (selectedItem) {
      value = manager.getSelectedValue(selectedItem)
      console.log("handleSelect updated value:selectedItem", value, selectedItem)
    }
    else if (isMulti) {
      selectedItem = null
      value = null
    }
    updateValidateField(name, value)

    // make sure input is focused so it can keep open
    if (opts.isMulti && opts.keepOpen) document.getElementById(opts.id).focus()

    // redispatch select event
    dispatch('select', selectedItem);
  }

</script>

<ListInput {label} clearButton={false} input={false} class={className}>
  <div class="select-theme f7" slot="input">
      <Select containerClasses="{className}" {...opts} value={selectedItem} bind:listOpen
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
