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
forms.directive "match", ->
  require: "ngModel"
  link: (scope, elem, attrs, ctrl) ->
    validateEqual = (value, otherValue) ->
      allEmpty = _.compact([value, otherValue]).length is 0
      valid = allEmpty or value is otherValue

      ctrl.$setValidity "mismatch", valid
      return value

    scope.$watch attrs.match, (otherValue) ->
      validateEqual(ctrl.$viewValue, otherValue)

    validator = (value) ->
      otherValue = scope.$eval(attrs.match)
      validateEqual(value, otherValue)

    ctrl.$parsers.unshift validator
    ctrl.$formatters.unshift validator

forms.directive "agFieldGroup", ->
  restrict: "A"
  require: "^form"
  replace: true
  transclude: true
  template: """
    <div class="control-group" ng-transclude></div>
  """

  link: ($scope, element, attrs, formCtrl) ->
    fields = (attrs["for"] or "").split(",")

    displayErrors = ->
      valid = _.map fields, (field) ->
        formCtrl[field].$valid and not formCtrl.$serverError?[field]

      if _.all(valid)
        element.removeClass("error")
      else
        element.addClass("error")

    # Watch for changes and display errors if necessary
    angular.forEach fields, (fieldName) ->
      $scope.$watch "#{formCtrl.$name}.#{fieldName}.$viewValue", ->
        displayErrors() if formCtrl[fieldName]?.$dirty

      $scope.$watch "#{formCtrl.$name}.$serverError.#{fieldName}", (error) ->
        displayErrors() if error?

    # Display validation errors when the form is submitted
    $scope.$watch "#{formCtrl.$name}.$submitted", (submitted) ->
      displayErrors() if submitted

forms.directive "agValidationErrors", [
  "validationMessages", (validationMessages) ->
    restrict: "E"
    require: "^form"
    replace: true

    link: ($scope, element, attrs, formCtrl) ->
      formName = formCtrl.$name
      fieldName = attrs["for"]
      field = formCtrl[fieldName]

      # Do cleanup
      clearErrors = -> element.html("")

      # Try to take an errors message from the attrribute
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

      # Dispalay validation errors while typing
      $scope.$watch "#{formName}.#{fieldName}.$viewValue", ->
        displayErrorMessages() if field.$dirty

      # Display validation errors when the form is submitted
      $scope.$watch "#{formName}.$submitted", (submitted) ->
        displayErrorMessages() if submitted

      # Display server side errors
      $scope.$watch "#{formName}.$serverError.#{fieldName}", (serverError) ->
        if serverError?
          appendError serverError, "server-error"
        else
          element.find(".server-error").remove()

      # TODO do something with `saving`
      $scope.$watch "saving", (newValue, oldValue) ->
        displayErrorMessages() if not newValue and newValue != oldValue
]

forms.directive "agServerValidationErrors", ->
  restrict: "A"
  require: "^form"
  link: ($scope, element, attrs, form) ->
    form.$serverError = {}

    $scope.$watch "serverValidationErrors", (serverError) ->
      form.$serverError = serverError

    # TODO this one is broken
    # Hide server side validation errors while typping
    angular.forEach form, (_, fieldName) ->
      $scope.$watch "#{form.$name}.#{fieldName}.$viewValue", ->
        form.$serverError = {}
