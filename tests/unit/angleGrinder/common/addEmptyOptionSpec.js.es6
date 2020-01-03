/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module:angleGrinder.common directive: addEmptyOption", function() {

  let element = null;
  let scope = null;

  beforeEach(module("angleGrinder.common", function() {}));

  beforeEach(inject(function($rootScope, $compile) {
    element = angular.element('<select add-empty-option><option value="test">Test</option></select>');
    scope = $rootScope;
    $compile(element)(scope);
    return scope.$digest();
  })
  );

  return it("check that empty option is added", function() {
    const options = element.find("option");
    return expect(options[0].value).eq("");
  });
});


