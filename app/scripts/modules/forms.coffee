forms = angular.module("angleGrinder.forms", ["angleGrinder.common", "ui.bootstrap"])

class FormDialogCtrl
  @$inject = ["$scope", "$rootScope", "$log", "dialog", "item", "flatten"]
  constructor: ($scope, $rootScope, $log, dialog, item, flatten) ->
    $scope.item = item
    $scope.createNew = not item.persisted()

    $scope.serverValidationErrors = {}

    # Closes the dialog
    $scope.closeEditDialog = ->
      $log.info "Closing the dialog"
      dialog.close($scope.item)

    # If form is valid performs server side update
    $scope.save = (item) ->
      if $scope.editForm.$invalid
        $log.warn "The form is invalid", $scope.editForm
        return

      $scope.serverValidationErrors = {}

      onSuccess = (response) ->
        $log.info "Item has been updated/created", response

        # Flattening the object before insering it to the grid
        $rootScope.$broadcast "itemUpdated", flatten(response)
        $scope.closeEditDialog()

      onError = (response) ->

        $log.error "Something went wront", response
        if response.status is 422
          errors = response.data?.errors?[item.resourceName()]
          $scope.serverValidationErrors = errors
          $log.error "Server side validation errors", errors

      item.save success: onSuccess, error: onError

    # Performs server side delete
    $scope.delete = ->
      onSuccess = (response) ->
        $log.info "Item has been deleted", response

        $rootScope.$broadcast "itemDeleted", item
        $scope.closeEditDialog()

      onError = (response) ->
        $log.error "Something went wront", response

      item.delete success: onSuccess, error: onError

forms.controller "FormDialogCtrl", FormDialogCtrl

class EditDialog
  @$inject = ["$dialog"]
  constructor: (@$dialog) ->

  open: (templateUrl, item) ->
    dialog = @$dialog.dialog
      backdropFade: false
      dialogFade: false
      resolve:
        item: -> item

    # override so we can intercept form dirty and prevent escape
    dialog.handledEscapeKey = (e) ->
      if e.which is 27
        e.preventDefault()
        unless dialog.$scope.editForm.$dirty
          dialog.close()
          dialog.$scope.$apply()

    # override so we can intercept form dirty and prevent backdrop click
    dialog.handleBackDropClick = (e) ->
      e.preventDefault()
      unless dialog.$scope.editForm.$dirty
        dialog.close()
        dialog.$scope.$apply()

    dialog.open templateUrl, "FormDialogCtrl"

forms.service "editDialog", EditDialog

class ConfirmationDialogCtrl
  @$inject = ["$scope", "$log", "dialog", "message"]
  constructor: ($scope, $log, dialog, message) ->
    $scope.message = message
    $scope.close = (confirmed) ->
      $log.info "Confirmation dialog closed", confirmed
      dialog.close(confirmed)

forms.controller "ConfirmationDialogCtrl", ConfirmationDialogCtrl

forms.run ["$templateCache", ($templateCache) ->
  $templateCache.put "templates/dialogs/confirmation.html", """
    <div class="modal-body">{{message}}</div>
      <div class="modal-footer">
      <button class="btn" ng-click="close(false)">Cancel</button>
      <button class="btn btn-primary" ng-click="close(true)">OK</button>
    </div>
  """
]

class ConfirmationDialog
  @$inject = ["$dialog", "$log"]
  constructor: (@$dialog, @$log) ->

  open: (message = null) ->
    @$log.info "Opening confirmation dialog, message:", message

    dialog = @$dialog.dialog
      resolve:
        message: -> if message? then message else "Are you sure?"

    dialog.open "templates/dialogs/confirmation.html", "ConfirmationDialogCtrl"

forms.service "confirmationDialog", ConfirmationDialog

