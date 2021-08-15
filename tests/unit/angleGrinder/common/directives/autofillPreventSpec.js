import commonModule from 'angle-grinder/src/ng/common'

describe("module: angleGrinder.forms directive: autofillPrevent", function() {
  beforeEach(angular.mock.module(commonModule));

  let element = null;
  let $scope = null;
  let ngModel = null;

  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();
    $scope.user = {password: "password"};

    element = angular.element(`\
<input type="password"
					   name="password"
					   ng-model="user.password"
					   ng-required="user.newRecord()" autofill-prevent />\
`
    );
    $compile(element)($scope);
    $scope.$digest();
    return ngModel = element.data("$ngModelController");
  })
  );

  describe("$viewChangeListeners", function() {

    beforeEach(() => ngModel.$viewChangeListeners[0] = sinon.stub());

    return it("reaction for changes in ngModel", function() {
      expect(ngModel.$viewValue).to.equal("password");
      // Set new value to ngModel.$viewValue
      ngModel.$setViewValue("newAutofillValue");
      // If listener reacts on ngModel.$viewValue changes
      expect(ngModel.$viewChangeListeners[0]).to.be.a("function");
      expect(ngModel.$viewChangeListeners[0]).to.have.been.called;
      // ngModel.$viewValue should have a new value
      return expect(ngModel.$viewValue).to.equal("newAutofillValue");
    });
  });

  return describe("autofill prevention", () => it("ngModel.$viewValue", function() {
    expect(ngModel.$viewValue).to.equal("password");
    ngModel.$setViewValue("newAutofillValue");
    // ngModel.$viewValue should roll back to previous value
    return expect(ngModel.$viewValue).to.equal(undefined);
  }));
});

