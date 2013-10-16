describe "module: angleGrinder.forms mixin: dialogCrudCtrlMixin", ->

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
  Resource = null
  grid = null

  beforeEach inject ($rootScope, dialogCrudCtrlMixin) ->
    $scope = $rootScope.$new()

    # stub the resource
    Resource = -> # stub for the constructor
    Resource.get = ->
    sinon.stub(Resource, "get").returns $promise: "the resource"
    Resource.delete = ->
    sinon.stub(Resource, "delete").returns $promise:
      then: (onSuccess) -> onSuccess(id: 456)

    grid = removeRow: ->
    sinon.stub(grid, "removeRow")
    $scope.theGrid = grid

    # initialize the mixin
    dialogCrudCtrlMixin $scope,
      Resource: Resource
      gridName: "theGrid"
      templateUrl: "/foo/bar/form.html"

  describe "#editItem", ->
    beforeEach -> $scope.editItem(123)

    it "is mixed to the $scope", ->
      expect($scope.editItem).to.be.a "function"

    it "loads a resource", ->
      expect(Resource.get.called).to.be.true
      expect(Resource.get.calledWith(id: 123)).to.be.true

    it "opens a dialog for editiging leaded resource", inject (editDialog) ->
      expect(editDialog.open.called).to.be.true
      expect(editDialog.open.calledWith("/foo/bar/form.html", "the resource")).to.be.true

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
      beforeEach inject (confirmationDialog) ->
        confirmationDialog.confirmed = true
        $scope.deleteItem(456)

      it "deletes a resource", ->
        expect(Resource.delete.called).to.be.true
        expect(Resource.delete.calledWith(id: 456)).to.be.true

      it "removes a row from the grid", ->
        expect(grid.removeRow.called).to.be.true
        expect(grid.removeRow.calledWith(456)).to.be.true

    context "when the dialog wasn't confirmed", ->
      beforeEach inject (confirmationDialog) ->
        confirmationDialog.confirmed = false
        $scope.deleteItem(456)

      it "does not delete a resource", ->
        expect(Resource.delete.called).to.be.false

      it "does not remove a row from the grid", ->
        expect(grid.removeRow.called).to.be.false
