describe "controller: tabs.IndexCtrl", ->
  beforeEach module "exampleApp"

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $controller "tabs.IndexCtrl",
      $scope: $scope

  describe "#save", ->

    it "saves the dummy form", inject ($log) ->
      sinon.spy($log, "debug")
      $scope.save()
      expect($log.debug).to.have.been.called
