<script>
  import Select from 'svelte-select';
  import { SelectRest } from '@yakit/svelte/index';
  import dataApiFactory from '../../store/dataApiFactory';
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

  async function getCustomers(filterText) {
    if(!(filterText.length >= 2)) return
    console.log("filterText", filterText)
    let res = await custApi.picklistSearch(filterText)
    return res.data
  }
</script>

<h2>Rest single</h2>
<Select bind:value={basicVal} loadOptions={getCustomers} {optionIdentifier} {getOptionLabel} {getSelectionLabel} on:select={handleSelect}></Select>
<p>
  Selected item: {JSON.stringify(basicVal)}
</p>

<h2>Multi basic</h2>
<Select isMulti={true} value={multiVal} noOptionsMessage="start typing to search ...."
  loadOptions={getCustomers} {optionIdentifier} {getOptionLabel} {getSelectionLabel} on:select={handleMultiSelect}></Select>

<SelectRest dataApi={custApi}/>

<p>
  Selected item: {JSON.stringify(multiVal)}
</p>

<pre class="mt-4">model: {stringify(model, null, 2)}</pre>

