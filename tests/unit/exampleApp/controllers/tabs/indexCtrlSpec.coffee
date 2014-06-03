describe "controller: tabs.IndexCtrl", ->
  beforeEach module "exampleApp"

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $controller "tabs.IndexCtrl",
      $scope: $scope

  describe "#save", ->

    context "when the form is valid", ->

      it "saves the dummy form", inject ($log) ->
        sinon.spy($log, "debug")
        $scope.save($invalid: false)
        expect($log.debug).to.have.been.called

    context "when the form is not valid", ->

      it "does nothing", inject ($log) ->
        sinon.spy($log, "debug")
        $scope.save($invalid: true)
        expect($log.debug).to.not.have.been.called
