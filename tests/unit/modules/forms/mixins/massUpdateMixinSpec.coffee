describe "module: angleGrinder.forms mixin: massUpdateMixin", ->

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.decorator "$modal", ($delegate) ->
      modualInstance = sinon.stub()
      sinon.stub($delegate, "open").returns modualInstance
      $delegate

  $scope = null
  grid = null

  beforeEach inject ($rootScope, massUpdateMixin) ->
    $scope = $rootScope.$new()

    grid = getSelectedRowIds: angular.noop
    $scope.theGrid = grid

    massUpdateMixin $scope,
      gridName: "theGrid"
      controller: @massUpdateFormCtrl
      templateUrl: "/path/to/the/form.html"

  context "when the grid is not defined", ->

    it "throws an error", inject (massUpdateMixin) ->
      expect(massUpdateMixin(gridName: "other")).to.throw "the grid is not defined"

  describe "#massUpdate", ->

    it "is mixed to the $scope", ->
      expect($scope.massUpdate).to.be.a "function"

    context "when some rows are selected", ->
      beforeEach ->
        sinon.stub(grid, "getSelectedRowIds").returns [1, 2, 3]
        $scope.massUpdate()

      it "gets selected rows", ->
        expect(grid.getSelectedRowIds.called).to.be.true

      it "opens the dialog", inject ($modal) ->
        expect($modal.open.called).to.be.true

        args = $modal.open.getCall(0).args[0]
        expect(args).to.have.deep.property "resolve.selectedIds"
        expect(args).to.have.deep.property "resolve.grid"

      context "when the controller is not specified", ->
        before -> @massUpdateFormCtrl = null

        it "uses the default mass update form controller", inject ($modal) ->
          expect($modal.open.called).to.be.true

          args = $modal.open.getCall(0).args[0]
          expect(args).to.have.property "templateUrl", "/path/to/the/form.html"
          expect(args).to.have.property "controller", "MassUpdateFormCtrl"

      context "when the controller is specified", ->
        before -> @massUpdateFormCtrl = "OtherCtrl"

        it "uses the custom controller", inject ($modal) ->
          expect($modal.open.called).to.be.true

          args = $modal.open.getCall(0).args[0]
          expect(args).to.have.property "templateUrl", "/path/to/the/form.html"
          expect(args).to.have.property "controller", "OtherCtrl"

    context "when nothing is selected", ->
      beforeEach ->
        sinon.stub(grid, "getSelectedRowIds").returns []
        $scope.massUpdate()

      it "gets selected rows", ->
        expect(grid.getSelectedRowIds.called).to.be.true

      it "does not open the dialog", inject ($modal) ->
        expect($modal.open.called).to.be.false
