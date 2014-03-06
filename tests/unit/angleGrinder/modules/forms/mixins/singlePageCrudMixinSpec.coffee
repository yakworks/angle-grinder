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
      expect(dialogCrudCtrlMixin).to.have.been.called

    it "is mixed with valid arguments", inject (dialogCrudCtrlMixin) ->
      expect(dialogCrudCtrlMixin).to.have.been.calledWith($scope)

      args = dialogCrudCtrlMixin.getCall(0).args[1]
      expect(args).to.have.property "Resource", "Users"
      expect(args).to.have.property "gridName", "usersGrid"

  describe "#showItem", ->

    it "is mixed to the $scope", ->
      expect($scope.showItem).to.be.a "function"

    it "navigates to the show record page", inject ($location) ->
      $scope.showItem(123)

      expect($location.path).to.have.been.called
      expect($location.path).to.have.been.calledWith("/path_to_the_resource/123")

  describe "#editItem", ->

    it "is mixed to the $scope", ->
      expect($scope.editItem).to.be.a "function"

    it "navigates to the edit record page", inject ($location) ->
      $scope.editItem(456)

      expect($location.path).to.have.been.called
      expect($location.path).to.have.been.calledWith("/path_to_the_resource/456/edit")
