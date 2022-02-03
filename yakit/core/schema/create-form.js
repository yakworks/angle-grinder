/**
 * Moved in from https://github.com/tjinauyeung/svelte-forms-lib so we can make changes
 * and tie it in better with the f7 way of doing things as well as our dataApi stores.
 * Also makes it a general purpose "editor" and not just for using forms.
 * Can check out a row and make changes
 */

import {derived, writable, get} from 'svelte/store';
import {util} from './util';

const NO_ERROR = '';
const IS_TOUCHED = true;

function isCheckbox(element) {
  return element.getAttribute && element.getAttribute('type') === 'checkbox';
}

function isFileInput(element) {
  return element.getAttribute && element.getAttribute('type') === 'file';
}

function resolveValue(element) {
  if (isFileInput(element)) {
    return element.files;
  } else if (isCheckbox(element)) {
    return element.checked;
  } else {
    return element.value;
  }
}

export const createForm = (config) => {
  let initialValues = config.initialValues || {};

  const validationSchema = config.validationSchema;
  const validateFunction = config.validate;
  const onSubmit = config.onSubmit;

  const getInitial = {
    values: () => util.cloneDeep(initialValues),
    errors: () =>
      validationSchema
        ? util.getErrorsFromSchema(initialValues, validationSchema.fields)
        : util.assignDeep(initialValues, NO_ERROR),
    touched: () => util.assignDeep(initialValues, !IS_TOUCHED),
  };

  const form = writable(getInitial.values());
  const errors = writable(getInitial.errors());
  const touched = writable(getInitial.touched());

  const isSubmitting = writable(false);
  const isValidating = writable(false);

  const isValid = derived(errors, ($errors) => {
    const noErrors = util
      .getValues($errors)
      .every((field) => field === NO_ERROR);
    return noErrors;
  });

  const modified = derived(form, ($form) => {
    const object = util.assignDeep($form, false);

    for (let key in $form) {
      object[key] = !util.deepEqual($form[key], initialValues[key]);
    }

    return object;
  });

  const isModified = derived(modified, ($modified) => {
    return util.getValues($modified).includes(true);
  });

  function validateField(field) {
    return util
      .subscribeOnce(form)
      .then((values) => validateFieldValue(field, values[field]));
  }

  function validateFieldValue(field, value) {
    updateTouched(field, true);

    if (validationSchema) {
      isValidating.set(true);

      return validationSchema
        .validateAt(field, get(form))
        .then(() => util.update(errors, field, ''))
        .catch((error) => util.update(errors, field, error.message))
        .finally(() => {
          isValidating.set(false);
        });
    }

    if (validateFunction) {
      isValidating.set(true);
      return Promise.resolve()
        .then(() => validateFunction({[field]: value}))
        .then((errs) =>
          util.update(errors, field, !util.isNullish(errs) ? errs[field] : ''),
        )
        .finally(() => {
          isValidating.set(false);
        });
    }

    return Promise.resolve();
  }

  function updateValidateField(field, value) {
    updateField(field, value);
    return validateFieldValue(field, value);
  }

  function handleChange(event) {
    const element = event.target;
    const field = element.name || element.id;
    const value = resolveValue(element);

    return updateValidateField(field, value);
  }

  async function handleSubmit(event) {
    // console.log("calling handleSubmit")
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    isSubmitting.set(true);
    const values = get(form)

    if (typeof validateFunction === 'function') {
      isValidating.set(true)

      const error = await validateFunction(values)
      if (util.isNullish(error) || util.getValues(error).length === 0) {
        clearErrorsAndSubmit(values)
      } else {
        errors.set(error)
        isSubmitting.set(false)
      }
      isValidating.set(false)
    }
    else if (validationSchema) {
      isValidating.set(true)
      try {
        let valRes = await validationSchema.validate(values, {abortEarly: false})
        clearErrorsAndSubmit(values)
      } catch (yupErrors) {
        // console.log("has yupErrors", yupErrors.message)
        if (yupErrors && yupErrors.inner) {
          const updatedErrors = getInitial.errors();
          yupErrors.inner.map((error) =>
            util.set(updatedErrors, error.path, error.message),
          )
          errors.set(updatedErrors)
          isSubmitting.set(false)
        }
      } finally {
        isValidating.set(false)
      }
    }
    else {
      clearErrorsAndSubmit(values);
    }
  }

  function handleReset() {
    form.set(getInitial.values());
    errors.set(getInitial.errors());
    touched.set(getInitial.touched());
  }

  async function clearErrorsAndSubmit(values) {
    errors.set(getInitial.errors())
    await onSubmit(values, form, errors)
    isSubmitting.set(false)
  }

  /**
   * Handler to imperatively update the value of a form field
   */
  function updateField(field, value) {
    util.update(form, field, value);
  }

  /**
   * Handler to imperatively update the touched value of a form field
   */
  function updateTouched(field, value) {
    util.update(touched, field, value);
  }

  /**
   * Update the initial values and reset form. Used to dynamically display new form values
   */
  function updateInitialValues(newValues) {
    initialValues = newValues;

    handleReset();
  }

  return {
    form,
    errors,
    touched,
    modified,
    isValid,
    isSubmitting,
    isValidating,
    isModified,
    handleChange,
    handleSubmit,
    handleReset,
    updateField,
    updateValidateField,
    updateTouched,
    validateField,
    updateInitialValues,
    state: derived(
      [
        form,
        errors,
        touched,
        modified,
        isValid,
        isValidating,
        isSubmitting,
        isModified,
      ],
      ([
        $form,
        $errors,
        $touched,
        $modified,
        $isValid,
        $isValidating,
        $isSubmitting,
        $isModified,
      ]) => ({
        form: $form,
        errors: $errors,
        touched: $touched,
        modified: $modified,
        isValid: $isValid,
        isSubmitting: $isSubmitting,
        isValidating: $isValidating,
        isModified: $isModified,
      }),
    ),
  };
};
