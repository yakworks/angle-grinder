import angular from 'angular'
import formsModule from '../formsModule'
import _ from 'lodash'
import { isFalsy, isEmpty } from '../../utils/isFalsy'

var forms = angular.module(formsModule)

forms.value("validationMessages", {
  required: "This field is required",
  number: "This field must be a number",
  mismatch: "Does not match the confirmation",
  minlength: "This field is too short",
  maxlength: "This field is too long",
  email: "Invalid email address",
  pattern: "Invalid pattern"
}
)

// Custom validation directive for fields match.
// Might be used for password confirmation validation.
forms.directive("match", () => ({
  require: "ngModel",

  link(scope, elem, attrs, modelCtrl) {
    const validateEqual = function(value, otherValue) {
      const allEmpty = _.every([isEmpty(value), isEmpty(otherValue)])
      const valid = allEmpty || (value === otherValue)

      modelCtrl.$setValidity("mismatch", valid)
      return value
    }

    // watch the other value and re-validate on change
    scope.$watch(attrs.match, otherValue => validateEqual(modelCtrl.$viewValue, otherValue))

    const validator = function(value) {
      const otherValue = scope.$eval(attrs.match)
      return validateEqual(value, otherValue)
    }

    // validate DOM -> model
    modelCtrl.$parsers.unshift(validator)

    // validate model -> DOM
    return modelCtrl.$formatters.unshift(validator)
  }
}))

forms.directive("agLength",
  ["$parse", ($parse) => ({
    require: "ngModel",
    restrict: "A",

    link(scope, elem, attrs, ngModelCtrl) {

      const lengthValidator = function(value) {
        let valid
        const length = $parse(attrs.agLength)(scope)

        //If length is not provided, or value is not entered, its valid
        //This validator does not check for required values, so if value must be entered, add ng-required

        if (isFalsy(length) || ngModelCtrl.$isEmpty(value)) { valid = true
        } else { valid = (value.length === length) }

        ngModelCtrl.$setValidity("length", valid)

        if (valid) { return value } else { return undefined }
      }

      ngModelCtrl.$parsers.unshift(lengthValidator)
      ngModelCtrl.$formatters.push(lengthValidator)

      return scope.$watch(attrs.agLength, () => lengthValidator(ngModelCtrl.$viewValue))
    }
  })]
)

forms.directive("agFieldGroup", [
  "$timeout", "$log", "$interpolate",
  ($timeout, $log, $interpolate) => ({
    restrict: "A",
    require: "^form",
    replace: true,
    transclude: true,

    template: `\
<div class="form-group" ng-transclude></div>\
`,

    link(scope, element, attrs, formCtrl) {
      const fields = _.map((attrs["for"] || "").split(","), fieldExpr => $interpolate(fieldExpr)(scope))

      const toggleErrors = () => $timeout(function() {
        // true if the field is invalid or it has server side errors
        const invalid = _.map(fields, field => formCtrl[field]?.$invalid || formCtrl.$serverErrors?.[field])

        if (_.some(invalid)) {
          return element.addClass("has-error")
        } else {
          return element.removeClass("has-error")
        }
      })

      // Watch for validity state change and display errors if necessary
      angular.forEach(fields, function(field) {
        const getViewValue = () => formCtrl[field]?.$viewValue
        return scope.$watch(getViewValue, function() {
          if (!formCtrl[field]?.$dirty) { return }
          return toggleErrors()
        })
      })

      // Display server side validation errors (only once)
      angular.forEach(fields, function(field) {
        let initial = true
        const getServerErrors = () => formCtrl.$serverErrors?.[field]
        return scope.$watch(getServerErrors, function() {
          if (!initial) { toggleErrors() }
          return initial = false
        })
      })

      // Display validation errors when the form is submitted
      const isSubmitted = () => formCtrl.$submitted
      return scope.$watch(isSubmitted, function(submitted) {
        if (!submitted) { return }
        return toggleErrors()
      })
    }
  })
])

