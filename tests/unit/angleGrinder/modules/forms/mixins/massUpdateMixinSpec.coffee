describe "module: angleGrinder.forms mixin: massUpdateMixin", ->

  massUpdateDialog = null

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.decorator "$dialog", ($delegate) ->
      massUpdateDialog = sinon.stub(open: ->)
      sinon.stub($delegate, "dialog").returns massUpdateDialog
      $delegate

  $scope = null
  grid = null

  beforeEach inject ($rootScope, massUpdateMixin) ->
    $scope = $rootScope.$new()

    grid = getSelectedRowIds: sinon.stub()
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
        grid.getSelectedRowIds.returns [1, 2, 3]
        $scope.massUpdate()

      it "gets selected rows", ->
        expect($scope.theGrid.getSelectedRowIds.called).to.be.true

      it "opens the dialog", inject ($dialog) ->
        expect($dialog.dialog.called).to.be.true

        args = $dialog.dialog.getCall(0).args[0]
        expect(args).to.have.property "backdropFade", false
        expect(args).to.have.property "dialogFade", false
        expect(args).to.have.deep.property "resolve.selectedIds"
        expect(args).to.have.deep.property "resolve.grid"

        expect(massUpdateDialog.open.called).to.be.true

      context "when the controller is not specified", ->
        before -> @massUpdateFormCtrl = null

        it "uses the default mass update form controller", ->
          expect(massUpdateDialog.open.calledWith("/path/to/the/form.html", "MassUpdateFormCtrl")).to.be.true

      context "when the controller is specified", ->
        before -> @massUpdateFormCtrl = "OtherCtrl"

        it "uses the custom controller", ->
          expect(massUpdateDialog.open.calledWith("/path/to/the/form.html", "OtherCtrl")).to.be.true

    context "when nothing is selected", ->
      beforeEach ->
        grid.getSelectedRowIds.returns []
        $scope.massUpdate()

      it "gets selected rows", ->
        expect($scope.theGrid.getSelectedRowIds.called).to.be.true

      it "does not open the dialog", inject ($dialog) ->
        expect($dialog.dialog.called).to.be.false

    context "when the grid name is an expression", ->

      $scope = null
      grid = null

      beforeEach inject ($rootScope, massUpdateMixin) ->
        $scope = $rootScope.$new()

        grid = getSelectedRowIds: sinon.stub()
        $scope.grid = customers: grid

        massUpdateMixin $scope,
          gridName: "grid.customers"

      it "does the same trick", ->
        grid.getSelectedRowIds.returns []
        $scope.massUpdate()
        expect(grid.getSelectedRowIds.called).to.be.true
