describe "module: angleGrinder.forms mixin: dialogCrudCtrlMixin", ->

  beforeEach module "angleGrinder.resources"

  beforeEach module "angleGrinder.forms", ($provide) ->
    # stub `editDialog` service
    $provide.decorator "editDialog", ($delegate) ->
      sinon.stub($delegate, "open")
      $delegate

    # stub `confirmationDialog` service
    $provide.decorator "confirmationDialog", ($delegate) ->
      $delegate.confirmed = true
      sinon.stub($delegate, "open").returns then:
        (callback) -> callback($delegate.confirmed)

      $delegate

  $scope = null
  grid = null

  beforeEach inject ($rootScope, Users, dialogCrudCtrlMixin) ->
    $scope = $rootScope.$new()

    grid = removeRow: ->
    sinon.stub(grid, "removeRow")
    $scope.theGrid = grid

    # initialize the mixin
    dialogCrudCtrlMixin $scope,
      Resource: Users
      gridName: "theGrid"
      templateUrl: "/foo/bar/form.html"

  describe "#editItem", ->
    beforeEach inject ($httpBackend) ->
      $httpBackend.expectGET("/api/users/123").respond id: 123, name: "the user"
      $scope.editItem(123)
      $httpBackend.flush()

    it "is mixed to the $scope", ->
      expect($scope.editItem).to.be.a "function"

    it "loads a resource", inject ($httpBackend) ->
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()

    it "opens a dialog for editiging leaded resource", inject (editDialog) ->
      expect(editDialog.open.called).to.be.true

      args = editDialog.open.getCall(0).args
      expect(args[0]).to.be.equal "/foo/bar/form.html"
      expect(args[1]).to.have.property "id", 123

  describe "#createItem", ->
    beforeEach -> $scope.createItem()

    it "is mixed to the $scope", ->
      expect($scope.createItem).to.be.a "function"

    it "opens a dialog for creating a resource", inject (editDialog) ->
      expect(editDialog.open.called).to.be.true
      expect(editDialog.open.calledWith("/foo/bar/form.html")).to.be.true

  describe "#deleteItem", ->

    it "is mixed to the $scope", ->
      expect($scope.deleteItem).to.be.a "function"

    it "opens the confirmation dialog", inject (confirmationDialog) ->
      $scope.deleteItem(456)
      expect(confirmationDialog.open.called).to.be.true

    context "when the dialog was confirmed", ->
      beforeEach inject (confirmationDialog, $httpBackend) ->
        confirmationDialog.confirmed = true

        $httpBackend.expectDELETE("/api/users/456").respond id: 456
        $scope.deleteItem(456)
        $httpBackend.flush()

      it "deletes a resource", inject ($httpBackend) ->
        $httpBackend.verifyNoOutstandingExpectation()
        $httpBackend.verifyNoOutstandingRequest()

      it "removes a row from the grid", ->
        expect(grid.removeRow.called).to.be.true
        expect(grid.removeRow.calledWith(456)).to.be.true

    context "when the dialog wasn't confirmed", ->
      beforeEach inject (confirmationDialog) ->
        confirmationDialog.confirmed = false
        $scope.deleteItem(456)

      it "does not remove a row from the grid", ->
        expect(grid.removeRow.called).to.be.false
