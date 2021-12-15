<script>
	import Select from 'svelte-select';
  import dataApiFactory from '../../store/RestApiFactory';
  import stringify from 'fast-safe-stringify'

  const custApi = dataApiFactory.customer

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

  let basicVal;
  $: multiVal = [{"id":2, name: 'Yodo'}];

  let model = {}

  // $: {
  //   model.multiVal = multiVal
  //   model.basicVal = basicVal
  // }

  async function getCountries(filterText) {
    console.log("filterText", filterText)
    let res = await custApi.picklist(filterText)
    return res.data
  }
</script>

<h2>Rest single</h2>
<Select bind:value={basicVal} loadOptions={getCountries} {optionIdentifier} {getOptionLabel} {getSelectionLabel} on:select={handleSelect}></Select>
<p>
	Selected item: {JSON.stringify(basicVal)}
</p>

<h2>Multi basic</h2>
<Select isMulti={true} value={multiVal} noOptionsMessage="start typing to search ...."
  loadOptions={getCountries} {optionIdentifier} {getOptionLabel} {getSelectionLabel} on:select={handleMultiSelect}></Select>
<p>
	Selected item: {JSON.stringify(multiVal)}
</p>

<pre class="mt-4">model: {stringify(model, null, 2)}</pre>

