/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var forms = angular.module("angleGrinder.forms")

forms.directive("agSubmit", [
  "$parse", "$log", "serverValidationErrorsHandler",
  ($parse, $log, serverValidationErrorsHandler) => ({
    restrict: "A",
    require: "form",

    compile(element, attrs) {
      const onSubmit = $parse(attrs.agSubmit)
      forms = []
      var markAsSubmitted = function(form) {
        form.$submitted = true
        // to avoid situation with too much recursion, check if the form is already processed, see below
        forms.push(form)

        // iterate through  all nested forms and mark them as submitted
        const nestedForms = _.filter(_.values(form), input => (input instanceof form.constructor) && (!Array.from(forms).includes(input)))
        return Array.from(nestedForms).map((nestedForm) => markAsSubmitted(nestedForm))
      }

      return (scope, element, attrs, formCtrl) => element.on("submit", function(event) {
        $log.debug("[forms] submitting form", formCtrl.$name, element, formCtrl)

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
          promise.finally(() => formCtrl.$saving = false)

          // on success: reset the form
          promise.then(function() {
            formCtrl.$setPristine()
            return formCtrl.$submitted = false
          })

          // on error: handle server side errors
          return promise.catch(function(response) {
            if (!angular.isFunction(resource?.resourceName)) { return }
            return serverValidationErrorsHandler(formCtrl, response, resource.resourceName())
          })
        }
      })
    }
  })
])
