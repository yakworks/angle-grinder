forms = angular.module("angleGrinder.forms")

forms.value "validationMessages",
  required: "This field is required"
  mismatch: "Does not match the confirmation"
  minlength: "This field is too short"
  maxlength: "This field is too long"
  email: "Invalid email address"
  pattern: "Invalid pattern"

# Custom validation directive for fields match.
# Might be used for password confirmation validation.
forms.directive "match", ["isEmpty", (isEmpty) ->
  require: "ngModel"
  link: (scope, elem, attrs, modelCtrl) ->
    validateEqual = (value, otherValue) ->
      allEmpty = _.all [isEmpty(value), isEmpty(otherValue)]
      valid = allEmpty or value is otherValue

      modelCtrl.$setValidity "mismatch", valid
      return value

    # watch the other value and re-validate on change
    scope.$watch attrs.match, (otherValue) ->
      validateEqual(modelCtrl.$viewValue, otherValue)

    validator = (value) ->
      otherValue = scope.$eval(attrs.match)
      validateEqual(value, otherValue)

    # validate DOM -> model
    modelCtrl.$parsers.unshift validator

    # validate model -> DOM
    modelCtrl.$formatters.unshift validator
]

forms.directive "agFieldGroup", [
  "$timeout", "$log",
  ($timeout, $log) ->
    restrict: "A"
    require: "^form"
    replace: true
    transclude: true
    template: """
      <div class="control-group" ng-transclude></div>
    """

    link: (scope, element, attrs, formCtrl) ->
      fields = (attrs["for"] or "").split(",")

      toggleErrors = ->
        $timeout ->
          # true if the field is invalid or it has server side errors
          invalid = _.map fields, (field) -> formCtrl[field]?.$invalid or formCtrl.$serverErrors?[field]

          if _.any(invalid)
            element.addClass("error")
          else
            element.removeClass("error")

      # Watch for validity state change and display errors if necessary
      angular.forEach fields, (field) ->
        getViewValue = -> formCtrl[field]?.$viewValue
        scope.$watch getViewValue, ->
          return unless formCtrl[field]?.$dirty
          toggleErrors()

      # Display server side validation errors (only once)
      angular.forEach fields, (field) ->
        initial = true
        getServerErrors = -> formCtrl.$serverErrors?[field]
        scope.$watch getServerErrors, ->
          toggleErrors() unless initial
          initial = false

      # Display validation errors when the form is submitted
      isSubmitted = -> formCtrl.$submitted
      scope.$watch isSubmitted, (submitted) ->
        return unless submitted
        toggleErrors()
]

forms.directive "agValidationErrors", [
  "validationMessages", (validationMessages) ->
    restrict: "E"
    require: "^form"
    replace: true

    link: (scope, element, attrs, formCtrl) ->
      fieldName = attrs["for"]
      field = formCtrl[fieldName]

      # Do cleanup
      clearErrors = -> element.html("")

      # Try to take an errors message from the attribute
      # otherwise fallback to the default error message
      messageFor = (error) ->
        attrs[error] or validationMessages[error]

      appendError = (message, klass = "") ->
        element.append """
          <span class="help-inline #{klass}">#{message}</span>
        """

      displayErrorMessages = ->
        clearErrors()

        # Display client side errors
        for error, invalid of field.$error
          continue unless invalid

          message = messageFor error
          appendError(message) if message?

      # Clear validation errors when the field is valid
      initial = true
      isValid = -> formCtrl[fieldName]?.$valid
      scope.$watch isValid, ->
        displayErrorMessages() unless initial
        initial = false

      # Display validation errors while typing
      getViewValue = -> formCtrl[fieldName]?.$viewValue
      scope.$watch getViewValue, ->
        displayErrorMessages() if field.$dirty

      # Display validation errors when the form is submitted
      isSubmitted = -> formCtrl.$submitted
      scope.$watch isSubmitted, (submitted) ->
        displayErrorMessages() if submitted

      # Display server side errors
      getServerErrors = -> formCtrl.$serverErrors?[fieldName]
      scope.$watch getServerErrors, (serverError) ->
        if serverError?
          appendError serverError, "server-error"
        else
          element.find(".server-error").remove()
]

forms.directive "agServerValidationErrors", ->
  restrict: "A"
  require: "^form"

  link: (scope, element, attrs, formCtrl) ->
    formCtrl.$serverErrors = {}

    # Hide server side validation errors while typing
    getServerErrors = -> formCtrl.$serverErrors
    scope.$watch getServerErrors, (serverErrors) ->

      # Iterate through all fields with server validation errors
      angular.forEach serverErrors, (_, field) ->

        # Register change listener for those fields
        getViewValue = -> formCtrl[field]?.$viewValue
        unregister = scope.$watch getViewValue, (oldVal, newVal) ->
          return if oldVal is newVal

          # Remove server side error for the field when its value was changed
          formCtrl[field]?.$setValidity("server", true)
          formCtrl.$serverErrors[field] = null
          unregister()

# Handles server side errors
forms.factory "serverValidationErrorsHandler", [
  "$log", ($log) ->

    setErrors = (form, errors) ->
      # cleanup previous errors
      form.$serverErrors = {}

      # iterate through all server side validation errors
      for field, message of errors

        # ..set errors on the nested form
        if typeof message is "object" and form[field]?
          setErrors form[field], message

        # ..set an error for the current form
        if typeof message is "string"
          form[field]?.$setValidity("server", false)
          form.$serverErrors[field] = message

    (form, response, resourceName) ->
      # skip when the response does not contain validation errors
      errors = response.data?.errors?[resourceName]
      if response.status isnt 422 or not errors?
        $log.warn "Response does not contain validation errors", response
        return

      # recursively set errors on the form
      setErrors form, errors
]
