<!-- <script context="module">
  export const FORM = {};
</script> -->

<script>
  import {setContext} from 'svelte';
  import { createForm } from "svelte-forms-lib";
  import {key} from './key';

  export let initialValues = {};
  export let validate = null;
  export let validationSchema = null;
  export let onSubmit = () => {
    throw new Error(
      'onSubmit is a required property in <Form /> when using the fallback context',
    );
  };
  export let context = createForm({
    initialValues,
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

  setContext(key, {
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
  });

  export function getModel() {
		return {
      data: $form,
      errors: $errors
    }
	}

</script>

<form on:submit={handleSubmit} {...$$restProps} autocomplete="off" >
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
</form>
