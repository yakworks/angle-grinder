/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module:angleGrinder.common directive: ieSelectFix", function() {

  let element = null;
  let scope = null;

  beforeEach(module("angleGrinder.common", function($provide) {
    $provide.value("$window", {
      location: {},
      navigator: {userAgent: "test MSIE 10.0 test"}
    });
  })
  );


  beforeEach(inject(function($rootScope, $compile) {
    element = angular.element('<select ie-select-fix><option value="test">Test</option></select>');
    scope = $rootScope;
    $compile(element)(scope);
    return scope.$digest();
  })
  );

  return it("if user agent not IE9 nothing changed", function() {
    element.trigger("change");
    const option = element.find("option");
    return expect(option[0].value).eq("test");
  });
});