forms.directive("agValidationErrors",
  ["validationMessages", "$interpolate", (validationMessages, $interpolate) => ({
    restrict: "E",
    require: "^form",
    replace: true,

    link(scope, element, attrs, formCtrl) {
      const fieldName = $interpolate(attrs["for"])(scope)
      const field = formCtrl[fieldName]

      // Do cleanup
      const clearErrors = () => element.html("")

      // Try to take an errors message from the attribute
      // otherwise fallback to the default error message
      const messageFor = error => attrs[error] || validationMessages[error]

      const appendError = function(message, klass) {
        if (klass == null) { klass = "" }
        return element.append(`\
  <span class="help-inline ${klass}">${message}</span>\
  `
        )
      }

      const displayErrorMessages = function() {
        clearErrors()

        // Display client side errors
        return (() => {
          const result = []
          for (let error in field.$error) {
            const invalid = field.$error[error]
            if (!invalid) { continue }

            const message = messageFor(error)
            if (!_.isNil(message)) { result.push(appendError(message)) } else {
              result.push(undefined)
            }
          }
          return result
        })()
      }

      // Clear validation errors when the field is valid
      let initial = true
      const isValid = () => formCtrl[fieldName]?.$valid
      scope.$watch(isValid, function() {
        if (!initial) { displayErrorMessages() }
        return initial = false
      })

      // Display validation errors while typing
      const getViewValue = () => formCtrl[fieldName]?.$viewValue
      scope.$watch(getViewValue, function() {
        if (field.$dirty) { return displayErrorMessages() }
      })

      // Display validation errors when the form is submitted
      const isSubmitted = () => formCtrl.$submitted
      scope.$watch(isSubmitted, function(submitted) {
        if (submitted) { return displayErrorMessages() }
      })

      // Display server side errors
      const getServerErrors = () => formCtrl.$serverErrors?.[fieldName]
      return scope.$watch(getServerErrors, function(serverError) {
        if (!_.isNil(serverError)) {
          return appendError(serverError, "server-error")
        } else {
          return element.find(".server-error").remove()
        }
      })
    }
  })]
)

forms.directive("agServerValidationErrors", ["alerts", alerts => ({
  restrict: "A",
  require: "^form",

  link(scope, element, attrs, formCtrl) {
    formCtrl.$serverErrors = {}

    //Display errors as alerts for those fields which are not in form
    const displayGlobalErrors = () => (() => {
      const result = []
      for (let field in formCtrl.$serverErrors) {
        const message = formCtrl.$serverErrors[field]
        if (formCtrl[field]) { continue } //If field is present in form, continue

        formCtrl.$serverErrors[field] = null //Display error and remove it.
        result.push(alerts.error(message))
      }
      return result
    })()


    // Hide server side validation errors while typing
    const getServerErrors = () => formCtrl.$serverErrors

    return scope.$watch(getServerErrors, function(serverErrors) {
      displayGlobalErrors()
      // Iterate through all fields with server validation errors
      return angular.forEach(serverErrors, function(_, field) {

        // Register change listener for those fields
        let unregister
        const getViewValue = () => formCtrl[field]?.$viewValue
        return unregister = scope.$watch(getViewValue, function(oldVal, newVal) {
          if (oldVal === newVal) { return }

          // Remove server side error for the field when its value was changed
          formCtrl[field]?.$setValidity("server", true)
          formCtrl.$serverErrors[field] = null
          return unregister()
        })
      })
    })
  }
})])

// Handles server side errors
forms.factory("serverValidationErrorsHandler", [
  "$log", function($log) {

    var setErrors = function(form, errors) {
      // cleanup previous errors
      form.$serverErrors = {}

      // iterate through all server side validation errors
      return (() => {
        const result = []
        for (let field in errors) {

        // ..set errors on the nested form
          const message = errors[field]
          if ((typeof message === "object") && !_.isNil(form[field])) {
            setErrors(form[field], message)
          }

          // ..set an error for the current form
          if (typeof message === "string") {
            form[field]?.$setValidity("server", false)
            result.push(form.$serverErrors[field] = message)
          } else {
            result.push(undefined)
          }
        }
        return result
      })()
    }

    return function(form, response, resourceName) {
      // skip when the response does not contain validation errors
      const errors = response.data?.errors?.[resourceName]
      if ((response.status !== 422) || _.isNil(errors)) {
        $log.warn("Response does not contain validation errors", response)
        return
      }

      // recursively set errors on the form
      return setErrors(form, errors)
    }
  }
])

//Automatically add asterisk to required fields.
const requiredDirective = [() => ({
  restrict: "A",
  scope: false,

  link(scope, element) {
    //console.log element.closest("label")
    return element.closest(".form-group").find(".control-label").addClass("required")
  }
})
]

forms.directive("required", requiredDirective)
forms.directive("ngRequired", requiredDirective)
