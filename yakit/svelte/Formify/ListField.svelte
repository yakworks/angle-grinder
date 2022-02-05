<script>
  import { getContext } from 'svelte';
  import {ctxKey} from './ctxKey'
  import { classNames } from '../shared/utils';
  import { fieldDefaults } from '@yakit/core/transformer'
  import { _defaults, get } from '@yakit/core/dash'
  import { util } from '@yakit/core/schema/util'

  import ListInput  from './ListInput.svelte'

  let className = undefined;
  export { className as class }

  /**
   * name is the required key or object field path
   */
  export let name
  export let type = 'text'
  export let opts = {}

  _defaults(opts,{
    type,
    label: undefined,
    placeholder: undefined,
    clearButton :true,
    validate: false,
    validateOnBlur: false,
    errorMessageForce: true
  })

  fieldDefaults(name, opts)

  //if opts has input field then replace type with that
  type = opts.input ? opts.input : opts.type

  //remove fields for the listInputOpts
  let { description, format, key, input, multipleOf,
    minimum, maximum, readOnly, maxLength, minLength, validation,
    ...listInputOpts} = opts

  if(type === 'integer') {
    type = 'number'
    multipleOf = 1
  }

  if(type === 'date-time') {
    type = 'datetime-local'
  }

  _defaults(listInputOpts,{
    min: minimum,
    max: maximum,
    step: multipleOf,
    //maxLength and minLength to lower case props
    maxlength: maxLength, minlength: minLength,
  })


  $: classes = classNames(className, {
    'item-input-date5': type === 'date' || type === 'datetime-local',
    'item-input-required': opts.required,
  })

  let isChanged = false

  const formContext = getContext(ctxKey);
  const {form, updateValidateField, getValue, formOpts} = formContext;

  if(!formOpts.showPlaceholders) listInputOpts['placeholder'] = ""

  export let value = null

  $: value = getValue($form, name)

  function handleChange(event) {
    const element = event.target;
    const field = element.name || element.id;
    // if(value === '') value = null
    // return updateValidateField(field, value);
    if(isChanged === true){
      value = element.value;
      if(value === '') value = null
      return updateValidateField(field, value);
    }
  }

  function onBlur(evt) {
    // console.log("onBlur evt", evt)
    // console.log("onBlur value", value)
    handleChange(evt)
  }

  function onChange(evt) {
    isChanged = true
  }

</script>
<!-- <ListInput {...$$props} -->

<ListInput {...listInputOpts} {type} class={classes}
  {onChange} {onBlur} bind:value />

<!-- <input
  {name}
  {type}
  value={$form[name]}
  on:change={handleChange}
  on:blur={handleChange}
  {...$$props}
/> -->
