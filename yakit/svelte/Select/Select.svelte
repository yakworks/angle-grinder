<script>
  import { beforeUpdate, createEventDispatcher, onMount } from 'svelte';
  import selectData from '@yakit/ui/select/selectContext'
  import Select from 'svelte-select'
  import ItemMulti from './ItemMulti.svelte'
  import ItemSingle from './ItemSingle.svelte'
  import { uniqueId } from '@yakit/core/dash'
  import apiHolder from '@yakit/core/stores/apiHolder'

  const dispatch = createEventDispatcher()

  export let className = ''
	export { className as class } //work around since class is reserved

  export let dataApiKey = undefined
  export let dataApi = undefined
  // will eagerely load the data set and not on demand in conjunction with  minSearchChars
  export let isEagerLoad = true
  // if isEagerLoad is false then this is number of chars for search before it does a load
  export let minSearchChars = 2

  export let id = null

  export let isMulti = false
  export let isWaiting = false
  /** if isMulti then keep open after value.*/
  export let keepOpen = true

  // export let isDisabled = false;
  // export let isFocused = false;
  /** itemValue is the selected item object */
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
  export let placeholder = 'Select...'
  export let propertyKey = 'id'
  export let propertyLabel = undefined
  // export let getOptionLabel = (option) => option[propertyLabel]
  // export let getSelectionLabel = (option) => option[propertyLabel]
  export let select = undefined
  /** added opts */
  //class to add to the wrapper
  export let theme = "bulma"

  export let getOptionLabel = (itm, filterText) => {
    return manager.getOptionLabel(itm, filterText)
  }

  export let getSelectionLabel = (itm) => {
    return manager.getSelectionLabel(itm)
  }

  export let handleSelect = (event) => {
    selectedItem = event.detail
    if(selectedItem) {
      value = manager.getSelectedValue(selectedItem)
      console.log("handleSelect updated value:selectedItem", value, selectedItem)
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

  //setup defaults
  if(!propertyLabel) propertyLabel = 'name'
  if (Array.isArray(propertyLabel)) {
      Item = ItemMulti
  } else {
      Item = ItemSingle
  }

  // create unique id if not set
  if (!id) id = uniqueId('select')

  let opts = {
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
    minSearchChars,
    noOptionsMessage,
    items,
    itemData,
    placeholder,
    showIndicator
  }

  export let manager = selectData(opts).init()

  $: if (keepOpen) {
    keepListOpen(listOpen)
  }

  // reacte to listOpen to load items if they have not been yet.
  $: if (listOpen) {
    //if its not preloaded data or rest call that loads all on first use then load it
    Promise.resolve(loadItemsIfNeeded(listOpen))
  }

  // $: if (value) {
  //   loadItemsIfNeeded()
  //   watchValueKey(value)
    //if its not preloaded data or rest call that loads all on first use then load it
    // Promise.resolve(loadItemsIfNeeded())
    //   .then( () => {
    //     watchValueKey(value)
    //   })
    // await loadItemsIfNeeded(listOpen)
  // }
  //watch if updated from outside
  // $: if(value) watchValueKey(value);

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
    if(isValueObject) {
      console.log("watchValueKey manager.getSelectedValue(val)", manager.getSelectedValue(val))
      // value = manager.getSelectedValue(val)
      selectedItem = value
    } else {
      selectedItem = manager.getSelectedValue(val, manager.findItemByKey)
      console.log("watchValueKey updated val:selectedItem", val, selectedItem)
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

  onMount(() => {
    console.log("select", select)
  });

</script>

<div class="select-theme {theme}">
  {#if isMulti}
    <Select containerClasses="{className}" {...opts} value={selectedItem} bind:listOpen
      on:select={handleSelect} on:clear={handleClear} bind:this={select}/>
  {:else}
    <Select containerClasses="{className}" {...opts} value={selectedItem} bind:listOpen
      on:select={handleSelect} on:clear={handleClear} bind:this={select}/>
  {/if}
</div>

<style>
  .select-theme.bulma {
    --listBorder: 1px solid var(--color-shade-15);
    --borderRadius: 4px;
    --itemFirstBorderRadius: 0;
    --itemIsActiveBG: var(--color-primary-light);
    --listShadow: var(--f7-card-box-shadow);
    --borderFocusColor: none;
  }

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
