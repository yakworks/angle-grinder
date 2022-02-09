<script>
  import { setContext, createEventDispatcher, onMount } from 'svelte';
  import { get } from '@yakit/core/dash';
  import { isEmpty } from '@yakit/core/is';
  //svelte-forms-lib
  import { createForm } from "@yakit/core/schema/create-form";
  import stringify from 'fast-safe-stringify'
  import { _defaults } from '@yakit/core/dash'
  import { buildYupValidation } from '@yakit/core/schema/schemaToYup'
  import {ctxKey} from './ctxKey'
  import { colorClasses } from '../shared/mixins';
  import { classNames, extend, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { useTab } from '../shared/use-tab';
  import { setReactiveContext } from '../shared/set-reactive-context';

  /**
   * The form data. Can be bound but not updated.
   */
  export let data = {};
  export let schema = undefined;

  export let opts = {};

  export let defaultOpts = {
    initData: {},
    validate: null,
    validationSchema: null,
    onSubmit(vals){
      console.error("Default onSubmit is not implemented", vals)
      // throw new Error('onSubmit is a required property in <Form /> when using the fallback context')
    },
    //should form have list class and ul, set to false when using this as just a form and not a list wrapper too
    formOnly: false,
    showPlaceholders: false
  }

  _defaults(opts, defaultOpts)

  //the form-lib wants this but we use initData
  if(!isEmpty(opts.initData)) opts.initialValues = opts.initData

  //the validationSchema will probably not be there so make it from the schema
  if(opts.validate !== false && !opts.validationSchema && schema){
    opts.validationSchema = buildYupValidation(schema)
  }

  // @ts-ignore
  export let context = createForm(opts)

  //allows to bind to it from outside
  export const formContext = context

  const {
    form,
    errors,
    touched,
    state,
    handleChange,
    handleSubmit,
    updateField,
    updateInitialValues,
    updateTouched,
    updateValidateField,
    validateField,
  } = context;

  /** The function used to get value form object */
  export function getValue(obj, path){
    let val = get(obj, path)
    return val === undefined ? null : val
  }

  //add some of the options we might use in fields
  let {showPlaceholders} = opts
  setContext(ctxKey, {
    ...formContext,
    formOpts: {showPlaceholders}
  });

  $: data = $form

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined
  export { className as class }

  export let ul = true
  export let inset = false
  export let xsmallInset = false
  export let smallInset = false
  export let mediumInset = false
  export let largeInset = false
  export let xlargeInset = false
  export let mediaList = false
  export let accordionList = false
  export let accordionOpposite = false
  export let contactsList = false
  export let simpleList = false
  export let linksList = false
  export let menuList = false

  export let noHairlines = false
  export let noHairlinesBetween = false
  export let noHairlinesMd = false
  export let noHairlinesBetweenMd = false
  export let noHairlinesIos = false
  export let noHairlinesBetweenIos = false
  export let noHairlinesAurora = false
  export let noHairlinesBetweenAurora = false

  // Links Chevron (Arrow) Icon
  export let noChevron = false
  export let chevronCenter = false

  // Tab
  export let tab = false
  export let tabActive = false

  // Form
  export let inlineLabels = true
  export let formEl = undefined

  // eslint-disable-next-line
  $: hasUlSlots = $$slots.default // || $$slots.list;

  $: classes = classNames(
    className,
    {
      'list': !opts.formOnly,
      inset,
      'xsmall-inset': xsmallInset,
      'small-inset': smallInset,
      'medium-inset': mediumInset,
      'large-inset': largeInset,
      'xlarge-inset': xlargeInset,
      'media-list': mediaList,
      'simple-list': simpleList,
      'links-list': linksList,
      'menu-list': menuList,
      'accordion-list': accordionList,
      'accordion-opposite': accordionOpposite,
      'contacts-list': contactsList,
      tab,
      'tab-active': tabActive,
      'no-hairlines': noHairlines,
      'no-hairlines-md': noHairlinesMd,
      'no-hairlines-ios': noHairlinesIos,
      'no-hairlines-aurora': noHairlinesAurora,
      'no-hairlines-between': noHairlinesBetween,
      'no-hairlines-between-md': noHairlinesBetweenMd,
      'no-hairlines-between-ios': noHairlinesBetweenIos,
      'no-hairlines-between-aurora': noHairlinesBetweenAurora,
      'inline-labels': inlineLabels,
      'no-chevron': noChevron,
      'chevron-center': chevronCenter,
    },
    colorClasses($$props),
  );

  setReactiveContext('ListContext', () => ({
    listIsMedia: mediaList,
    listIsSimple: simpleList,
  }));

  function handleSubmitIfValid(event) {
    // let isValid = formEl.checkValidity()
    // if(isValid){
    //   handleSubmit(event)
    // }
    console.log("handleSubmitIfValid")
    handleSubmit(event)
  }

  useTab(() => form, emit);

</script>

<!-- svelte-ignore a11y-missing-attribute -->
<form bind:this={formEl} class={classes} on:submit={handleSubmitIfValid} {...restProps($$restProps)} >
  <slot name="before-list" />
  {#if hasUlSlots && ul && !opts.formOnly}
    <ul>
      <slot
        {form}
        {errors}
        {touched}
        {state}
        {handleChange}
        {handleSubmit}
        {updateField}
        {updateInitialValues}
        {updateTouched}
        {updateValidateField}
        {validateField}
      />
    </ul>
  {:else}
    <slot
      {form}
      {errors}
      {touched}
      {state}
      {handleChange}
      {handleSubmit}
      {updateField}
      {updateInitialValues}
      {updateTouched}
      {updateValidateField}
      {validateField}
    />
  {/if}
  <slot name="after-list" />
</form>

