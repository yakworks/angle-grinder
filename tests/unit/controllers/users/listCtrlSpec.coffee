describe "controller: users.ListCtrl", ->
  beforeEach module("angleGrinder")

  # Stub $dialog service
  beforeEach module "ui.bootstrap", ($provide) ->
    $provide.decorator "$dialog", ($delegate) ->
      dialogOpenStub = sinon.stub(open: angular.noop)
      sinon.stub($delegate, "dialog").returns(dialogOpenStub)
      $delegate

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.decorator "singlePageCrudCtrlMixin", -> sinon.spy()

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
      expect(singlePageCrudCtrlMixin.called).to.be.true

    it "is mixed with valid arguments", inject (singlePageCrudCtrlMixin) ->
      expect(singlePageCrudCtrlMixin.calledWith($scope)).to.be.true

      args = singlePageCrudCtrlMixin.getCall(0).args[1]
      expect(args).to.have.property "Resource", "Users"
      expect(args).to.have.property "resourcePath", "/users"

  # TODO replace it with the mixin concept
  describe "#massUpdate", ->
    gridStub = null

    beforeEach ->
      gridStub = sinon.stub(getSelectedRowIds: angular.noop)
      $scope.usersGrid = gridStub

    describe "when no rows are selected", ->
      beforeEach ->
        gridStub.getSelectedRowIds.returns([])

      it "does nothing", inject ($dialog) ->
        # when
        $scope.massUpdate()

        # Then
        expect($dialog.dialog.called).to.be.false

    describe "otherwise", ->

      beforeEach ->
        gridStub.getSelectedRowIds.returns([1, 2, 3])

      it "invokes a dialog", inject ($dialog) ->
        # When
        $scope.massUpdate()

        # Then
        expect($dialog.dialog.called).to.be.true
        expect($dialog.dialog().open.called).to.be.true
