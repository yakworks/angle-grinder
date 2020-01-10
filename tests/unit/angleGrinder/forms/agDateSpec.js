/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.forms", () => describe("directive: agDate", function() {

  beforeEach(angular.mock.module("angleGrinder.forms"));

  let $scope = null;
  let element = null;

  describe("use localDate date type (that is used by default)", function() {
    beforeEach(inject(function($rootScope, $compile) {
      $scope = $rootScope.$new();
      $scope.user = {birthday: "1990-03-01"};

      const template = `\
<input ag-date ng-model="user.birthday"
       name="birthday" />\
`;
      element = $compile(template)($scope);
      return $rootScope.$apply();
    })
    );

    it("displays the current value", () => expect(element.val()).to.eq("03/01/1990"));

    return it("saves date to model", inject($timeout => expect($scope.user.birthday).to.eq("1990-03-01"))
    );
  });

  describe("use `date` date type", function() {
    beforeEach(inject(function($rootScope, $compile) {
      $scope = $rootScope.$new();
      $scope.user = {birthday: "1990-03-01"};

      const template = `\
<input ag-date ng-model="user.birthday"
name="birthday"
date-type="date"/>\
`;
      element = $compile(template)($scope);
      return $rootScope.$apply();
    })
    );

    return it("displays the current value", () => expect(element.val()).to.eq("03/01/1990"));
  });

  return describe("use `localDateTime` type", function() {
    beforeEach(inject(function($rootScope, $compile, $timeout) {
      $scope = $rootScope.$new();
      $scope.user = {birthday: "1990-03-01"};

      const template = `\
<input ag-date ng-model="user.birthday"
 name="birthday" />
 date-type="localDateTime"/>\
`;
      element = $compile(template)($scope);
      return $rootScope.$apply();
    })
    );

    return it("displays the current value", () => expect(element.val()).to.eq("03/01/1990"));
  });
}));

