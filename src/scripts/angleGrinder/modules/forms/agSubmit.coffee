forms = angular.module("angleGrinder.forms")

forms.directive "agSubmit", [
  "$parse", "$log", "serverValidationErrorsHandler",
 ($parse, $log, serverValidationErrorsHandler) ->
    restrict: "A"
    require: "form"

    compile: (element, attrs) ->
      onSubmit = $parse(attrs.agSubmit)

      markAsSubmitted = (form) ->
        form.$submitted = true

        # iterate through  all nested forms and mark them as submitted
        nestedForms = _.filter(_.values(form), (input) -> input instanceof form.constructor)
        markAsSubmitted(nestedForm) for nestedForm in nestedForms

      (scope, element, attrs, formCtrl) ->
        element.on "submit", (event) ->
          $log.debug "[forms] submitting form", formCtrl.$name, element, formCtrl

          # mark the form as submitted
          scope.$apply -> markAsSubmitted(formCtrl)

          # do nothing when the form is invalid
          return if formCtrl.$invalid

          # submit the form and handle a promise along with resource
          result = _.flatten([onSubmit(scope, { $event: event })])
          [promise, resource] = result

          # TODO use `$q.when`
          if promise and angular.isObject(promise)

            # disable/enable form controls
            formCtrl.$saving = true
            promise.finally ->
              formCtrl.$saving = false

            # on success: reset the form
            promise.then ->
              formCtrl.$setPristine()
              formCtrl.$submitted = false

            # on error: handle server side errors
            promise.catch (response) ->
              return unless angular.isFunction(resource?.resourceName)
              serverValidationErrorsHandler(formCtrl, response, resource.resourceName())
]
