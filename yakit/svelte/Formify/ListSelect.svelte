<script>
  // import { onMount, createEventDispatcher } from 'svelte'
  import { getContext, createEventDispatcher, onMount } from 'svelte';
  import {ctxKey} from './ctxKey'
  import { isNil, _defaults } from '@yakit/core/dash'
  import { fieldDefaults } from '@yakit/core/transformer'
  import selContext from '@yakit/ui/select/selectContext'
  import Select from 'svelte-select'
  import ListInput  from './ListInput.svelte'
  // import { classNames } from '../shared/utils';
  import ItemMulti from '../Select/ItemMulti.svelte'
  import ItemSingle from '../Select/ItemSingle.svelte'

  const dispatch = createEventDispatcher()

  /** name is the required key or object field path */
  export let name
  export let label = undefined
  export let placeholder = undefined
  // export let type = 'select'

  /**
   * the main options object for properties, anything set here will win over comp props
   * can pass through any props from here too https://github.com/rob-balfre/svelte-select
   */
  export let opts = {}
  _defaults(opts, {
    label, placeholder
  })

  fieldDefaults(name, opts)
  //if placeholder empty assign default
  _defaults(opts, { placeholder: 'Select...'})

  let className = undefined;
  export { className as class }

  const { form, updateValidateField, getValue, errors, formOpts } = getContext(ctxKey);
  if(!formOpts.showPlaceholders) opts['placeholder'] = "..."

  /** value is the selected item or items. object or key depending on isValueObject*/
  export let value = null

  /** selected item object, will be same as the value when isValueObject:true.*/
  export let selectedItem = null

  /** bound value if list is open or assign to true/false open/close */
  export let listOpen = false

  /** the itemData, will translate to items for the component and can load on demand */
  export let itemData = null

  /** will bind:this on this comp */
  export let selectEl = undefined

  /** turns on and off loading indicator*/
  export let isWaiting = false

  //assign itemData if not set in options
  _defaults(opts, { itemData })

  /** the inialized selectContext*/
  export let selectContext = selContext(opts).init()

  let ItemToUse = Array.isArray(opts.propertyLabel) ? ItemMulti : ItemSingle

  //setup defaults for component
  _defaults(opts, {
    Item: ItemToUse,
    listOffset: 2,
    labelIdentifier: opts.propertyLabel, //for selectComp
    optionIdentifier: opts.propertyKey, //for selectComp
    noOptionsMessage: 'start typing to search ....',
    placeholder,
    showIndicator: true
  })


  $: if (opts.keepOpen) {
    keepListOpen(listOpen) // we dont use the listOpen in method but this registers it with svelete to react
  }

  function keepListOpen(_) {
    if (document.activeElement === document.getElementById(opts.id)) {
      listOpen = true
    }
  }

  // reacte to listOpen to load items if they have not been yet.
  $: (async () => {
    if(listOpen) opts.items = await selectContext.loadItemsIfNeeded(listOpen)
    isWaiting = false
  })(); //trick way to call svelte reactive for async


  //Subscribe to the form changes
  form.subscribe(async _data => {
    // console.log('form.subscribe with _data', _data)
    let _val = getValue(_data, name)

    if(isNil(_val)) {
      //skip it if both are nill, which is the case on onMount, so we dont initialize the data unnecesarily
      if(!isNil(value)) setSelectedValue(null, null)
    } else {
      await selectContext.loadItemsIfNeeded()
      //only set selectedItem, it will trigger the handleSelect to set the value
      selectedItem = selectContext.getSelectedItem(_val)
      isWaiting = false
    }
  })

  export let handleClear = (event) => {
    // console.log("handleClear", event.detail)
    // update the fieldValue, will trigger the handleSelect with null to update value
    updateValidateField(name, null)
  }

  export let handleSelect = (event) => {
    // console.log("handleSelect event.detail", event.detail)
    // selectedItem = event.detail
    let _selItem = event.detail || null
    let _val = null
    if (_selItem) {
      _val = selectContext.getSelectedValue(_selItem)
    }
    setSelectedValue(_val, _selItem)
    updateValidateField(name, value)

    // make sure input is focused so it can keep it open
    if (opts.isMulti && opts.keepOpen) document.getElementById(opts.id).focus()

    // redispatch select event
    dispatch('select', selectedItem);
  }

  export let setSelectedValue = (val, selItem) => {
    selectedItem = selItem
    value = val
  }



</script>

<ListInput label={opts.label} {name} clearButton={false} input={false} class={className}>
  <div class="select-theme f7" slot="input">
      <Select containerClasses="{className}" {...opts} value={selectedItem}
        bind:listOpen bind:isWaiting
        on:select={handleSelect} on:clear={handleClear} bind:this={selectEl}/>
  </div>
</ListInput>

<style>
  .select-theme.f7 {
    --listBorder: 0px;
    --borderRadius: 0px;
    --itemFirstBorderRadius: 0;
    --itemIsActiveBG: var(--color-primary-light);
    --listShadow: var(--f7-card-box-shadow);
    --borderFocusColor: none;
    --inputPadding: 0px;
    --border: none;
    --padding: 0px;
    --multiSelectPadding: 0px;
    --indicatorRight: 0px;
    --clearSelectRight: 0px;
    --listZIndex: 99;
    /* for now this expands the list a bit across the label */
    --listLeft: -60px;
    --listRight: -20px;
    /* match normal form fields */
    --height: 32px;
    --multiItemHeight: 28px;
    --multiClearTop: 6px;

    --multiItemActiveBG: var(--color-primary);
    --multiClearBG: var(--color-shade-35);
    --clearSelectTop: 8px;
    --indicatorTop: 8px;
  }

</style>
