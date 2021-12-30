<script>
  import { beforeUpdate, createEventDispatcher, onMount } from 'svelte';
  import Select from 'svelte-select'
  import Item from './SelectItem.svelte'
  import apiHolder from '@ag/stores/apiHolder'

  const dispatch = createEventDispatcher()

  export let dataApiKey = undefined
  export let dataApi = undefined

  export let id = null

  export let isMulti = false
  /**
   * if isMulti then keep open after selection.
   */
  export let keepOpen = true
  // export let isDisabled = false;
  // export let isFocused = false;
  export let value = null
  export let itemValue = null
  export let listOpen = false
  export let placeholder = 'Select...'
  export let items = null
  export let noOptionsMessage = 'start typing to search ....'
  export let showIndicator = true
  export let optionIdentifier = 'id'
  export let labelIdentifier = 'name'
  export let getOptionLabel = (option) => option[labelIdentifier]
  export let getSelectionLabel = (option) => option[labelIdentifier]
  export let select = undefined
  /** added opts */
  export let minimumSearchLength = 2

  export let handleSelect = (event) => {
    itemValue = event.detail
    value = itemValue[optionIdentifier]
    console.log("handleSelect itemValue", itemValue)
    console.log("handleSelect value", value)
    // make sure input is focused so it can keep open
    if (keepOpen) document.getElementById(id).focus()
    // redispatch
    dispatch('select', itemValue);
  }

  if (dataApiKey) dataApi = apiHolder.dataApiFactory[dataApiKey]

  if (items && items.length > 0 && typeof items[0] !== 'object') {
    items = convertStringItemsToObjects(items)
  }

  // create unique id if not set
  if (!id) id = _.uniqueId('select')

  let selectOpts = {
    id,
    isMulti,
    noOptionsMessage,
    items,
    placeholder,
    showIndicator,
    optionIdentifier,
    getOptionLabel,
    getSelectionLabel
  }

  if (dataApi) {
    selectOpts.loadOptions = async (filterText) => {
      if (!(filterText.length >= minimumSearchLength)) return
      console.log('filterText', filterText)
      let res = await dataApi.picklistSearch(filterText)
      return res.data
    }
  }

  $: {
    if (keepOpen) {
      keepListOpen(listOpen)
    }
    //bind value
    if (itemValue) setItemValue();
    if (value) setValue();
    console.log("binding itemValue", itemValue)
    console.log("binding value", value)
  }

  function convertStringItemsToObjects(_items) {
    return _items.map((item) => {
      return { [optionIdentifier]: item, [labelIdentifier]: `${item}` }
    })
  }

  function setItemValue() {
    if (typeof itemValue === 'string') {
      console.log("setItemValue value is string", value)
      itemValue = {
        [optionIdentifier]: itemValue,
        [labelIdentifier]: itemValue
      }
    }
    else if (isMulti && Array.isArray(itemValue) && itemValue.length > 0) {
      itemValue = itemValue.map((item) => (typeof item === 'string' ? { [optionIdentifier]: item, [labelIdentifier]: item } : item))
    }
  }

  function setValue() {
    if (typeof value === 'string') {
      console.log("setValue value is string", value)
      itemValue = {
        [optionIdentifier]: value,
        [labelIdentifier]: value
      }
    }
    else if (isMulti && Array.isArray(value) && value.length > 0) {
      itemValue = value.map((item) => (typeof item === 'string' ? { [optionIdentifier]: item, [labelIdentifier]: item } : item))
    }
  }

  function keepListOpen(isOpen) {
    // if activeElement is the input then its focused, so keep open
    if (document.activeElement === document.getElementById(id)) {
      listOpen = true
    }
  }
</script>

{#if isMulti}
  <Select {...selectOpts} value={itemValue} bind:listOpen on:select={handleSelect} bind:this={select}/>
{:else}
  <Select {...selectOpts} value={itemValue} on:select={handleSelect} bind:this={select}/>
{/if}
