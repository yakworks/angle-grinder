import agCommon from '~/scripts/common'

describe("menuItemSpec", function() {

  beforeEach(angular.mock.module(agCommon));

  return describe("controller: agMenuCtrl", function() {

    let ctrl = null;

    beforeEach(inject(function($controller, $rootScope) {
      const $scope = $rootScope.$new();

      return ctrl = $controller("agMenuCtrl",
        {$scope});
    })
    );

    it("has `status`", () => expect(ctrl.status).to.be.an("object"));

    return it("changes `status` on route change", inject(function($rootScope) {
      $rootScope.$broadcast("$routeChangeSuccess", {section: "arTran"});
      $rootScope.$digest();

      return expect(ctrl.status).to.have.property("arTran", true);
    })
    );
  });
});
