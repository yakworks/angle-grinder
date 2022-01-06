<script context="module">
  export const ctxKey = {}; //kind of a goofy way to key the context. context is relevant to all child components
</script>
<script>
  import { setContext, createEventDispatcher, onMount } from 'svelte';
  import { get } from '../utils/dash';

  import stringify from 'fast-safe-stringify'
  // import set from 'lodash/set';
  // import get from 'lodash/get';
  // import { createObjectWithDefaultValue, deepCopy } from '../utils';

  //svelte-forms-lib
  import { createForm } from "svelte-forms-lib";

  // mock async request
  const makeRequest = () => new Promise(resolve => setTimeout(resolve, 1000));
  export let initData = {};
  export let validate = null;
  export let validationSchema = null;
  export let data = {};

  export let onSubmit = () => {
    throw new Error(
      'onSubmit is a required property in <Form /> when using the fallback context',
    );
  };
  export let context = createForm({
    initialValues: initData,
    onSubmit,
    validate,
    validationSchema,
  });

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

  export function getValue(path){
    return get(data, path)
  }

  setContext(ctxKey, {
    form,
    data: form,
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
    getValue
  });

  $: data = $form

  import { colorClasses } from '../shared/mixins';
  import { classNames, extend, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { useTab } from '../shared/use-tab';
  import { setReactiveContext } from '../shared/set-reactive-context';

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
    'list',
    {
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

  // function onSubmit(event) {
  //   emit('submit', [event]);
  // }

  useTab(() => form, emit);

</script>

<!-- svelte-ignore a11y-missing-attribute -->
<form bind:this={formEl} class={classes} on:submit={handleSubmit} {...restProps($$restProps)} >
  <slot name="before-list" />
  {#if hasUlSlots && ul}
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
