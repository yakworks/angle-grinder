<script>
	import Select from 'svelte-select';
  // import Item from './SelectItem.svelte';
  import apiHolder from '@yakit/core/stores/apiHolder';

  export let dataApiKey = undefined
  export let dataApi = undefined

  export let id = null;

  export let isMulti = false;
  // export let isDisabled = false;
  // export let isFocused = false;
  // export let value = null;
  export let placeholder = 'Select...';
  export let items = null;
  export let noOptionsMessage="start typing to search ...."
  export let showIndicator = true
  export let optionIdentifier = 'id';

  export let getOptionLabel = (option) => option.name;
  export let getSelectionLabel = (option) => option.name;

  if(dataApiKey) dataApi = apiHolder.dataApiFactory[dataApiKey]

  let selectOpts = {
    id, isMulti, noOptionsMessage, items, placeholder, showIndicator,
    optionIdentifier,
    getOptionLabel,
    getSelectionLabel
  }

  if(dataApi) {
    selectOpts.loadOptions = async (filterText) => {
      if(!(filterText.length >= 2)) return
      console.log("filterText", filterText)
      let res = await dataApi.picklistSearch(filterText)
      return res.data
    }
  }

</script>

<Select {...selectOpts} on:select/>


