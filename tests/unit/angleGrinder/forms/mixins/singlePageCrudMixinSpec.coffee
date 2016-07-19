describe "module: angleGrinder.forms mixin: SinglePageCrudCtrlMixin", ->

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.decorator "DialogCrudCtrlMixin", -> sinon.stub()

    $provide.decorator "$location", ($delegate) ->
      sinon.stub($delegate, "path")
      $delegate

  $scope = null

  beforeEach inject ($rootScope, SinglePageCrudCtrlMixin) ->
    $scope = $rootScope.$new()

    # initialize the mixin
    SinglePageCrudCtrlMixin $scope,
      Resource: "Users"
      resourcePath: "/path_to_the_resource"
      gridName: "usersGrid"

  describe "mixin: `DialogCrudCtrlMixin`", ->

    it "is mixed", inject (DialogCrudCtrlMixin) ->
      expect(DialogCrudCtrlMixin).to.have.been.called

    it "is mixed with valid arguments", inject (DialogCrudCtrlMixin) ->
      expect(DialogCrudCtrlMixin).to.have.been.calledWith($scope)

      args = DialogCrudCtrlMixin.getCall(0).args[1]
      expect(args).to.have.property "Resource", "Users"
      expect(args).to.have.property "gridName", "usersGrid"

  describe "#showRecord", ->

    it "is mixed to the $scope", ->
      expect($scope.showRecord).to.be.a "function"

    it "navigates to the show record page", inject ($location) ->
      $scope.showRecord(123)

      expect($location.path).to.have.been.called
      expect($location.path).to.have.been.calledWith("/path_to_the_resource/123")

  describe "#editRecord", ->

    it "is mixed to the $scope", ->
      expect($scope.editRecord).to.be.a "function"

    it "navigates to the edit record page", inject ($location) ->
      $scope.editRecord(456)

      expect($location.path).to.have.been.called
      expect($location.path).to.have.been.calledWith("/path_to_the_resource/456/edit")
