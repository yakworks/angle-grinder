import agCommon from 'angle-grinder/src/ng/common'

describe("embeddedJsonServSpec", function() {

  let element = null;
  let scope = null;

  beforeEach(angular.mock.module(agCommon));

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


