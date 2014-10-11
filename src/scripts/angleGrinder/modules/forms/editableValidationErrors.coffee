forms = angular.module("angleGrinder.forms")

# TODO spec it
# displays validation messages for editable inputs
forms.directive "editableValidationErrors", [
  "validationMessages", (validationMessages) ->
    restrict: "A"
    require: ["^form", "ngModel"]

    link: (scope, element, attrs, ctrl) ->
      form = ctrl[0]
      model = ctrl[1]

      value = -> model.$viewValue
      scope.$watch value, ->
        # set errors
        if model.$invalid

          # collect error messages
          callback = (result, invalid, error) ->
            result.push validationMessages[error] if invalid
            return result

          messages = _.reduce(model.$error, callback, [])
          form.$setError(attrs.name, messages.join(", "))

          # clear errors
        else
          form.$setError(attrs.name, "")
]
