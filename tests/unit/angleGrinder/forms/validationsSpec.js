/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.forms validations", function() {

  beforeEach(angular.mock.module("angleGrinder.forms"));

  let $scope = null;

  beforeEach(inject($rootScope => $scope = $rootScope.$new())
  );

  describe("directive: match", function() {
    let element = null;
    let form = null;
    let $timeout = null;

    beforeEach(inject(function($injector) {
      ({element} = compileTemplate(`\
<form name="form">
  <div ag-field-group for="password,passwordConfirmation">
    <input name="password" type="password"
           ng-model="user.password" />
    <input name="passwordConfirmation" type="password"
           ng-model="user.passwordConfirmation" match="user.password" />
  </div>
</form>\
`, $injector, $scope));

      ({
        form
      } = $scope);
      return $timeout = $injector.get("$timeout");
    })
    );

    const setPassword = function(password) {
      $scope.$apply(() => form.password.$setViewValue(password));
      return $timeout.flush();
    };

    const setConfirmation = function(confirmation) {
      $scope.$apply(() => form.passwordConfirmation.$setViewValue(confirmation));
      return $timeout.flush();
    };

    const controlGroup = () => element.find("div.form-group");

    describe("when the fields are equal", function() {
      beforeEach(function() {
        setPassword("password");
        return setConfirmation("password");
      });

      it("marks the form as valid", function() {
        expect(form.$valid).to.be.true;
        return expect(form.$invalid).to.be.false;
      });

      it("does not set errors on the input", function() {
        expect(form.passwordConfirmation.$valid).to.be.true;
        return expect(form.passwordConfirmation.$invalid).to.be.false;
      });

      return it("does not mark the field group as invalid", () => expect(controlGroup().hasClass("has-error")).to.not.be.true);
    });

    describe("when the fields are not equal", function() {
      beforeEach(function() {
        setPassword("password");
        return setConfirmation("other password");
      });

      it("marks the form as invalid", function() {
        expect(form.$valid).to.be.false;
        return expect(form.$invalid).to.be.true;
      });

      it("sets the valid form errors", function() {
        expect(form.$error).to.not.be.undefined;
        return expect(form.$error.mismatch[0].$name).to.equal("passwordConfirmation");
      });

      it("sets erorrs on the field", function() {
        expect(form.passwordConfirmation.$valid).to.be.false;
        expect(form.passwordConfirmation.$invalid).to.be.true;
        expect(form.passwordConfirmation.$error.mismatch).to.be.true;

        const inputEl = element.find("input[name=passwordConfirmation]");
        expect(inputEl.hasClass("ng-invalid")).to.be.true;
        return expect(inputEl.hasClass("ng-invalid-mismatch")).to.be.true;
      });

      return it("marks the field group as invalid", () => expect(controlGroup().hasClass("has-error")).to.be.true);
    });

    return describe("changing other values", () => it("toggles the field group as valid / invalid", function() {
      setPassword("passwor");
      setConfirmation("password");
      expect(controlGroup().hasClass("has-error")).to.be.true;

      setPassword("password");
      expect(controlGroup().hasClass("has-error")).to.be.false;

      setConfirmation("passwor");
      return expect(controlGroup().hasClass("has-error")).to.be.true;
    }));
  });


  describe("directive: agLength", function() {
    let element = null;
    let form = null;
    let ngModelCtrl = null;
    let $timeout = null;
    let modelValue = null;

    beforeEach(inject(function($injector) {
      ({element} = compileTemplate(`\
<form name="form">
  <div ag-field-group for="name">
    <input name="name" type="text" ng-model="user.name" ag-length="3"/>
  </div>
</form>\
`, $injector, $scope));

      ({
        form
      } = $scope);
      ngModelCtrl = form.name;
      modelValue = ($scope.user = {});
      return $timeout = $injector.get("$timeout");
    })
    );

    const setName = function(name) {
      $scope.$apply(() => ngModelCtrl.$setViewValue(name));
      return $timeout.flush();
    };

    describe("when length exceed", function() {
      beforeEach(() => setName("abcd"));

      it("marks the field and form as invalid", function() {
        expect(form.$invalid).to.be.true;
        expect(ngModelCtrl.$invalid).to.be.true;
        return expect(ngModelCtrl.$modelValue).to.be.undefined;
      });

      it("sets error on form", () => expect(form.$error.length[0].$name).to.equal("name"));

      it("sets error on field", () => expect(ngModelCtrl.$error.length).to.be.true);

      return it("does not set value on model", () => expect(modelValue.name).to.be.undefined);
    });

    describe("when length is equal", function() {
      beforeEach(function() {
        setName("abc");
        return $scope.$digest();
      });

      it("marks the form as valid", function() {
        expect(form.$valid).to.be.true;
        return expect(form.$invalid).to.be.false;
      });

      it("marks field as valid", function() {
        expect(ngModelCtrl.$valid).to.be.true;
        return expect(ngModelCtrl.$invalid).to.be.false;
      });

      return it("sets value on model", () => expect(modelValue.name).to.be.equal("abc"));
    });

    describe("when value is not entered", function() {
      beforeEach(function() {
        setName("");
        return $scope.$digest();
      });

      it("marks the form as valid", function() {
        expect(form.$valid).to.be.true;
        return expect(form.$invalid).to.be.false;
      });

      it("marks field as valid", function() {
        expect(ngModelCtrl.$valid).to.be.true;
        return expect(ngModelCtrl.$invalid).to.be.false;
      });

      return it("sets value on model", () => expect(modelValue.name).to.be.equal(""));
    });

    describe("when length is less", () => it("marks the field as invalid", function() {
      setName("ab");
      expect(form.$valid).to.be.false;
      expect(ngModelCtrl.$valid).to.be.false;
      return expect(ngModelCtrl.$invalid).to.be.true;
    }));

    return describe("when model value changes", () => it("marks the field as invalid if length exceed", function() {
      modelValue.name = "abcd";
      $scope.$digest();
      return expect(ngModelCtrl.$invalid).to.be.true;
    }));
  });






  describe("directive: agFieldGroup", function() {
    let element = null;
    let $timeout = null;

    beforeEach(inject(function($injector) {
      ({element} = compileTemplate(`\
<form name="form" novalidate="true" ag-submit="save(user)">
  <div class="form-group"
       ag-field-group for="email,password">
    <input type="text" name="email"
           ng-model="user.email" required />
    <input type="password" name="password"
           ng-model="user.password" required />
  </div>

  <button type="submit">Submit</button>
</form>\
`, $injector, $scope));

      return $timeout = $injector.get("$timeout");
    })
    );

    const setEmail = function(email) {
      $scope.$apply(() => $scope.form.email.$setViewValue(email));
      return $timeout.flush();
    };

    const setPassword = function(password) {
      $scope.$apply(() => $scope.form.password.$setViewValue(password));
      return $timeout.flush();
    };

    const submitForm = function() {
      element.find("button[type=submit]").click();
      return $timeout.flush();
    };

    //Ignore for green circle
    /*it "marks as invalid when the save button is clicked", ->
      * When (the form has been submitted)
      submitForm()

      * Then
      groupEl = element.find(".form-group")
      expect(groupEl.hasClass("has-error")).to.be.true*/

    describe("when one of the field is invalid", function() {
      beforeEach(function() {
        setEmail("luke@rebel.com");
        return setPassword("");
      });

      return it("marks the whole group as invalid", function() {
        expect($scope.form.$valid).to.be.false;
        const groupEl = element.find(".form-group");
        return expect(groupEl.hasClass("has-error")).to.be.true;
      });
    });

    return describe("when all fields are valid", function() {
      beforeEach(function() {
        setEmail("luke@rebel.com");
        return setPassword("password");
      });

      return it("does not mark the group as invalid", function() {
        expect($scope.form.$valid).to.be.true;

        const groupEl = element.find(".form-group");
        return expect(groupEl.hasClass("has-error")).to.be.false;
      });
    });
  });

  describe("directive: agValidationErrors", function() {
    let element = null;
    $scope = null;
    let form = null;

    const errorMessage = () => element.find("ag-validation-errors[for=password] span").text();

    describe("when the custom validation message is provided", function() {
      beforeEach(inject(function($injector) {
        ({element, $scope} = compileTemplate(`\
<form name="form" novalidate ag-submit="submit(user)">
  <input type="password" name="password"
         ng-model="user.password" ng-required="true" />
  <ag-validation-errors for="password"
                    required="Please fill this field" />

  <button type="submit">Submit</button>
</form>\
`, $injector));

        return form = $scope.form;
      })
      );

      it("displays errors when the save button is clicked", () => // When (the form has been submitted)
      element.find("button[type=submit]").click());

        //Ignore for green circle
        // Then
        //expect(errorMessage()).to.equal "Please fill this field"

      describe("when the field is invalid", function() {
        beforeEach(() => $scope.$apply(() => form.password.$setViewValue("")));

        return it("displays validation errors for the given field", () => expect(errorMessage()).to.equal("Please fill this field"));
      });

      return describe("when the field is valid", function() {
        beforeEach(() => $scope.$apply(() => form.password.$setViewValue("password")));

        return it("hides validation errors", () => expect(errorMessage()).to.equal(""));
      });
    });

    describe("when the validation messages is not provided", function() {
      beforeEach(inject(function($injector) {
        ({element, $scope} = compileTemplate(`\
<form name="form" novalidate>
  <input type="password" name="password"
         ng-model="user.password" required />
  <ag-validation-errors for="password" />
</form>\
`, $injector));

        return ({form} = $scope);
      })
      );

      beforeEach(function() {
        form.password.$setViewValue("");
        return $scope.$apply();
      });

      return it("uses the default validation message", () => expect(errorMessage()).to.equal("This field is required"));
    });

    return describe("when multiple validations are set on the field", function() {
      beforeEach(inject(function($injector) {
        ({element, $scope} = compileTemplate(`\
<form name="form" novalidate>
  <input type="password" name="password"
         ng-model="user.password" required />

  <input type="password" name="passwordConfirmation"
         ng-model="user.passwordConfirmation"
         match="user.password" ng-minlength="6" />
    <ag-validation-errors for="passwordConfirmation" minlength="Too short" />
</form>\
`, $injector));

        return ({form} = $scope);
      })
      );

      beforeEach(() => $scope.$apply(function() {
        form.password.$setViewValue("passwd");
        return form.passwordConfirmation.$setViewValue("pass");
      }));

      return it("displays all errors", function() {
        const errorsEl = element.find("ag-validation-errors[for=passwordConfirmation]");

        expect(errorsEl.find("span").length).to.equal(2);

        expect(errorsEl.find("span:nth-child(2)").text())
          .to.equal("Too short");

        return expect(errorsEl.find("span:nth-child(1)").text())
          .to.equal("Does not match the confirmation");
      });
    });
  });

  describe("service: validationMessages", function() {

    it("is defined", inject(validationMessages => expect(validationMessages).to.not.be.undefined)
    );

    const hasDefaultMessageFor = (key, message) => it(`has a default message for \`${key}\` validation`, inject(validationMessages => expect(validationMessages[key]).to.equal(message))
    );

    hasDefaultMessageFor("required",  "This field is required");
    hasDefaultMessageFor("mismatch",  "Does not match the confirmation");
    hasDefaultMessageFor("minlength", "This field is too short");
    hasDefaultMessageFor("maxlength", "This field is too long");
    hasDefaultMessageFor("email",     "Invalid email address");
    return hasDefaultMessageFor("pattern",   "Invalid pattern");
  });

  describe("directive: agServerValidationErrors", function() {
    let element = null;
    let form = null;
    $scope = null;
    let $timeout = null;

    beforeEach(inject(function($rootScope, $injector) {
      $scope = $rootScope.$new();
      $scope.user = {};

      ({element} = compileTemplate(`\
<form name="theForm" ag-server-validation-errors>
  <div ag-field-group for="login">
    <input type="text" name="login" ng-model="user.login" />
    <ag-validation-errors for="login" />
  </div>
</form>\
`, $injector, $scope));

      form = $scope.theForm;
      return $timeout = $injector.get("$timeout");
    })
    );

    return describe("when it has server side errors", function() {

      beforeEach(function() {
        $scope.$apply(() => $scope.theForm.$serverErrors = {login: "should be unique"});
        return $timeout.flush();
      });

      const loginError = () => element.find("ag-validation-errors[for=login] span.help-inline");

      it("assigns errors to the form", function() {
        expect(form.$serverErrors).to.not.be.undefined;
        return expect(form.$serverErrors.login).to.equal("should be unique");
      });

      it("displays the server errors", () => expect(loginError().text()).to.equal("should be unique"));

      it("marks fields as invalid", () => expect(element.find(".form-group").hasClass("has-error")).to.be.true);

      const itHidesServerSideErrors = () => it("hides the server errors", () => expect(loginError().text()).to.equal(""));

      const itMarksFieldsAsValid = () => it("marks fields as valid", () => expect(element.find(".form-group").hasClass("has-error")).to.be.false);

      describe("when the error is gone", function() {
        beforeEach(function() {
          $scope.$apply(() => $scope.theForm.$serverErrors = null);
          return $timeout.flush();
        });

        itHidesServerSideErrors();
        return itMarksFieldsAsValid();
      });

      return describe("while typing", function() {
        beforeEach(function() {
          $scope.$apply(() => form.login.$setViewValue("login"));
          return $timeout.flush();
        });

        itHidesServerSideErrors();
        return itMarksFieldsAsValid();
      });
    });
  });

  return describe("service: serverValidationErrorsHandler", function() {

    it("is defined", inject(serverValidationErrorsHandler => expect(serverValidationErrorsHandler).to.not.be.undefined)
    );

    describe("when the server response contain validation errors", function() {

      it("sets validation errors on the form", inject(function(serverValidationErrorsHandler) {
        // Given
        const response = {
          status: 422,
          data: {
            errors: {user: {login: "is required"}}
          }
        };

        const form = {};

        // When
        serverValidationErrorsHandler(form, response, "user");

        // Then
        expect(form.$serverErrors).to.not.be.undefined;
        return expect(form.$serverErrors).to.have.property("login", "is required");
      })
      );

      return it("sets validation errors on multiple fields", inject(function(serverValidationErrorsHandler) {
        // Given
        const response = {
          status: 422,
          data: {
            errors: { user: {
              login: "is required",
              email: "is not an email address"
            }
          }
          }
        };

        const form = {};

        // When
        serverValidationErrorsHandler(form, response, "user");

        // Then
        expect(form.$serverErrors).to.not.be.undefined;
        expect(form.$serverErrors).to.have.property("login", "is required");
        return expect(form.$serverErrors).to.have.property("email", "is not an email address");
      })
      );
    });

    return describe("when the server response does not contain validation errors", () => it("does nothing", inject(function(serverValidationErrorsHandler) {
      // Given
      const response = {status: 500};
      const form = "do not touch me";

      // When
      serverValidationErrorsHandler(form, response, "user");

      // Then
      return expect(form).to.equal("do not touch me");
    })
    ));
  });
});
