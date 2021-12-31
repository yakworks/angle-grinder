<script>
  import { beforeUpdate, createEventDispatcher, onMount } from 'svelte';
  import dataQuery from './dataQuery'
  import {selectData} from './selectData'
  import Select from 'svelte-select'
  import Item from './SelectItem.svelte'
  import apiHolder from '@ag/stores/apiHolder'

  const dispatch = createEventDispatcher()

  export let dataApiKey = undefined
  export let dataApi = undefined

  export let id = null

  export let isMulti = false

  /** if isMulti then keep open after value.*/
  export let keepOpen = true

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
  export let placeholder = 'Select...'
  export let items = null
  export let noOptionsMessage = 'start typing to search ....'
  export let showIndicator = true
  export let listOffset = 2
  export let propertyKey = 'id'
  export let propertyLabel = 'name'
  // export let getOptionLabel = (option) => option[propertyLabel]
  // export let getSelectionLabel = (option) => option[propertyLabel]
  export let select = undefined
  /** added opts */
  export let minimumSearchLength = 2

  export let handleSelect = (event) => {
    console.log("handleSelect", event)
    selectedItem = event.detail
    if(selectedItem) {
      value = selData.getSelectedValue(selectedItem)
    } else {
      // if empty slected and multi then make sure they are blanked out
      if (isMulti) {
        selectedItem = null
        value = null
      }
    }

    // make sure input is focused so it can keep open
    if (isMulti && keepOpen) document.getElementById(id).focus()
    // redispatch select event
    dispatch('select', selectedItem);
  }

  export let handleClear = (event) => {
    console.log("handleClear", event)
    selectedItem = event.detail
    value = event.detail
  }

  // create unique id if not set
  if (!id) id = _.uniqueId('select')

  let opts = {
    dataApi,
    dataApiKey,
    id,
    isMulti,
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
    placeholder,
    showIndicator
  }

  let selData = selectData(opts).init()
  items = opts.items

  $: if (keepOpen) {
      keepListOpen(listOpen)
    }
  $: if (listOpen) {
      console.log("listOpen", listOpen)
    }

  //watch if updated from outside
  $: if(value) watchValueKey(value);

  function watchValueKey(val) {
    if(isItemValue) {
      value = selData.getSelectedValue(val)
      selectedItem = value
    } else {
      selectedItem = selData.getSelectedValue(val, selData.findItemByKey)
    }
  }

  function keepListOpen(isOpen) {
    // if activeElement is the input then its focused, so keep open
    if (document.activeElement === document.getElementById(id)) {
      listOpen = true
    }
  }

  beforeUpdate(async () => {
    console.log("beforeUpdate")
  });

  // onMount(() => {
  //   if (isFocused && input) input.focus();
  // });

</script>

<div class="select-theme">
  {#if isMulti}
    <Select {...opts} value={selectedItem} bind:listOpen on:select={handleSelect} on:clear={handleClear} bind:this={select}/>
  {:else}
    <Select {...opts} value={selectedItem} on:select={handleSelect} on:clear={handleClear} bind:this={select}/>
  {/if}
</div>

<style>
  .select-theme {
    --listBorder: 1px solid var(--color-shade-15);
    --borderRadius: 4px;
    --itemFirstBorderRadius: 0;
    --itemIsActiveBG: var(--color-primary-light);
    --listShadow: var(--f7-card-box-shadow);
    --borderFocusColor: none;
  }
</style>