forms.value "validationMessages",
  required: "This field is required"
  mismatch: "Does not match the confirmation"
  minlength: "This field is too short"
  maxlength: "This field is too long"
  email: "Invalid email address"
  pattern: "Ivalid pattern"

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
    $scope.$watch "submitted", (submitted) ->
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

      displayErrorMessages = ->
        clearErrors()

        # Display client side errors
        for error, invalid of field.$error
          continue unless invalid

          message = messageFor error
          continue unless message?

          element.append """
            <span class="help-inline">#{message}</span>
          """

        # Display server side errors
        serverError = formCtrl.$serverError?[fieldName]
        element.append """
          <span class="help-inline">#{serverError}</span>
        """ if serverError?

      # Dispalay validation errors while typing
      $scope.$watch "#{formName}.#{fieldName}.$viewValue", ->
        displayErrorMessages() if field.$dirty

      # Display validation errors when the form is submitted
      $scope.$watch "submitted", (submitted) ->
        displayErrorMessages() if submitted

      $scope.$watch "saving", (newValue, oldValue) ->
        displayErrorMessages() if not newValue and newValue != oldValue
]

# Double check delete button
# usage:
#   <ag-delete-button when-confirmed="delete(item)" deleting="deleting"></ag-delete-button>
#
#   `when-confirmed` function to call when the action was confirmed
#   `deleting` when it's set to `true` the button will be disabled
forms.directive "agDeleteButton", ->
  restrict: "E"
  replace: true

  scope:
    whenConfirmed: "&"

  controller: [
    "$scope", "$http", "$element", ($scope, $http, $element) ->
      $scope.confirmation = false

      $scope.delete = ->
        # on the second click perform the given action
        $scope.whenConfirmed() if $scope.confirmation
        # switch the state
        $scope.confirmation = !$scope.confirmation

      # enable / disable the button if a request in progress
      $scope.$watch ->
        $scope.deleting = $http.pendingRequests.length > 0

      # change button label
      $scope.$watch "confirmation", (confirmation) ->
        $scope.label = unless confirmation then "Delete" else "Are you sure?"

        if confirmation
          $element.removeClass "btn-danger"
          $element.addClass "btn-warning"
        else
          $element.addClass "btn-danger"
          $element.removeClass "btn-warning"
  ]

  template: """
    <button type="button" class="btn btn-danger ag-delete-button" ng-disabled="deleting"
            ng-mouseleave="confirmation = false"
            ng-click="delete()">
      <i class="icon-trash"></i> {{label}}<span ng-show="deleting">...</span>
    </button>
  """

forms.directive "agCreateButton", ->
  restrict: "E"
  replace: true
  transclude: true

  link: (scope, element) ->
    # Append the default label
    element.append "Create" if $.trim(element.text()) is ""

  template: """
    <a href="" class="btn">
      <i class="icon-edit"></i>
      <span ng-transclude></span>
    </a>
  """

forms.directive "agCancelButton", ->
  restrict: "E"
  replace: true
  template: """
    <button type="button" class="btn">
      <i class="icon-remove"></i> Cancel
    </button>
  """

forms.directive "agSubmitButton", ->
  restrict: "E"
  replace: true
  controller: ["$scope", "pendingRequests", ($scope, pendingRequests) ->
    # disable the button if POST, PUT or PATCH request is in progress
    $scope.$watch -> $scope.saving = pendingRequests.for("POST", "PUT", "PATCH")
  ]
  template: """
    <button type="submit" class="btn btn-primary"
            ng-click="submitted = true"
            ng-disabled="saving"
      <i class="icon-ok icon-white"></i> Save<span ng-show="saving">...</span>
    </button>
  """

forms.directive "agServerValidationErrors", ->
  restrict: "A"
  require: "^form"
  link: (scope, element, attrs, form) ->
    form.$serverError = {}

    scope.$watch "serverValidationErrors", (serverError) ->
      form.$serverError = serverError

    for fieldName, _ of form
      scope.$watch "#{form.$name}.#{fieldName}.$viewValue", ->
        form.$serverError = {}
