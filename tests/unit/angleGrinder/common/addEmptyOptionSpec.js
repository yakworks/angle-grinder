import agCommon from '~/scripts/common'

describe("module:ag.common directive: addEmptyOption", function() {

  let element = null;
  let scope = null;

  beforeEach(angular.mock.module(agCommon))

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


