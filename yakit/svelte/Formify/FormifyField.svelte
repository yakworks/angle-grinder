<!--
  Dynamic Input that switches based on the config that is passed in
 -->
<script>
  import { ListForm, ListField, ListSelect, ListRangeFields, ListChipInput } from '@yakit/svelte/Formify';
  import { isNil, _defaults } from '@yakit/core/dash'
  export let opts = {}

  export let name = opts.key

  export let itemData = []
  export let selectOptions = {}

  if(opts.selectOptions){
    //legacy
    let {multiple, minimumInputLength} = opts.selectOptions
    let {data, dataApi, isMulti, isValueObject, minSearchChars} = opts.selectOptions

    _defaults(selectOptions,opts.selectOptions)

    // _defaults(selectOptions,{
    //   itemData: data,
    //   isMulti: isMulti || multiple,
    //   isValueObject: isValueObject || useDataObject,
    //   minSearchChars: minSearchChars || minimumInputLength,
    //   dataApi
    // })
    if(data) selectOptions.itemData = data
    if(multiple) selectOptions.isMulti = true
    console.log(`${name} multiple`, multiple)

    if(minimumInputLength || minSearchChars) {
      selectOptions.isEagerLoad = false
    }
    console.log(`${name} selectOptions`, selectOptions)
  }

  let {type} = opts
</script>


{#if type === 'input'}
  <ListField {name} />
{:else if type === 'input-list'}
  <ListChipInput {name} />
{:else if type === 'input-wildcard'}
  <ListField {name}  />
{:else if type === 'date-range'}
  <ListRangeFields {name} type="date"/>
{:else if type === 'amount-range'}
  <ListRangeFields {name} type="number"/>
{:else if type === 'select'}
  <ListSelect {name} opts={selectOptions} />
{:else}
  <ListField {name} />
{/if}
