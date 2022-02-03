<script>
  import { getContext } from 'svelte';
  import {ctxKey} from './ctxKey'
  import { classNames } from '../shared/utils';
  import { fieldDefaults } from '@yakit/core/transformer'
  import { _defaults } from '@yakit/core/dash'
  import { util } from '@yakit/core/schema/util'

  import {Toggle, ListItem}  from '../f7-components'

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

  //if opts has input field then replace type with that

  // $: classes = classNames(className, {
  //   'item-input-date5': opts.type === 'date',
  //   'item-input-required': opts.required,
  // })

  const {form, handleChange, getValue} = getContext(ctxKey);

  export let value = null

  $: value = getValue($form, name)

  export let checked = null

  $: checked = getValue($form, name) ? true : false


</script>

<ListItem>
  <span>{opts.label}</span>
  <Toggle {...listInputOpts}
    onChange={handleChange} onBlur={handleChange}
    {checked}
    {value}
  />
</ListItem>

<!-- <input
  {name}
  {type}
  value={$form[name]}
  on:change={handleChange}
  on:blur={handleChange}
  {...$$props}
/> -->
