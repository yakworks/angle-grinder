/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module:angleGrinder.common dervice: embeddedJsonServ", function() {

  let element = null;
  let scope = null;

  beforeEach(angular.mock.module("angleGrinder.common", function() {}));

  beforeEach(inject(function($rootScope, $compile) {
    element = angular.element('<script  type="application/embedded-json" name="testJson">{"name": "test", "id":2}</script>');
    angular.element(document.body).append(element);
    scope = $rootScope;
    $compile(element)(scope);
    return scope.$digest();
  })
  );

  return it("check JSON validity", inject(function(EmbeddedJsonServ){
    const json = EmbeddedJsonServ("testJson");
    expect(json.name).to.eq("test");
    return expect(json.id).to.eq(2);
  })
  );
});


