describe "module: angleGrinder.forms", ->
  beforeEach module("angleGrinder.forms")

  describe "directive: match", ->
    element = null
    $scope = null
    form = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()
      element = angular.element """
        <form name="form">
          <input name="password" type="password"
                 ng-model="user.password" />
          <input name="passwordConfirmation" type="password"
                 ng-model="user.passwordConfirmation" match="user.password" />
        </form>
      """

      $compile(element)($scope)
      $scope.$digest()
      form = $scope.form

    describe "when the fields are equal", ->
      beforeEach ->
        form.password.$setViewValue "password"
        form.passwordConfirmation.$setViewValue "password"
        $scope.$digest()

      it "marks the form as valid", ->
        expect(form.$valid).toBeTruthy()
        expect(form.$invalid).toBeFalsy()

      it "does not set errors on the input", ->
        expect(form.passwordConfirmation.$valid).toBeTruthy()
        expect(form.passwordConfirmation.$invalid).toBeFalsy()

    describe "when the fields are not equal", ->
      beforeEach ->
        form.password.$setViewValue "password"
        form.passwordConfirmation.$setViewValue "other password"
        $scope.$digest()

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
    $scope = null
    form = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()

      element = angular.element """
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

      $compile(element)($scope)
      $scope.$digest()
      form = $scope.form

    describe "when one of the field is invalid", ->
      beforeEach ->
        form.email.$setViewValue "luke@rebel.com"
        form.password.$setViewValue ""
        $scope.$digest()

      it "marks the whole group as invalid", ->
        expect(form.$valid).toBeFalsy()
        $group = element.find(".control-group")
        expect($group.hasClass("error")).toBeTruthy()

    describe "when all fields are valid", ->
      beforeEach ->
        form.email.$setViewValue "luke@rebel.com"
        form.password.$setViewValue "password"
        $scope.$digest()

      it "does not mark the group as invalid", ->
        expect(form.$valid).toBeTruthy()
        $group = element.find(".control-group")
        expect($group.hasClass("error")).toBeFalsy()

  describe "directive: validationMessage", ->
    element = null
    $scope = null
    form = null

    comlileTemplate = (template) ->
      beforeEach inject ($rootScope, $compile) ->
        $scope = $rootScope.$new()

        element = angular.element(template)

        $compile(element)($scope)
        $scope.$digest()
        form = $scope.form

    describe "when the validation message is provided", ->
      comlileTemplate """
        <form name="form" novalidate>
          <input type="password" name="password"
                 ng-model="user.password" required />
          <validation-error for="password"
                            required="Please fill this field" />
      """

      describe "when the field is invalid", ->
        beforeEach ->
          form.password.$setViewValue ""
          $scope.$digest()

        it "displays validation errors for the given field", ->
          expect(element.find("validation-error[for=password] span").text())
            .toEqual "Please fill this field"

      describe "when the field is valid", ->
        beforeEach ->
          form.password.$setViewValue "password"
          $scope.$digest()

        it "hides validation errors", ->
          expect(element.find("validation-error[for=password] span").text())
            .toEqual ""

    describe "when the validation messages is not provided", ->
      comlileTemplate """
        <form name="form" novalidate>
          <input type="password" name="password"
                 ng-model="user.password" required />
          <validation-error for="password" />
      """

      beforeEach ->
        form.password.$setViewValue ""
        $scope.$digest()

      it "uses the default validation message", ->
        expect(element.find("validation-error[for=password] span").text())
          .toEqual "This field is required"

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

  describe "directive: deleteButton", ->
    element = null
    $scope = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()

      element = angular.element """
        <delete-button />
      """

      $compile(element)($scope)

    describe "when the item is persisted", ->
      beforeEach ->
        $scope.createNew = false
        $scope.$digest()

      it "is visible", ->
        expect(element.css("display")).not.toBe "none"

      it "is not disabled", ->
        expect(element).not.toHaveClass("disabled")

      it "has a valid label", ->
        expect(element).toHaveText(/Delete/)

      describe "when the DELETE request is in progress", ->
        beforeEach ->
          $scope.deleting = true
          $scope.$digest()

        it "disables the button", ->
          expect(element).toHaveClass("disabled")

        it "changes the button label", ->
          expect(element).toHaveText("Delete...")

    describe "when the item is not persisted", ->
      beforeEach ->
        $scope.createNew = true
        $scope.$digest()

      it "is hidden", ->
        expect(element.css("display")).toBe "none"
