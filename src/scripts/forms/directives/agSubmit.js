import angular from 'angular'
import formsModule from '../formsModule'
import _ from 'lodash'

var forms = angular.module(formsModule)

forms.directive('agSubmit', [
  '$parse', '$log', 'serverValidationErrorsHandler',
  ($parse, $log, serverValidationErrorsHandler) => ({
    restrict: 'A',
    require: 'form',

    compile(element, attrs) {
      const onSubmit = $parse(attrs.agSubmit)
      forms = []
      var markAsSubmitted = function(form) {
        form.$submitted = true
        // to avoid situation with too much recursion, check if the form is already processed, see below
        forms.push(form)

        // iterate through  all nested forms and mark them as submitted
        const nestedForms = _.filter(_.values(form), input => (__guard__(__guard__(input != null ? input.$$element : undefined, x1 => x1[0]), x => x.tagName) === 'FORM') && (!Array.from(forms).includes(input)))
        return Array.from(nestedForms).map((nestedForm) => markAsSubmitted(nestedForm))
      }

      return (scope, element, attrs, formCtrl) => element.on('submit', function(event) {
        $log.debug('[forms] submitting form', formCtrl.$name, element, formCtrl)

        // mark the form as submitted
        scope.$apply(() => markAsSubmitted(formCtrl))

        // do nothing when the form is invalid
        if (formCtrl.$invalid) { return }

        // submit the form and handle a promise along with resource
        const result = _.flatten([onSubmit(scope, { $event: event })])
        const [promise, resource] = Array.from(result)

        // TODO use `$q.when`
        if (promise && angular.isObject(promise)) {
          // disable/enable form controls
          formCtrl.$saving = true
          const finallyProm = promise.finally(() => formCtrl.$saving = false)

          finallyProm.then(angular.noop, angular.noop)

          // on success: reset the form
          promise.then(
            function() {
              formCtrl.$setPristine()
              return formCtrl.$submitted = false
            }
            ,
            () => false)

          // on error: handle server side errors
          return promise.catch(function(response) {
            if (!angular.isFunction(resource != null ? resource.resourceName : undefined)) { return }
            return serverValidationErrorsHandler(formCtrl, response, resource.resourceName())
          })
        }
      })
    }
  })
])

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined
}
