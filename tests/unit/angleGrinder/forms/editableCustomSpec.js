/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.forms", () => describe("directive: editableCustom", function() {

  beforeEach(module("angleGrinder.forms"));

  let $scope = null;
  let element = null;

  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();

    $scope.roles = [
      { id: "guest",     name: "Guest" },
      { id: "moderator", name: "Moderator" },
      { id: "admin",     name: "Admin" }
    ];
    $scope.user = {role: "guest"};

    element = angular.element(`\
<form editable-form name="testForm">
<span editable-custom="user.login">{{user.role}}</span>
<div editable-custom-template>
  <select name="role" ng-model="$data">
    <option ng-repeat="role in roles" value="{{role.id}}">{{role.name}}</option>
  </select>
</div>
</form>\
`
    );
    $compile(element)($scope);
    return $scope.$digest();
  })
  );

  describe("when the form is hidden", () => it("hides the custom input", () => expect(element.find("select[name=role]").length).to.eq(0)));

  return describe("when the form is visible", function() {

    beforeEach(function() {
      $scope.testForm.$show();
      return $scope.$digest();
    });

    return it("shows the custom input", () => expect(element.find("select[name=role]").length).to.eq(1));
  });
}));
