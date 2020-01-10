/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.forms", function() {

  beforeEach(angular.mock.module("angleGrinder.forms"));

  let $scope = null;

  beforeEach(inject($rootScope => $scope = $rootScope.$new())
  );

  return describe("directive: maxLines", function() {
    let $injector = null;
    let element = null;
    let form = null;
    let modelCtrl = null;
    let modelValue = null;

    const compileTemplate = function(str) {
      const $compile = $injector.get("$compile");
      element = $compile(str)($scope);
      return $scope.$digest();
    };

    const setProfile = str => $scope.$apply(() => modelCtrl.$setViewValue(str));

    beforeEach(inject(function(_$injector_) {
      $injector = _$injector_;
      compileTemplate(`\
<form name="form">
  <div ag-field-group for="profile">
    <textarea name="profile" ng-model="user.profile" ag-max-lines="3"></textarea>
  </div>
</form>\
`
      );

      ({
        form
      } = $scope);
      modelCtrl = form.profile;
      return modelValue = ($scope.user = {});}));

    describe("when number of lines exceed", function() {
      beforeEach(() => setProfile("line1 \n line2 \n line3 \n line4"));

      it("sets field as invalid", function() {
        expect(modelCtrl.$valid).to.be.false;
        expect(modelCtrl.$error.maxlines).to.be.true;
        return expect(modelValue.profile).to.be.undefined;
      });

      return it("sets form as invalid", function() {
        expect(form.$valid).to.be.false;
        return expect(form.$error.maxlines[0].$name).to.equal("profile");
      });
    });


    describe("when number of lines are less", function() {
      beforeEach(() => setProfile("line1 \n line2"));

      it("marks field as valid", () => expect(modelCtrl.$valid).to.be.true);

      return it("marks form as valid", () => expect(form.$valid).to.be.true);
    });


    return describe("when number of lines are equal", function() {
      beforeEach(() => setProfile("line1 \n line2 \n line3"));

      it("marks field as valid", () => expect(modelCtrl.$valid).to.be.true);

      return it("marks form as valid", () => expect(form.$valid).to.be.true);
    });
  });
});


