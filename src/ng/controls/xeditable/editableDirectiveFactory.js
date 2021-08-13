import angular from 'angular'
import _ from 'lodash'

var app = angular.module('ag.xeditable')

app.value('validationMessages', {
  required: 'This field is required',
  number: 'This field must be a number',
  mismatch: 'Does not match the confirmation',
  minlength: 'This field is too short',
  maxlength: 'This field is too long',
  email: 'Invalid email address',
  pattern: 'Invalid pattern'
})
// Decorates all editable inputs with mechanism
// for displaying validation errors.
app.config(['$provide', $provide => $provide.decorator('editableDirectiveFactory', [
  '$delegate', 'validationMessages', function($delegate, validationMessages) {
    // collect all error messages for the given model
    const errorsFor = function(model) {
      const callback = function(result, invalid, error) {
        if (invalid) { result.push(validationMessages[error]) }
        return result
      }

      return _.reduce(model.$error, callback, []).join(', ')
    }

    return function() {
      const directive = $delegate.apply(this, arguments)
      const {
        link
      } = directive

      directive.compile = (element, attrs) => function(scope, element, attrs, ctrl) {
        link.apply(this, arguments)

        const form = ctrl[1]
        const name = attrs.eName
        const {
          disabled
        } = attrs

        // watch for model validity
        // and display errors if necessary
        if (!_.isNil(form) && !_.isNil(name)) {
          const viewValue = () => form[name]?.$viewValue
          scope.$watch(viewValue, function() {
            const model = form[name]

            if (model?.$invalid) {
              form.$setError(name, errorsFor(model))
            }

            if (model?.$valid) {
              return form.$setError(name, '')
            }
          })
        }

        // watch if input has disabled attribute
        if (!_.isNil(form) && !_.isNil(disabled)) {
          scope.disabled = disabled
        }

        const {
          options
        } = attrs
        if (!_.isNil(options)) {
          return scope.options = options
        }
      }

      return directive
    }
  }
])
])
