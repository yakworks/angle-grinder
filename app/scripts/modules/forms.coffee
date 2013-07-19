forms = angular.module("angleGrinder.forms", ["ui.bootstrap"])

class EditItemCtrl
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
      $scope.$broadcast "saving"

      if $scope.editForm.$valid
        $log.info "The form is valid", $scope.editForm

        $scope.saving = true
        $scope.serverValidationErrors = {}

        onSuccess = (response) ->
          $scope.saving = false
          $log.info "Item has been updated/created", response

          # Flattening the object before insering it to the grid
          $rootScope.$broadcast "itemUpdated", flatten(response)
          $scope.closeEditDialog()

        onError = (response) ->
          $scope.saving = false

          $log.error "Something went wront", response
          if response.status is 422
            errors = response.data.errors
            $scope.serverValidationErrors = errors
            $log.error "Server side validation errors", errors

        item.save success: onSuccess, error: onError
      else
        $log.warn "The form is invalid", $scope.editForm

    # Performs server side delete
    $scope.delete = ->
      $scope.deleting = true

      onSuccess = (response) ->
        $scope.deleting = false
        $log.info "Item has been deleted", response

        $rootScope.$broadcast "itemDeleted", item
        $scope.closeEditDialog()

      onError = (response) ->
        $scope.deleting = false
        $log.error "Something went wront", response

      item.delete success: onSuccess, error: onError

forms.controller "EditItemCtrl", EditItemCtrl

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

    dialog.open templateUrl, "EditItemCtrl"

forms.service "editDialog", EditDialog

class ConfirmationDialogCtrl
  @$inject = ["$scope", "$log", "dialog", "message"]
  constructor: ($scope, $log, dialog, message) ->
    $scope.message = message
    $scope.close = (confirmed) ->
      $log.info "Confirmation dialog closed", confirmed
      dialog.close(confirmed)

forms.controller "ConfirmationDialogCtrl", ConfirmationDialogCtrl

# TODO temporaty cache the templete
# TODO cache templates for this module
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

  link: ($scope, element, attrs, formCtrl) ->
    formName = formCtrl.$name
    fields = (attrs["for"] or "").split(",")

    displayErrors = ->
      valid = _.map fields, (field) -> formCtrl[field].$valid
      if _.all(valid)
        element.removeClass("error")
      else
        element.addClass("error")

    angular.forEach fields, (fieldName) ->
      $scope.$watch "#{formName}.#{fieldName}.$viewValue", ->
        displayErrors() if formCtrl[fieldName]?.$dirty

    $scope.$on "saving", ->
      displayErrors()

forms.directive "validationError", [
  "validationMessages", (validationMessages) ->
    restrict: "E"
    require: "^form"
    transclude: false

    link: ($scope, element, attrs, formCtrl) ->
      formName = formCtrl.$name
      fieldName = attrs["for"]
      field = $scope[formName][fieldName]

      # Do cleanup
      clearErrors = -> element.html("")

      # Try to take an errors message from the attrribute
      # otherwise fallback to the default error message
      messageFor = (error) ->
        attrs[error] or validationMessages[error]

      toggleErrors = ->
        clearErrors()

        for error, invalid of field.$error
          continue unless invalid

          message = messageFor error
          continue unless message?

          element.append """
            <span class="help-inline">#{message}</span>
          """

      # Dispalay validation errors while typing
      $scope.$watch "#{formName}.#{fieldName}.$viewValue", ->
        toggleErrors() if field.$dirty

      # Display validation errors when Save button is clicked
      $scope.$on "saving", ->
        toggleErrors()
]

# Double check delete button
# usage:
#   <delete-button when-confirmed="delete(item)" deleting="deleting"></delete-button>
#
#   `when-confirmed` function to call when the action was confirmed
#   `deleting` when it's set to `true` the button will be disabled
forms.directive "deleteButton", ->
  restrict: "E"
  replace: true

  scope:
    whenConfirmed: "&"

  controller: [
    "$scope", "$element", ($scope, $element) ->
      $scope.deleting = $scope.$parent.deleting
      $scope.confirmation = false

      $scope.delete = ->
        # on the second click perform the given action
        $scope.whenConfirmed() if $scope.confirmation
        # switch the state
        $scope.confirmation = !$scope.confirmation

      # change button label
      $scope.$watch "confirmation", (confirmation) ->
        $scope.label = unless confirmation then "Delete" else "Are you sure?"

        if confirmation
          $element.removeClass "btn-danger"
          $element.addClass "btn-warning"
        else
          $element.addClass "btn-danger"
          $element.removeClass "btn-warning"

      $scope.$watch "$parent.deleting", (deleting) ->
        $scope.deleting = deleting

        if deleting
          $element.addClass "disabled"
        else
          $element.removeClass "disabled"
  ]

  template: """
    <button type="button" class="btn btn-danger pull-left"
            ng-mouseleave="confirmation = false"
            ng-click="delete()">
      <i class="icon-trash"></i> {{label}}<span ng-show="deleting">...</span>
    </button>
  """

forms.directive "cancelButton", ->
  restrict: "E"
  replace: true
  template: """
  <button type="button" class="btn">
    <i class="icon-remove"></i> Cancel
  </button>
  """

forms.directive "submitButton", ->
  restrict: "E"
  replace: true
  template: """
  <button type="submit" class="btn btn-primary"
          ng-class="{disabled: saving}">
    <i class="icon-ok icon-white"></i> Save<span ng-show="saving">...</span>
  </button>
  """

forms.directive "serverValidationErrors", ->
  restrict: "E"
  replace: true
  template: """
    <span>
      <span x-errors-for="{{entity}}" ng-repeat="(entity, errors) in serverValidationErrors">
        <div class="alert alert-error" ng-repeat="(field, message) in errors">
          {{message}}
        </div>
      </span>
    </span>
  """
