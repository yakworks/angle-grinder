<script>
	import Select from 'svelte-select';
  import StoreHolder from '@ag/stores/StoreHolder';

  export let dataApiKey = undefined
  export let dataApi = undefined
  export let isMulti = true

  if(dataApiKey) dataApi = StoreHolder.dataApiFactory[dataApiKey]

	const optionIdentifier = 'id';
  const getOptionLabel = (option) => option.name;
  const getSelectionLabel = (option) => option.name;

  function handleSelect(event) {
    console.log('selected item', event.detail);
  }
  function handleMultiSelect(event) {
    console.log('handleMultiSelect', event.detail);
    // if(event.detail && event.detail.size > 0){
    //   multiVal = _.pick(event.detail, ['id', 'name'])
    // } else {
    //   multiVal = []
    // }
    // multiVal = multiVal
  }

  async function filterItems(filterText) {
    if(!(filterText.length >= 2)) return
    console.log("filterText", filterText)
    let res = await dataApi.picklistSearch(filterText)
    return res.data
  }
</script>

<Select isMulti={isMulti} noOptionsMessage="start typing to search ...."
  loadOptions={filterItems} {optionIdentifier} {getOptionLabel}
  {getSelectionLabel} on:select={handleMultiSelect}/>


