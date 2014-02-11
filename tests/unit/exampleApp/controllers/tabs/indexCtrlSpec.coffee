describe "controller: tabs.IndexCtrl", ->
  beforeEach module "exampleApp"

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $controller "tabs.IndexCtrl",
      $scope: $scope

  it "is defined", ->
    expect($scope.title).to.eq "Tabs with lazy loaded templates"

  describe "#isTabActive", ->

    context "when the tab is active", ->
      beforeEach inject ($stateParams) ->
        $stateParams.tab = "foo"

      it "returns true", ->
        expect($scope.isTabActive("foo")).to.be.true

  describe "#save", ->

    context "when the form is valid", ->

      it "saves the dummy form", inject ($log) ->
        spy = sinon.spy($log, "debug")
        $scope.save($invalid: false)
        expect(spy.called).to.be.true

    context "when the form is not valid", ->

      it "does nothing", inject ($log) ->
        spy = sinon.spy($log, "debug")
        $scope.save($invalid: true)
        expect(spy.called).to.be.false
