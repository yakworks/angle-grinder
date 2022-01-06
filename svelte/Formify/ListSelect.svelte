<script>
  // import { onMount, createEventDispatcher } from 'svelte'
  import { getContext, createEventDispatcher, onMount } from 'svelte';
  import { ctxKey } from './ListForm.svelte'
  import { _defaults } from '../utils/dash'
  import Select from 'svelte-select'
  import ListInput  from 'framework7-svelte/esm/svelte/list-input.svelte'
  import get from 'lodash/get';
  import { classNames } from '../shared/utils';
  import { fieldDefaults } from './transformer'
  import {selectData} from '../Select/selectData'
  import ItemMulti from '../Select/ItemMulti.svelte'
  import ItemSingle from '../Select/ItemSingle.svelte'

  const dispatch = createEventDispatcher()

  /**
   * name is the required key or object field path
   */
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

  let selectedValue = getValue(name)
  // form.subscribe(_data => {
  //   let _val = get(_data, name)
  //   if(_val !== selectedValue){
  //     console.log("data.supscribe updating selectedValue ${name}", _val)
  //     selectedValue = _val
  //   }
  // })

  // let selectedValue
  // $: {
  //   selectedValue = get($form, name)
  //   console.log(`selectedValue ${name}`, selectedValue)
  // }

  export let dataApiKey = undefined
  export let dataApi = undefined
  // will eagerely load the data set and not on demand in conjunction with  minimumSearchLength
  export let dataApiEager = true
  // if dataApiEager is false then this is number of chars for search before it does a load
  export let minimumSearchLength = 2

  export let id = null

  export let isMulti = false
  export let isWaiting = false
  /** if isMulti then keep open after value.*/
  export let keepOpen = isMulti

  // export let isDisabled = false;
  // export let isFocused = false;
  /** itemValue is the selected item object */
  export let value = null
  /** if true then bound value will be the key/optionId */
  export let isItemValue = false
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

  export let handleSelect = (event) => {
    console.log("listSelect.handleSelect", event)
    // updateValidateField(name, selectedValue)

    selectedItem = event.detail
    if(selectedItem) {
      value = manager.getSelectedValue(selectedItem)
    } else {
      // if empty slected and multi then make sure they are blanked out
      if (isMulti) {
        selectedItem = null
        value = null
      }
    }
    updateValidateField(name, value)

    // make sure input is focused so it can keep open
    if (isMulti && keepOpen) document.getElementById(id).focus()

    // redispatch select event
    // dispatch('select', selectedItem);
  }

  export let handleClear = (event) => {
    console.log("handleClear", event)
    updateValidateField(name, event.detail)
    selectedItem = event.detail
    value = event.detail
  }

  //setup defaults
  if(!propertyLabel) propertyLabel = 'name'
  if (Array.isArray(propertyLabel)) {
      Item = ItemMulti
  } else {
      Item = ItemSingle
  }

  // create unique id if not set
  if (!id) id = _.uniqueId('select')

  _defaults(opts, {
    dataApi,
    dataApiKey,
    dataApiEager,
    getOptionLabel,
    getSelectionLabel,
    Item,
    id,
    isMulti,
    isWaiting,
    isItemValue,
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

  export let manager = selectData(opts).init()

  $: if (keepOpen) {
    keepListOpen(listOpen)
  }

  // reacte to listOpen to load items if they have not been yet.
  $: if (listOpen) {
    //if its not preloaded data or rest call that loads all on first use then load it
    Promise.resolve(loadItemsIfNeeded(listOpen))
  }

  // $: (async () => {
  //   if(value) {
  //     await loadItemsIfNeeded()
  //     watchValueKey(value)
  //   }
  // })();


  // react to value changes from outside
  $: if(value) {
    Promise.resolve(loadItemsIfNeeded())
      .then( () => {
        watchValueKey(value)
      })
  }

  async function loadItemsIfNeeded(_) {
    if(!opts.items && !opts.isWaiting) {
      console.log("first call to load data")
      opts.isWaiting = true
      opts.items = await opts.data()
      opts.isWaiting = false
    }
  }

  function watchValueKey(val) {
    if(isItemValue) {
      console.log("manager.getSelectedValue(val)", manager.getSelectedValue(val))
      // value = manager.getSelectedValue(val)
      selectedItem = value
    } else {
      selectedItem = manager.getSelectedValue(val, manager.findItemByKey)
    }
  }

  function keepListOpen(isOpen) {
    // if activeElement is the input then its focused, so keep open
    if (document.activeElement === document.getElementById(id)) {
      listOpen = true
    }
  }

  // beforeUpdate(async () => {
  //   console.log("beforeUpdate")
  // });

  // onMount(() => {
  //   console.log("select", select)
  // });

</script>

<ListInput {label} clearButton={false} input={false} class={className}>
  <div class="select-theme f7" slot="input">
      <Select containerClasses="{className}" {...opts} value={selectedValue} bind:listOpen
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
