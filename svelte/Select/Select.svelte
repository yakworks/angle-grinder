<script>
  import { beforeUpdate, createEventDispatcher, onMount } from 'svelte';
  import dataQuery from './dataQuery'
  import Select from 'svelte-select'
  import Item from './SelectItem.svelte'
  import apiHolder from '@ag/stores/apiHolder'

  const dispatch = createEventDispatcher()

  export let dataApiKey = undefined
  export let dataApi = undefined

  export let id = null

  export let isMulti = false
  /**
   * if isMulti then keep open after value.
   */
  export let keepOpen = true
  // export let isDisabled = false;
  // export let isFocused = false;
  /** valueKey is the id/key valueKey*/
  export let valueKey = null
  /** itemValue is the selected item object */
  export let value = null
  export let inputStyles = '';
  export let listOpen = false
  export let loadOptionsInterval = 300;
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
    console.log("handleSelect", event)
    value = event.detail
    if (isMulti && !value) {
      value = null
    }
    // if (isMulti && Array.isArray(value) && value.length > 0) {
    //   valueKey = value.map((item) => item[optionIdentifier])
    // } else {
    //   valueKey = value[optionIdentifier]
    // }

    // make sure input is focused so it can keep open
    if (keepOpen) document.getElementById(id).focus()
    // redispatch
    dispatch('select', value);
  }

  export let handleClear = (event) => {
    console.log("handleClear", event)
    value = event.detail
    valueKey = event.detail
  }

  // if (dataApiKey) dataApi = apiHolder.dataApiFactory[dataApiKey]

  // items = dataQuery.translateItemsIfNeeded({items, optionIdentifier, labelIdentifier})

  // create unique id if not set
  if (!id) id = _.uniqueId('select')

  let selectOpts = {
    dataApi,
    dataApiKey,
    id,
    isMulti,
    inputStyles,
    loadOptionsInterval,
    labelIdentifier,
    minimumSearchLength,
    noOptionsMessage,
    items,
    placeholder,
    showIndicator,
    optionIdentifier,
    getOptionLabel,
    getSelectionLabel
  }

  // let opts = { ...selectOpts, dataApi, dataApiKey}

  dataQuery.setupData(selectOpts)
  items = selectOpts.items

  // if (dataApi) {
  //   selectOpts.loadOptions = async (filterText) => {
  //     if (!(filterText.length >= minimumSearchLength)) return
  //     console.log('filterText', filterText)
  //     let res = await dataApi.picklistSearch(filterText)
  //     return res.data
  //   }
  // }

  $: if (keepOpen) {
      keepListOpen(listOpen)
    }

  $:{ //bind valueKey
    if (value){
      value = setValue();
    }
  }

  $: if(valueKey) watchValueKey(valueKey);

  function watchValueKey(key) {

    console.log("fired watchValueKey", key)
    if (Array.isArray(key)) {
      value = key.map((selection) => findItemByKey(selection));
    } else {
      value = findItemByKey(key)
    }
  }

  function setValue() {
    console.log("setValue", value)
    let tVal
    if (Array.isArray(value)) {
      tVal = value.map((selection) => findItem(selection));
      valueKey = value.map( selection => getItemKey(selection))
    } else {
      tVal = findItem(value)
      valueKey = getItemKey(value)
    }
    return tVal
  }

  function findItem(selection) {
    return findItemByKey(getItemKey(selection)) || selection
  }

  function findItemByKey(key) {
    return items.find((item) => getItemKey(item) === key)
  }

  function getItemKey(item) {
    return item[optionIdentifier]
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

{#if isMulti}
  <Select {...selectOpts} value={value} bind:listOpen on:select={handleSelect} on:clear={handleClear} bind:this={select}/>
{:else}
  <Select {...selectOpts} value={value} on:select={handleSelect} on:clear={handleClear} bind:this={select}/>
{/if}
