/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module:angleGrinder.common directive: addEmptyOption", function() {

  let element = null;
  let scope = null;

  beforeEach(angular.mock.module("angleGrinder.common", function() {}));

  beforeEach(inject(function($rootScope, $compile) {
    element = angular.element('<input ag-number ng-model="test.number">');
    scope = $rootScope;
    scope.test = {};
    $compile(element)(scope);
    return scope.$digest();
  })
  );

  it("set number value", function() {
    angular.element(element).val('123').trigger('input');
    scope.$apply();
    return expect(scope.test.number).eq(123);
  });

  return it("set empty value", function() {
    angular.element(element).val('').trigger('input');
    scope.$apply();
    return expect(scope.test.number).eq(undefined);
  });
});


