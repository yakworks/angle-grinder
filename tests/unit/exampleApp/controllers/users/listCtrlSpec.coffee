describe "controller: users.ListCtrl", ->

  beforeEach module "exampleApp"

  # Stub $uibModal service
  beforeEach module "ui.bootstrap", ($provide) ->
    $provide.value "$uibModal", open: sinon.mock()
    return

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.decorator "SinglePageCrudCtrlMixin", -> sinon.spy()
    $provide.decorator "MassUpdateMixin", -> sinon.spy()

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $controller "users.ListCtrl",
      $scope: $scope
      Users: "Users"

  it "assigns gridOptions to the $scope", ->
    expect($scope.gridOptions).to.not.be.undefined

  describe "mixin: `SinglePageCrudCtrlMixin`", ->

    it "is mixed", inject (SinglePageCrudCtrlMixin) ->
      expect(SinglePageCrudCtrlMixin).to.have.been.called

    it "is mixed with valid arguments", inject (SinglePageCrudCtrlMixin) ->
      expect(SinglePageCrudCtrlMixin).to.have.been.calledWith($scope)

      args = SinglePageCrudCtrlMixin.getCall(0).args[1]
      expect(args).to.have.property "Resource", "Users"
      expect(args).to.have.property "resourcePath", "/users"
      expect(args).to.have.property "gridName", "usersGrid"

  describe "mixin: `MassUpdateMixin`", ->

    it "is mixed", inject (MassUpdateMixin) ->
      expect(MassUpdateMixin).to.have.been.called

    it "is mixed with valid arguments", inject (MassUpdateMixin) ->
      expect(MassUpdateMixin).to.have.been.calledWith($scope)

      args = MassUpdateMixin.getCall(0).args[1]
      expect(args).to.have.property "templateUrl", "/templates/users/massUpdateForm.html"
      expect(args).to.have.property "controller", "users.MassUpdateFormCtrl"
      expect(args).to.have.property "gridName", "usersGrid"
