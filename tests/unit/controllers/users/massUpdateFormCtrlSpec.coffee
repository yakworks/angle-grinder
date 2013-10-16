describe "controller: users.MassUpdateFormCtrl", ->

  beforeEach module "angleGrinder", ($provide) ->
    $provide.decorator "massUpdateFormCtrlMixin", -> sinon.spy()

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $controller "users.MassUpdateFormCtrl",
      $scope: $scope
      dialog: null
      selectedIds: []
      grid: null

  it "assigns default value for records", ->
    expect($scope.records).to.not.be.undefined
    expect($scope.records).to.have.property "allowance", 0

  it "mixins `massUpdateFormCtrlMixin`", inject (massUpdateFormCtrlMixin) ->
    expect(massUpdateFormCtrlMixin.called).to.be.true
