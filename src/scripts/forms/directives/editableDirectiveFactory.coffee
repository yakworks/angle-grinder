forms = angular.module("angleGrinder.forms")

# Decorates all editable inputs with mechanism
# for displaying validation errors.
forms.config ["$provide", ($provide) ->
  $provide.decorator "editableDirectiveFactory", [
    "$delegate", "validationMessages", ($delegate, validationMessages) ->

      # collect all error messages for the given model
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
            disabled = attrs.disabled

            # watch for model validity
            # and display errors if necessary
            if form? and name?
              viewValue = -> form[name]?.$viewValue
              scope.$watch viewValue, ->
                model = form[name]

                if model?.$invalid
                  form.$setError(name, errorsFor(model))

                if model?.$valid
                  form.$setError(name, "")

            # watch if input has disabled attribute
            if form? and disabled?
              scope.disabled = disabled

            options = attrs.options
            if options?
              scope.options = options

        return directive
  ]
]
