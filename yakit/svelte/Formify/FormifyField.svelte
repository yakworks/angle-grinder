<!--
  Dynamic Input that switches based on the config that is passed in
 -->
<script>
  import ListField from './ListField.svelte';
  import ListSelect from './ListSelect.svelte';
  import ListRangeFields from './ListRangeFields.svelte';
  import ListChipInput from './ListChipInput.svelte';
  import ListToggle from './ListToggle.svelte';

  import { _defaults } from '@yakit/core/dash'
  export let opts = {}

  export let name = opts.key

  export let selectOptions = {}

  if(opts.selectOptions){
    //legacy
    let {multiple, minimumInputLength} = opts.selectOptions
    let {data, dataApi, isMulti, isValueObject, minSearchChars} = opts.selectOptions

    _defaults(selectOptions,opts.selectOptions)

    if(data) selectOptions.itemData = data
    if(multiple) selectOptions.isMulti = true

    if(minimumInputLength || minSearchChars) {
      selectOptions.isEagerLoad = false
    }
    //merge in label
    selectOptions.label = opts.label
  }

  //either type or input
  let {input} = opts

</script>


{#if input === 'toggle'}
  <ListToggle {name} {opts}/>
{:else if input === 'chips'}
  <ListChipInput {name} {opts}/>
{:else if input === 'wildcard'}
  <ListField {name} {opts} />
{:else if input === 'date-range'}
  <ListRangeFields {name} {opts} type="date"/>
{:else if input === 'amount-range'}
  <ListRangeFields {name} {opts} type="number"/>
{:else if input === 'select'}
  <ListSelect {name} opts={selectOptions} />
{:else}
  <ListField {name} {opts}/>
{/if}
