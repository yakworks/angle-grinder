describe "module: angleGrinder.common", ->

  beforeEach module "angleGrinder.common"

  describe "controller: agMenuCtrl", ->

    ctrl = null

    beforeEach inject ($controller, $rootScope) ->
      $scope = $rootScope.$new()

      ctrl = $controller "agMenuCtrl",
        $scope: $scope

    it "has `status`", ->
      expect(ctrl.status).to.be.an "object"

    it "changes `status` on route change", inject ($rootScope) ->
      $rootScope.$broadcast "$routeChangeSuccess", section: "arTran"
      $rootScope.$digest()

      expect(ctrl.status).to.have.property "arTran", true