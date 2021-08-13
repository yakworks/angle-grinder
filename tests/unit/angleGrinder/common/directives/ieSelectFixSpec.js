import agCommon from 'angle-grinder/src/ng/common'

describe("ieSelectFixSpec", function() {

  let element = null;
  let scope = null;

  beforeEach(angular.mock.module(agCommon, function($provide) {
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



