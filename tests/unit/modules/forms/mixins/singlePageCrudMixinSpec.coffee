describe "module: angleGrinder.forms mixin: singlePageCrudCtrlMixin", ->

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.decorator "dialogCrudCtrlMixin", -> sinon.stub()

    $provide.decorator "$location", ($delegate) ->
      sinon.stub($delegate, "path")
      $delegate

  $scope = null

  beforeEach inject ($rootScope, singlePageCrudCtrlMixin) ->
    $scope = $rootScope.$new()

    # initialize the mixin
    singlePageCrudCtrlMixin $scope,
      Resource: "Users"
      resourcePath: "/path_to_the_resource"
      gridName: "usersGrid"

  describe "mixin: `dialogCrudCtrlMixin`", ->

    it "is mixed", inject (dialogCrudCtrlMixin) ->
      expect(dialogCrudCtrlMixin.called).to.be.true

    it "is mixed with valid arguments", inject (dialogCrudCtrlMixin) ->
      expect(dialogCrudCtrlMixin.calledWith($scope)).to.be.true

      args = dialogCrudCtrlMixin.getCall(0).args[1]
      expect(args).to.have.property "Resource", "Users"
      expect(args).to.have.property "gridName", "usersGrid"

  describe "#showItem", ->

    it "is mixed to the $scope", ->
      expect($scope.showItem).to.be.a "function"

    it "navigates to the show record page", inject ($location) ->
      $scope.showItem(123)

      expect($location.path.called).to.be.true
      expect($location.path.calledWith("/path_to_the_resource/123")).to.be.true

  describe "#editItem", ->

    it "is mixed to the $scope", ->
      expect($scope.editItem).to.be.a "function"

    it "navigates to the edit record page", inject ($location) ->
      $scope.editItem(456)

      expect($location.path.called).to.be.true
      expect($location.path.calledWith("/path_to_the_resource/456/edit")).to.be.true
