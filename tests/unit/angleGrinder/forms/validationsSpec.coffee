describe "module: angleGrinder.forms validations", ->

  beforeEach module "angleGrinder.forms"

  $scope = null

  beforeEach inject ($rootScope) ->
    $scope = $rootScope.$new()

  describe "directive: match", ->
    element = null
    form = null
    $timeout = null

    beforeEach inject ($injector) ->
      {element} = compileTemplate """
        <form name="form">
          <div ag-field-group for="password,passwordConfirmation">
            <input name="password" type="password"
                   ng-model="user.password" />
            <input name="passwordConfirmation" type="password"
                   ng-model="user.passwordConfirmation" match="user.password" />
          </div>
        </form>
      """, $injector, $scope

      form = $scope.form
      $timeout = $injector.get("$timeout")

    setPassword = (password) ->
      $scope.$apply -> form.password.$setViewValue password
      $timeout.flush()

    setConfirmation = (confirmation) ->
      $scope.$apply -> form.passwordConfirmation.$setViewValue confirmation
      $timeout.flush()

    controlGroup = -> element.find("div.form-group")

    describe "when the fields are equal", ->
      beforeEach ->
        setPassword "password"
        setConfirmation "password"

      it "marks the form as valid", ->
        expect(form.$valid).to.be.true
        expect(form.$invalid).to.be.false

      it "does not set errors on the input", ->
        expect(form.passwordConfirmation.$valid).to.be.true
        expect(form.passwordConfirmation.$invalid).to.be.false

      it "does not mark the field group as invalid", ->
        expect(controlGroup().hasClass("has-error")).to.not.be.true

    describe "when the fields are not equal", ->
      beforeEach ->
        setPassword "password"
        setConfirmation "other password"

      it "marks the form as invalid", ->
        expect(form.$valid).to.be.false
        expect(form.$invalid).to.be.true

      it "sets the valid form errors", ->
        expect(form.$error).to.not.be.undefined
        expect(form.$error.mismatch[0].$name).to.equal "passwordConfirmation"

      it "sets erorrs on the field", ->
        expect(form.passwordConfirmation.$valid).to.be.false
        expect(form.passwordConfirmation.$invalid).to.be.true
        expect(form.passwordConfirmation.$error.mismatch).to.be.true

        inputEl = element.find("input[name=passwordConfirmation]")
        expect(inputEl.hasClass("ng-invalid")).to.be.true
        expect(inputEl.hasClass("ng-invalid-mismatch")).to.be.true

      it "marks the field group as invalid", ->
        expect(controlGroup().hasClass("has-error")).to.be.true

    describe "changing other values", ->
      it "toggles the field group as valid / invalid", ->
        setPassword "passwor"
        setConfirmation "password"
        expect(controlGroup().hasClass("has-error")).to.be.true

        setPassword "password"
        expect(controlGroup().hasClass("has-error")).to.be.false

        setConfirmation "passwor"
        expect(controlGroup().hasClass("has-error")).to.be.true


  describe "directive: agLength", ->
    element = null
    form = null
    ngModelCtrl = null
    $timeout = null
    modelValue = null

    beforeEach inject ($injector) ->
      {element} = compileTemplate """
        <form name="form">
          <div ag-field-group for="name">
            <input name="name" type="text" ng-model="user.name" ag-length="3"/>
          </div>
        </form>
      """, $injector, $scope

      form = $scope.form
      ngModelCtrl = form.name
      modelValue = $scope.user = {}
      $timeout = $injector.get("$timeout")

    setName = (name) ->
      $scope.$apply -> ngModelCtrl.$setViewValue name
      $timeout.flush()

    describe "when length exceed", ->
      beforeEach ->
        setName "abcd"

      it "marks the field and form as invalid", ->
        expect(form.$invalid).to.be.true
        expect(ngModelCtrl.$invalid).to.be.true
        expect(ngModelCtrl.$modelValue).to.be.undefined

      it "sets error on form", ->
        expect(form.$error.length[0].$name).to.equal "name"

      it "sets error on field", ->
        expect(ngModelCtrl.$error.length).to.be.true

      it "does not set value on model", ->
        expect(modelValue.name).to.be.undefined

    describe "when length is equal", ->
      beforeEach ->
        setName "abc"
        $scope.$digest()

      it "marks the form as valid", ->
        expect(form.$valid).to.be.true
        expect(form.$invalid).to.be.false

      it "marks field as valid", ->
        expect(ngModelCtrl.$valid).to.be.true
        expect(ngModelCtrl.$invalid).to.be.false

      it "sets value on model", ->
        expect(modelValue.name).to.be.equal "abc"

    describe "when length is less", ->
      it "marks the field as invalid", ->
        setName "ab"
        expect(form.$valid).to.be.false
        expect(ngModelCtrl.$valid).to.be.false
        expect(ngModelCtrl.$invalid).to.be.true

    describe "when model value changes", ->

      it "marks the field as invalid if length exceed", ->
        modelValue.name = "abcd"
        $scope.$digest()
        expect(ngModelCtrl.$invalid).to.be.true






  describe "directive: agFieldGroup", ->
    element = null
    $timeout = null

    beforeEach inject ($injector) ->
      {element} = compileTemplate """
        <form name="form" novalidate="true" ag-submit="save(user)">
          <div class="form-group"
               ag-field-group for="email,password">
            <input type="text" name="email"
                   ng-model="user.email" required />
            <input type="password" name="password"
                   ng-model="user.password" required />
          </div>

          <button type="submit">Submit</button>
        </form>
      """, $injector, $scope

      $timeout = $injector.get("$timeout")

    setEmail = (email) ->
      $scope.$apply -> $scope.form.email.$setViewValue email
      $timeout.flush()

    setPassword = (password) ->
      $scope.$apply -> $scope.form.password.$setViewValue password
      $timeout.flush()

    submitForm = ->
      element.find("button[type=submit]").click()
      $timeout.flush()

    it "marks as invalid when the save button is clicked", ->
      # When (the form has been submitted)
      submitForm()

      # Then
      groupEl = element.find(".form-group")
      expect(groupEl.hasClass("has-error")).to.be.true

    describe "when one of the field is invalid", ->
      beforeEach ->
        setEmail "luke@rebel.com"
        setPassword ""

      it "marks the whole group as invalid", ->
        expect($scope.form.$valid).to.be.false
        groupEl = element.find(".form-group")
        expect(groupEl.hasClass("has-error")).to.be.true

    describe "when all fields are valid", ->
      beforeEach ->
        setEmail "luke@rebel.com"
        setPassword "password"

      it "does not mark the group as invalid", ->
        expect($scope.form.$valid).to.be.true

        groupEl = element.find(".form-group")
        expect(groupEl.hasClass("has-error")).to.be.false

  describe "directive: agValidationErrors", ->
    element = null
    $scope = null
    form = null

    errorMessage = -> element.find("ag-validation-errors[for=password] span").text()

    describe "when the custom validation message is provided", ->
      beforeEach inject ($injector) ->
        {element, $scope} = compileTemplate """
          <form name="form" novalidate ag-submit="submit(user)">
            <input type="password" name="password"
                   ng-model="user.password" ng-required="true" />
            <ag-validation-errors for="password"
                              required="Please fill this field" />

            <button type="submit">Submit</button>
          </form>
        """, $injector

        form = $scope.form

      it "displays errors when the save button is clicked", ->
        # When (the form has been submitted)
        element.find("button[type=submit]").click()

        # Then
        expect(errorMessage()).to.equal "Please fill this field"

      describe "when the field is invalid", ->
        beforeEach ->
          $scope.$apply -> form.password.$setViewValue ""

        it "displays validation errors for the given field", ->
          expect(errorMessage()).to.equal "Please fill this field"

      describe "when the field is valid", ->
        beforeEach ->
          $scope.$apply -> form.password.$setViewValue "password"

        it "hides validation errors", ->
          expect(errorMessage()).to.equal ""

    describe "when the validation messages is not provided", ->
      beforeEach inject ($injector) ->
        {element, $scope} = compileTemplate """
          <form name="form" novalidate>
            <input type="password" name="password"
                   ng-model="user.password" required />
            <ag-validation-errors for="password" />
          </form>
        """, $injector

        {form} = $scope

      beforeEach ->
        form.password.$setViewValue ""
        $scope.$apply()

      it "uses the default validation message", ->
        expect(errorMessage()).to.equal "This field is required"

    describe "when multiple validations are set on the field", ->
      beforeEach inject ($injector) ->
        {element, $scope} = compileTemplate """
          <form name="form" novalidate>
            <input type="password" name="password"
                   ng-model="user.password" required />

            <input type="password" name="passwordConfirmation"
                   ng-model="user.passwordConfirmation"
                   match="user.password" ng-minlength="6" />
              <ag-validation-errors for="passwordConfirmation" minlength="Too short" />
          </form>
        """, $injector

        {form} = $scope

      beforeEach ->
        $scope.$apply ->
          form.password.$setViewValue "passwd"
          form.passwordConfirmation.$setViewValue "pass"

      it "displays all errors", ->
        errorsEl = element.find("ag-validation-errors[for=passwordConfirmation]")

        expect(errorsEl.find("span").length).to.equal 2

        expect(errorsEl.find("span:nth-child(2)").text())
          .to.equal "Too short"

        expect(errorsEl.find("span:nth-child(1)").text())
          .to.equal "Does not match the confirmation"

  describe "service: validationMessages", ->

    it "is defined", inject (validationMessages) ->
      expect(validationMessages).to.not.be.undefined

    hasDefaultMessageFor = (key, message) ->
      it "has a default message for `#{key}` validation", inject (validationMessages) ->
        expect(validationMessages[key]).to.equal message

    hasDefaultMessageFor "required",  "This field is required"
    hasDefaultMessageFor "mismatch",  "Does not match the confirmation"
    hasDefaultMessageFor "minlength", "This field is too short"
    hasDefaultMessageFor "maxlength", "This field is too long"
    hasDefaultMessageFor "email",     "Invalid email address"
    hasDefaultMessageFor "pattern",   "Invalid pattern"

  describe "directive: agServerValidationErrors", ->
    element = null
    form = null
    $scope = null
    $timeout = null

    beforeEach inject ($rootScope, $injector) ->
      $scope = $rootScope.$new()
      $scope.user = {}

      {element} = compileTemplate """
        <form name="theForm" ag-server-validation-errors>
          <div ag-field-group for="login">
            <input type="text" name="login" ng-model="user.login" />
            <ag-validation-errors for="login" />
          </div>
        </form>
      """, $injector, $scope

      form = $scope.theForm
      $timeout = $injector.get("$timeout")

    describe "when it has server side errors", ->

      beforeEach ->
        $scope.$apply -> $scope.theForm.$serverErrors = login: "should be unique"
        $timeout.flush()

      loginError = ->
        element.find("ag-validation-errors[for=login] span.help-inline")

      it "assigns errors to the form", ->
        expect(form.$serverErrors).to.not.be.undefined
        expect(form.$serverErrors.login).to.equal "should be unique"

      it "displays the server errors", ->
        expect(loginError().text()).to.equal "should be unique"

      it "marks fields as invalid", ->
        expect(element.find(".form-group").hasClass("has-error")).to.be.true

      itHidesServerSideErrors = ->
        it "hides the server errors", ->
          expect(loginError().text()).to.equal ""

      itMarksFieldsAsValid = ->
        it "marks fields as valid", ->
          expect(element.find(".form-group").hasClass("has-error")).to.be.false

      describe "when the error is gone", ->
        beforeEach ->
          $scope.$apply -> $scope.theForm.$serverErrors = null
          $timeout.flush()

        itHidesServerSideErrors()
        itMarksFieldsAsValid()

      describe "while typing", ->
        beforeEach ->
          $scope.$apply -> form.login.$setViewValue "login"
          $timeout.flush()

        itHidesServerSideErrors()
        itMarksFieldsAsValid()

  describe "service: serverValidationErrorsHandler", ->

    it "is defined", inject (serverValidationErrorsHandler) ->
      expect(serverValidationErrorsHandler).to.not.be.undefined

    describe "when the server response contain validation errors", ->

      it "sets validation errors on the form", inject (serverValidationErrorsHandler) ->
        # Given
        response =
          status: 422
          data:
            errors: user: login: "is required"

        form = {}

        # When
        serverValidationErrorsHandler(form, response, "user")

        # Then
        expect(form.$serverErrors).to.not.be.undefined
        expect(form.$serverErrors).to.have.property "login", "is required"

      it "sets validation errors on multiple fields", inject (serverValidationErrorsHandler) ->
        # Given
        response =
          status: 422
          data:
            errors: user:
              login: "is required"
              email: "is not an email address"

        form = {}

        # When
        serverValidationErrorsHandler(form, response, "user")

        # Then
        expect(form.$serverErrors).to.not.be.undefined
        expect(form.$serverErrors).to.have.property "login", "is required"
        expect(form.$serverErrors).to.have.property "email", "is not an email address"

    describe "when the server response does not contain validation errors", ->

      it "does nothing", inject (serverValidationErrorsHandler) ->
        # Given
        response = status: 500
        form = "do not touch me"

        # When
        serverValidationErrorsHandler(form, response, "user")

        # Then
        expect(form).to.equal "do not touch me"
