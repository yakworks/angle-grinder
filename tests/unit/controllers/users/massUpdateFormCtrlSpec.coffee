describe "controller: users.MassUpdateFormCtrl", ->

  beforeEach module "angleGrinder", ($provide) ->
    $provide.decorator "massUpdateFormCtrlMixin", -> sinon.spy()

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $controller "users.MassUpdateFormCtrl",
      $scope: $scope
      dialog: "foo"
      Users: "Users"
      selectedIds: "bar"
      grid: "biz"

  it "assigns default value for records", ->
    expect($scope.records).to.not.be.undefined
    expect($scope.records).to.have.property "allowance", 0

  describe "mixin: `massUpdateFormCtrlMixin`", ->

    it "is mixed", inject (massUpdateFormCtrlMixin) ->
      expect(massUpdateFormCtrlMixin.called).to.be.true

    it "is mixed with valid arguments", inject (massUpdateFormCtrlMixin) ->
      expect(massUpdateFormCtrlMixin.calledWith($scope)).to.be.true

      args = massUpdateFormCtrlMixin.getCall(0).args[1]
      expect(args).to.have.property "dialog", "foo"
      expect(args).to.have.property "Resource", "Users"
      expect(args).to.have.property "selectedIds", "bar"
      expect(args).to.have.property "grid", "biz"
