describe "controller: usersDialog.ListCtrl", ->

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.decorator "dialogCrudCtrlMixin", -> sinon.spy()
    $provide.decorator "massUpdateMixin", -> sinon.spy()

  beforeEach module "exampleApp"

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $scope.usersGrid = {}

    $controller "usersDialog.ListCtrl",
      $scope: $scope
      Users: "Users"

  describe "$scope", ->
    it "assigns gridOptions", ->
      expect($scope.gridOptions).to.not.be.undefined

      expect($scope.gridOptions.colModel.length).to.equal 7
      expect($scope.gridOptions.colModel[0].name).to.equal "id"
      expect($scope.gridOptions.colModel[1].name).to.equal "login"
      expect($scope.gridOptions.colModel[2].name).to.equal "info.email"
      expect($scope.gridOptions.colModel[3].name).to.equal "name"
      expect($scope.gridOptions.colModel[4].name).to.equal "birthday"
      expect($scope.gridOptions.colModel[5].name).to.equal "creditInfo.allowance"
      expect($scope.gridOptions.colModel[6].name).to.equal "creditInfo.paid"

  describe "mixin: `dialogCrudCtrlMixin`", ->

    it "is mixed", inject (dialogCrudCtrlMixin) ->
      expect(dialogCrudCtrlMixin).to.have.been.called

    it "is mixed with valid arguments", inject (dialogCrudCtrlMixin) ->
      expect(dialogCrudCtrlMixin).to.have.been.calledWith($scope)

      args = dialogCrudCtrlMixin.getCall(0).args[1]
      expect(args).to.have.property "Resource", "Users"
      expect(args).to.have.property "gridName", "usersGrid"
      expect(args).to.have.property "templateUrl", "templates/usersDialog/form.html"

  describe "mixin: `massUpdateMixin`", ->

    it "is mixed", inject (massUpdateMixin) ->
      expect(massUpdateMixin).to.have.been.called

    it "is mixed with valid arguments", inject (massUpdateMixin) ->
      expect(massUpdateMixin).to.have.been.calledWith($scope)

      args = massUpdateMixin.getCall(0).args[1]
      expect(args).to.have.property "templateUrl", "/templates/users/massUpdateForm.html"
      expect(args).to.have.property "controller", "users.MassUpdateFormCtrl"
      expect(args).to.have.property "gridName", "usersGrid"
