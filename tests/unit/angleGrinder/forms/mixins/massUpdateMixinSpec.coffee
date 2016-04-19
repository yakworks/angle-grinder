describe "module: angleGrinder.forms mixin: MassUpdateMixin", ->

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.value "$uibModal", open: sinon.mock()
    return

  $scope = null
  grid = null
  massUpdateFormCtrl = null

  beforeEach inject ($rootScope, MassUpdateMixin) ->
    $scope = $rootScope.$new()

    grid = getSelectedRowIds: sinon.stub()
    $scope.theGrid = grid

    MassUpdateMixin $scope,
      gridName: "theGrid"
      controller: massUpdateFormCtrl
      templateUrl: "/path/to/the/form.html"
      extraParams: foo: "bar"

  context "when the grid is not defined", ->

    it "throws an error", inject (MassUpdateMixin) ->
      expect(MassUpdateMixin(gridName: "other")).to.throw "the grid is not defined"

  describe "#massUpdate", ->

    it "is mixed to the $scope", ->
      expect($scope.massUpdate).to.be.a "function"

    context "when some rows are selected", ->
      beforeEach ->
        grid.getSelectedRowIds.returns [1, 2, 3]
        $scope.massUpdate()

      it "gets selected rows", ->
        expect($scope.theGrid.getSelectedRowIds).to.have.been.called

      it "opens the dialog", inject ($uibModal) ->
        expect($uibModal.open).to.have.been.called

        args = $uibModal.open.getCall(0).args[0]
        expect(args).to.have.deep.property "resolve.selectedIds"
        expect(args).to.have.deep.property "resolve.grid"
        expect(args).to.have.deep.property "resolve.extraParams"

        expect(args.resolve.extraParams()).to.have.property "foo", "bar"

      context "when the controller is not specified", ->
        before -> massUpdateFormCtrl = null

        it "uses the default mass update form controller", inject ($uibModal) ->
          options = $uibModal.open.getCall(0).args[0]

          expect(options).to.have.property "templateUrl", "/path/to/the/form.html"
          expect(options).to.have.property "controller", "MassUpdateFormCtrl"

      context "when the controller is specified", ->
        before -> massUpdateFormCtrl = "OtherCtrl"

        it "uses the custom controller", inject ($uibModal) ->
          options = $uibModal.open.getCall(0).args[0]

          expect(options).to.have.property "templateUrl", "/path/to/the/form.html"
          expect(options).to.have.property "controller", "OtherCtrl"

    context "when nothing is selected", ->
      beforeEach ->
        grid.getSelectedRowIds.returns []
        $scope.massUpdate()

      it "gets selected rows", ->
        expect($scope.theGrid.getSelectedRowIds).to.have.been.called

      it "does not open the dialog", inject ($uibModal) ->
        expect($uibModal.open).to.not.have.been.called

    context "when the grid name is an expression", ->

      $scope = null
      grid = null

      beforeEach inject ($rootScope, MassUpdateMixin) ->
        $scope = $rootScope.$new()

        grid = getSelectedRowIds: sinon.stub()
        $scope.grid = customers: grid

        MassUpdateMixin $scope,
          gridName: "grid.customers"

      it "does the same trick", ->
        grid.getSelectedRowIds.returns []
        $scope.massUpdate()
        expect(grid.getSelectedRowIds).to.have.been.called
