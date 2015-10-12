describe "controller: users.ListCtrl", ->

  beforeEach module "exampleApp"

  # Stub $uibModal service
  beforeEach module "ui.bootstrap", ($provide) ->
    $provide.value "$uibModal", open: sinon.mock()
    return

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.decorator "singlePageCrudCtrlMixin", -> sinon.spy()
    $provide.decorator "massUpdateMixin", -> sinon.spy()

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $controller "users.ListCtrl",
      $scope: $scope
      Users: "Users"

  it "assigns gridOptions to the $scope", ->
    expect($scope.gridOptions).to.not.be.undefined

  describe "mixin: `singlePageCrudCtrlMixin`", ->

    it "is mixed", inject (singlePageCrudCtrlMixin) ->
      expect(singlePageCrudCtrlMixin).to.have.been.called

    it "is mixed with valid arguments", inject (singlePageCrudCtrlMixin) ->
      expect(singlePageCrudCtrlMixin).to.have.been.calledWith($scope)

      args = singlePageCrudCtrlMixin.getCall(0).args[1]
      expect(args).to.have.property "Resource", "Users"
      expect(args).to.have.property "resourcePath", "/users"
      expect(args).to.have.property "gridName", "usersGrid"

  describe "mixin: `massUpdateMixin`", ->

    it "is mixed", inject (massUpdateMixin) ->
      expect(massUpdateMixin).to.have.been.called

    it "is mixed with valid arguments", inject (massUpdateMixin) ->
      expect(massUpdateMixin).to.have.been.calledWith($scope)

      args = massUpdateMixin.getCall(0).args[1]
      expect(args).to.have.property "templateUrl", "/templates/users/massUpdateForm.html"
      expect(args).to.have.property "controller", "users.MassUpdateFormCtrl"
      expect(args).to.have.property "gridName", "usersGrid"
