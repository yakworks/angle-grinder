import angular from 'angular'
import _ from 'lodash'
import $log from '../../utils/Log'
import agValMod from './agValidations.module'

export default class ServerErrorsService {
  // constructor(alertTimeout) {
  // }

  // function reference so this can be recursive
  setErrorsFn = function(form, errors) {
    // cleanup previous errors
    form.$serverErrors = {}

    // iterate through all server side validation errors
    return (() => {
      const result = []
      for (const field in errors) {
        // ..set errors on the nested form
        const message = errors[field]
        const formField = form[field]
        if ((typeof message === 'object') && !_.isNil(formField)) {
          setErrorsFn(formField, message)
        }

        // ..set an error for the current form
        if (typeof message === 'string') {
          if (formField) formField.$setValidity('$$server', false)
          form.$serverErrors[field] = message
          result.push(message)
        } else {
          //FIXME why would we push undefined here?
          result.push(undefined)
        }
      }
      return result
    })() //FIXME why are we doing this?
  }

  setErrors(form, response, resourceName) {
    let errors = response?.data?.errors
    if (resourceName) errors = errors[resourceName]

    if (_.isNil(errors) || _.isNil(response) || response.status !== 422) {
      $log.warn('Response does not contain validation errors', response)
      return
    }
    // recursively set errors on the form
    return this.setErrorsFn(form, errors)
  }
}
//ServerErrorsService.$inject = ['alertTimeout']

// Handles server side errors
angular.module(agValMod).service('serverErrorsService', ServerErrorsService)
