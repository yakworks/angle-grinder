/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.forms", () => describe("directive: editableDirectiveFactory", function() {

  beforeEach(module("angleGrinder.forms"));

  let $scope = null;
  let element = null;

  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();
    $scope.user = {login: "foobar"};

    element = angular.element(`\
<form editable-form name="testForm">
<span editable-text="user.login"
      e-name="login"
      e-ng-required="true"></span>
</form>\
`
    );
    $compile(element)($scope);
    return $rootScope.$apply();
  })
  );

  return describe("when the form is visible", function() {

    beforeEach(function() {
      $scope.testForm.$show();
      return $scope.$digest();
    });

    describe("whe the field is valid", function() {

      beforeEach(function() {
        $scope.testForm.login.$setViewValue("foo");
        return $scope.$digest();
      });

      return it("it hides the error message", () => expect(element.find("div.editable-error").text()).to.eq(""));
    });

    return describe("when the field has error", function() {

      beforeEach(function() {
        $scope.testForm.login.$setViewValue("");
        return $scope.$digest();
      });

      return it("it displays the error message", () => expect(element.find("div.editable-error").text()).to.eq("This field is required"));
    });
  });
}));
