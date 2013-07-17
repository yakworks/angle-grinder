forms = angular.module("angleGrinder.forms", [])

forms.value "validationMessages",
  required: "This field is required"
  mismatch: "Does not match the confirmation"
  minlength: "This field is too short"
  maxlength: "This field is too long"
  email: "Invalid email address"

# Custom validation directive for fields match.
# Might be used for password confirmation validation.
forms.directive "match", ->
  require: "ngModel"
  link: (scope, elem, attrs, ctrl) ->
    validateEqual = (value, otherValue) ->
      valid = value is otherValue
      ctrl.$setValidity "mismatch", valid
      return value

    scope.$watch attrs.match, (otherValue) ->
      validateEqual(ctrl.$viewValue, otherValue)

    ctrl.$parsers.unshift (value) ->
      otherValue = scope.$eval(attrs.match)
      validateEqual(value, otherValue)

    ctrl.$formatters.unshift (value) ->
      validateEqual(value, scope.$eval(attrs.match))

forms.directive "fieldGroup", ->
  restrict: "A"
  require: "^form"
  replace: true
  transclude: true
  template: """
    <div class="control-group" ng-transclude></div>
  """

  link: ($scope, element, attrs, ctrl) ->
    formName = ctrl.$name
    fields = (attrs["for"] or "").split(",")

    watchExpression = (formName, fields) ->
      conditions = []
      for field in fields
        conditions.push "(#{formName}.#{field}.$dirty && #{formName}.#{field}.$invalid)"
      conditions.join(" || ")

    $scope.$watch watchExpression(formName, fields), ->
      allPristine = true
      allValid = true

      for field in fields
        $field = $scope[formName][field]

        if $field?
          allPristine = allPristine and $field.$pristine
          allValid = allValid and $field.$valid

      return if allPristine

      if allValid
        element.removeClass("error")
      else
        element.addClass("error")

forms.directive "validationError", [
  "validationMessages", (validationMessages) ->
    restrict: "E"
    require: "^form"
    transclude: false

    link: ($scope, element, attrs, ctrl) ->
      formName = ctrl.$name
      fieldName = attrs["for"]

      expression = "#{formName}.#{fieldName}.$dirty && #{formName}.#{fieldName}.$invalid"
      $scope.$watch expression, ->
        $field = $scope[formName][fieldName]

        html = ""
        if $field.$dirty and $field.$invalid
          for error, invalid of $field.$error
            if invalid
              message = attrs[error] || validationMessages[error]

              if message?
                html += """
                  <span class="help-inline">#{message}</span>
                """

        element.html(html)
]

forms.directive "deleteButton", ->
  restrict: "E"
  replace: true
  scope: false
  template: """
  <button type="button" class="btn btn-danger pull-left"
          ng-class="{disabled: deleting}"
          ng-hide="createNew">
    <i class="icon-trash"></i> Delete<span ng-show="deleting">...</span>
  </button>
  """

forms.directive "cancelButton", ->
  restrict: "E"
  replace: true
  scope: false
  template: """
  <button type="button" class="btn">
    <i class="icon-remove"></i> Cancel
  </button>
  """

forms.directive "submitButton", ->
  restrict: "E"
  replace: true
  scope: false
  template: """
  <button type="submit" class="btn btn-primary"
          ng-class="{disabled: editForm.$invalid}">
    <i class="icon-ok icon-white"></i> Save
  </button>
  """
