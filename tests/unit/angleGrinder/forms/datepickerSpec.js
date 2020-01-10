/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.forms", () => describe("directive: agDatepicker", function() {

  beforeEach(angular.mock.module("angleGrinder.forms"));

  let $scope = null;
  let element = null;

  describe("use localDate date type (that is used by default)", function() {
    beforeEach(inject(function($rootScope, $compile) {
      $scope = $rootScope.$new();
      $scope.user = {birthday: "1990-03-01"};

      const template = `\
<ag-datepicker ng-model="user.birthday"
       name="birthday" >
</ag-datepicker>\
`;
      element = $compile(template)($scope);
      return $rootScope.$apply();
    })
    );

    it("displays the current value", () => expect(element.find("input").val()).to.eq("03/01/1990"));

    return it("saves date to model", inject(function($timeout){
      $timeout.flush();
      return expect($scope.user.birthday).to.eq("1990-03-01");
    })
    );
  });

  describe("use `date` date type", function() {
    beforeEach(inject(function($rootScope, $compile) {
      $scope = $rootScope.$new();
      $scope.user = {birthday: "1990-03-01"};

      const template = `\
<ag-datepicker ng-model="user.birthday"
       date-type="date"
       name="birthday" >
</ag-datepicker>\
`;
      element = $compile(template)($scope);
      return $rootScope.$apply();
    })
    );

    it("displays the current value", () => expect(element.find("input").val()).to.eq("03/01/1990"));

    return xit("saves local date time to model", inject(function($timeout){
      $timeout.flush();
      return expect($scope.user.birthday).to.eq("1990-03-01T00:00+00:00");
    })
    );
  });

  return describe("use `localDateTime` type", function() {
    beforeEach(inject(function($rootScope, $compile, $timeout) {
      $scope = $rootScope.$new();
      $scope.user = {birthday: "1990-03-01"};

      const template = `\
<ag-datepicker ng-model="user.birthday"
       date-type="localDateTime"
       name="birthday" >
</ag-datepicker>\
`;
      element = $compile(template)($scope);
      return $rootScope.$apply();
    })
    );

    it("displays the current value", () => expect(element.find("input").val()).to.eq("03/01/1990"));

    return it("saves local date time to model", inject(function($timeout){
      $timeout.flush();
      return expect($scope.user.birthday).to.eq("1990-03-01T00:00");
    })
    );
  });
}));
