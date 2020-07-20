import _ from 'lodash'
import Log from '../../../utils/Log'

// function reference so this can be recursive
function setServerErrors(form, errors) {
  // cleanup previous errors
  form.$serverErrors = {}
  console.log('form', form)
  console.log('errors', errors)
  // iterate through all server side validation errors
  const result = []
  for (const field in errors) {
    // ..set errors on the nested form
    const message = errors[field]
    const formField = form[field]
    if ((typeof message === 'object') && !_.isNil(formField)) {
      setServerErrors(formField, message)
    }

    // ..set an error for the current form
    if (typeof message === 'string') {
      if (formField) formField.$setValidity('$$server', false)
      form.$serverErrors[field] = message
      result.push(message)
    } else {
      // FIXME why would we push undefined here?
      result.push(undefined)
    }
  }
  console.log('result', result)
  console.log('form.$serverErrors', form.$serverErrors)
  return result
}

export async function setErrors(form, response, resourceName) {
  // let errors = response?.data?.errors
  const json = await response.json()
  let errors = json.errors
  if (_.isNil(errors) || _.isNil(response) || response.status !== 422) {
    Log.warn('Response does not contain validation errors', response)
    return
  }
  if (resourceName) errors = errors[resourceName]

  // recursively set errors on the form
  return setServerErrors(form, errors)
}
