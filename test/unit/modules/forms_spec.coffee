describe "module: angleGrinder.forms", ->
  beforeEach module("angleGrinder.forms")

  $scope = null
  $compile = null

  beforeEach inject (_$rootScope_, _$compile_) ->
    $scope = _$rootScope_.$new()
    $compile = _$compile_

  # Compile the template
  # @param {String} template The string to compile
  # @return {Object} A reference to the compiled template
  compileTemplate = (template) ->
    element = angular.element(template)
    $compile(element)($scope)
    $scope.$apply()
    element

  describe "directive: match", ->
    element = null
    form = null

    beforeEach ->
      element = compileTemplate """
        <form name="form">
          <input name="password" type="password"
                 ng-model="user.password" />
          <input name="passwordConfirmation" type="password"
                 ng-model="user.passwordConfirmation" match="user.password" />
        </form>
      """

      form = $scope.form

    describe "when the fields are equal", ->
      beforeEach ->
        $scope.$apply ->
          form.password.$setViewValue "password"
          form.passwordConfirmation.$setViewValue "password"

      it "marks the form as valid", ->
        expect(form.$valid).toBeTruthy()
        expect(form.$invalid).toBeFalsy()

      it "does not set errors on the input", ->
        expect(form.passwordConfirmation.$valid).toBeTruthy()
        expect(form.passwordConfirmation.$invalid).toBeFalsy()

    describe "when the fields are not equal", ->
      beforeEach ->
        $scope.$apply ->
          form.password.$setViewValue "password"
          form.passwordConfirmation.$setViewValue "other password"

      it "marks the form as invalid", ->
        expect(form.$valid).toBeFalsy()
        expect(form.$invalid).toBeTruthy()

      it "sets the valid form errors", ->
        expect(form.$error).toBeDefined()
        expect(form.$error.mismatch[0].$name).toEqual "passwordConfirmation"

      it "sets erorrs on the field", ->
        expect(form.passwordConfirmation.$valid).toBeFalsy()
        expect(form.passwordConfirmation.$invalid).toBeTruthy()
        expect(form.passwordConfirmation.$error.mismatch).toBeTruthy()

        $input = element.find("input[name=passwordConfirmation]")
        expect($input.hasClass("ng-invalid")).toBeTruthy()
        expect($input.hasClass("ng-invalid-mismatch")).toBeTruthy()

  describe "directive: fieldGroup", ->
    element = null
    form = null

    beforeEach ->
      element = compileTemplate """
        <form name="form" novalidate>
          <div class="control-group"
               field-group for="email,password">
            <input type="text" name="email"
                   ng-model="user.email" required />
            <input type="password" name="password"
                   ng-model="user.password" required />
          </div>
        </form>
      """

      form = $scope.form

    it "marks as invalid when the save button is clicked", ->
      # When (saving event was emitted)
      $scope.$broadcast "saving"

      # Then
      $group = element.find(".control-group")
      expect($group).toHaveClass "error"

    describe "when one of the field is invalid", ->
      beforeEach ->
        $scope.$apply ->
          form.email.$setViewValue "luke@rebel.com"
          form.password.$setViewValue ""

      it "marks the whole group as invalid", ->
        expect(form.$valid).toBeFalsy()
        $group = element.find(".control-group")
        expect($group).toHaveClass "error"

    describe "when all fields are valid", ->
      beforeEach ->
        $scope.$apply ->
          form.email.$setViewValue "luke@rebel.com"
          form.password.$setViewValue "password"

      it "does not mark the group as invalid", ->
        expect(form.$valid).toBeTruthy()
        $group = element.find(".control-group")
        expect($group).not.toHaveClass "erro"

  describe "directive: validationMessage", ->
    element = null
    $scope = null
    form = null

    comlileTemplate = (template) ->
      beforeEach inject ($rootScope, $compile) ->
        $scope = $rootScope.$new()

        element = angular.element(template)

        $compile(element)($scope)
        $scope.$apply()
        form = $scope.form

    errorMessage = -> element.find("validation-errors[for=password] span").text()

    describe "when the custom validation message is provided", ->
      comlileTemplate """
        <form name="form" novalidate>
          <input type="password" name="password"
                 ng-model="user.password" required />
          <validation-errors for="password"
                            required="Please fill this field" />
        </form>
      """

      it "displays errors when the save button is clicked", ->
        # When (saving event was emitted)
        $scope.$broadcast "saving"

        # Then
        expect(errorMessage()).toEqual "Please fill this field"

      describe "when the field is invalid", ->
        beforeEach ->
          $scope.$apply -> form.password.$setViewValue ""

        it "displays validation errors for the given field", ->
          expect(errorMessage()).toEqual "Please fill this field"

      describe "when the field is valid", ->
        beforeEach ->
          $scope.$apply -> form.password.$setViewValue "password"

        it "hides validation errors", ->
          expect(errorMessage()).toEqual ""

    describe "when the validation messages is not provided", ->
      comlileTemplate """
        <form name="form" novalidate>
          <input type="password" name="password"
                 ng-model="user.password" required />
          <validation-errors for="password" />
        </form>
      """

      beforeEach ->
        form.password.$setViewValue ""
        $scope.$apply()

      it "uses the default validation message", ->
        expect(errorMessage()).toEqual "This field is required"

    describe "when multiple validations are set on the field", ->
      comlileTemplate """
        <form name="form" novalidate>
          <input type="password" name="password"
                 ng-model="user.password" required />

          <input type="password" name="passwordConfirmation"
                 ng-model="user.passwordConfirmation"
                 match="user.password" ng-minlength="6" />
            <validation-errors for="passwordConfirmation" minlength="Too short" />
        </form>
      """

      beforeEach ->
        $scope.$apply ->
          form.password.$setViewValue "passwd"
          form.passwordConfirmation.$setViewValue "pass"

      it "displays all errors", ->
        $errors = element.find("validation-errors[for=passwordConfirmation]")

        expect($errors.find("span").length).toEqual 2

        expect($errors.find("span:nth-child(1)").text())
          .toEqual "Too short"

        expect($errors.find("span:nth-child(2)").text())
          .toEqual "Does not match the confirmation"

  describe "service: validationMessages", ->
    it "is defined", inject (validationMessages) ->
      expect(validationMessages).toBeDefined()

    hasDefaultMessageFor = (key, message) ->
      it "has a default message for `#{key}` validation", inject (validationMessages) ->
        expect(validationMessages[key]).toEqual message

    hasDefaultMessageFor "required",  "This field is required"
    hasDefaultMessageFor "mismatch",  "Does not match the confirmation"
    hasDefaultMessageFor "minlength", "This field is too short"
    hasDefaultMessageFor "maxlength", "This field is too long"
    hasDefaultMessageFor "email",     "Invalid email address"
    hasDefaultMessageFor "pattern",   "Ivalid pattern"

  describe "directive: deleteButton", ->
    element = null
    $rootScope = null
    $scope = null

    beforeEach inject (_$rootScope_, $compile) ->
      $rootScope = _$rootScope_
      $scope = $rootScope.$new()

      element = angular.element """
        <delete-button when-confirmed="delete(123)" deleting="deleting"></delete-button>
      """

      $compile(element)($scope)
      $rootScope.$apply()

    it "is visible", ->
      expect(element.css("display")).not.toBe "none"

    it "is not disabled", ->
      expect(element).not.toHaveClass "disabled"

    it "has a valid label", ->
      expect(element).toHaveText /Delete/

    describe "when the button is clicked", ->
      beforeEach -> element.click()

      it "displays the confirmation", ->
        expect(element).toHaveText(/Are you sure?/)

      it "changes button class", ->
        expect(element).toHaveClass "btn-warning"

    describe "when the button is double clicked", ->
      beforeEach ->
        element.click()
        $scope.delete = ->
        spyOn($scope, "delete")

      it "performs delete action", ->
        element.click()
        expect($scope.delete).toHaveBeenCalledWith(123)

    describe "when the DELETE request is in progress", ->
      beforeEach ->
        $rootScope.$apply -> $scope.deleting = true

      it "disables the button", ->
        expect(element).toHaveClass "disabled"

      it "changes the button label", ->
        expect(element).toHaveText "Delete..."

  describe "directive: cancelButton", ->
    element = null
    $scope = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()

      element = angular.element """
        <cancel-button></cancel-button>
      """

      $compile(element)($scope)
      $scope.$apply()

    it "create a cancel button", ->
      expect(element).toHaveText "Cancel"
      expect(element).toHaveClass "btn"

  describe "directive: submitButton", ->
    element = null
    $scope = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()

      element = angular.element """
        <submit-button></submit-button>
      """

      $compile(element)($scope)
      $scope.$apply()

    it "has valid label", ->
      expect(element).toHaveText /Save/

    describe "when the form is valid", ->
      beforeEach ->
        $scope.$apply -> $scope.editForm = $invalid: false

      it "is enabled", ->
        expect(element).not.toHaveClass "disabled"

    describe "when the request is in progress", ->
      beforeEach ->
        $scope.$apply -> $scope.saving = true

      it "is disabled", ->
        expect(element).toHaveClass "disabled"

      it "changes the button label", ->
        expect(element).toHaveText "Save..."

  describe "directive: serverValidationErrors", ->
    element = null
    $scope = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()

      element = angular.element """
        <server-validation-errors></server-validation-errors>
      """

      $compile(element)($scope)
      $scope.$apply()

    it "renders errors", ->
      $scope.$apply ->
        $scope.serverValidationErrors =
          user:
            login: "should be unique"
            email: "is taken"
          contact:
            email: "is invalid"

      expect(element.find(".alert-error").length).toEqual 3

      $userErrors = element.find("[x-errors-for=user]")
      expect($userErrors.find(".alert-error:nth-child(1)")).toHaveText "is taken"
      expect($userErrors.find(".alert-error:nth-child(2)")).toHaveText "should be unique"

      $contactErrors = element.find("[x-errors-for=contact]")
      expect($contactErrors.find(".alert-error:nth-child(1)")).toHaveText "is invalid"

    describe "when no errors", ->
      it "renders nothing", ->
        expect(element.find(".alert-error").length).toEqual 0

  describe "service: confirmationDialog", ->
    it "displays the confirmation", inject ($dialog, confirmationDialog) ->
      spyOn($dialog, "dialog").andCallThrough()
      confirmationDialog.open()
      expect($dialog.dialog).toHaveBeenCalled()
