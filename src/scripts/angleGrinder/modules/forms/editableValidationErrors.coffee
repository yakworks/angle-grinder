forms = angular.module("angleGrinder.forms")

# TODO spec it
# Decorates all editable inputs with mechanism for displaying validation errors
forms.config ["$provide", ($provide) ->
  $provide.decorator "editableDirectiveFactory", [
    "$delegate", "validationMessages", ($delegate, validationMessages) ->

      # collect error messages for the given model
      errorsFor = (model) ->
        callback = (result, invalid, error) ->
          result.push validationMessages[error] if invalid
          return result

        return _.reduce(model.$error, callback, []).join(", ")

      return ->
        directive = $delegate.apply(this, arguments)
        link = directive.link

        directive.compile = (element, attrs) ->
          return (scope, element, attrs, ctrl) ->
            link.apply(this, arguments)

            form = ctrl[1]
            name = attrs.eName

            # watch for model validity
            # and display validation errors if necessary
            if form? and name?
              viewValue = -> form[name]?.$viewValue
              scope.$watch viewValue, ->
                model = form[name]
                return unless model?

                if model.$invalid
                  form.$setError(name, errorsFor(model))

                if model.$valid
                  form.$setError(name, "")

        return directive
  ]
]
