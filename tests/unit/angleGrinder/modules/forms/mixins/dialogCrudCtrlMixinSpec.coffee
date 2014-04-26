describe "module: angleGrinder.forms mixin: dialogCrudCtrlMixin", ->

  beforeEach module "exampleApp.resources"

  beforeEach module "angleGrinder.forms", ($provide) ->
    # stub `formDialog` service
    $provide.decorator "formDialog", ($delegate) ->
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

    grid = removeRow: sinon.stub()
    $scope.grid = transactions: grid

    # initialize the mixin
    dialogCrudCtrlMixin $scope,
      Resource: Users
      gridName: "grid.transactions"
      templateUrl: "/foo/bar/form.html"
      beforeEdit: @beforeEdit
      beforeCreate: @beforeCreate

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

    it "opens a dialog for editiging the loaded resource", inject (formDialog) ->
      expect(formDialog.open).to.have.been.called

      args = formDialog.open.getCall(0).args
      expect(args[0]).to.be.equal "/foo/bar/form.html"
      expect(args[1]).to.have.property "id", 123

    context "when the `beforeEdit` callback is given", ->
      before ->
        @beforeEdit = (record) ->
          record.someValue = "foo bar"
          record

      it "uses it to pre-process the loaded record", inject (formDialog) ->
        args = formDialog.open.getCall(0).args
        expect(args[1]).to.have.property "id", 123
        expect(args[1]).to.have.property "someValue", "foo bar"

  describe "#createItem", ->
    beforeEach -> $scope.createItem()

    it "is mixed to the $scope", ->
      expect($scope.createItem).to.be.a "function"

    it "opens a dialog for creating a resource", inject (formDialog) ->
      expect(formDialog.open).to.have.been.called
      expect(formDialog.open).to.have.been.calledWith("/foo/bar/form.html")

    context "when the `beforeCreate` callback is given", ->
      before ->
        @beforeCreate = (record) ->
          record.orderId = 66
          record

      it "uses it to pre-process the record before create", inject (formDialog) ->
        args = formDialog.open.getCall(0).args
        expect(args[1]).to.have.property "orderId", 66

  describe "#deleteItem", ->

    it "is mixed to the $scope", ->
      expect($scope.deleteItem).to.be.a "function"

    it "opens the confirmation dialog", inject (confirmationDialog) ->
      $scope.deleteItem(456)
      expect(confirmationDialog.open).to.have.been.called

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
        expect($scope.grid.transactions.removeRow).to.have.been.called
        expect($scope.grid.transactions.removeRow).to.have.been.calledWith(456)

    context "when the dialog wasn't confirmed", ->
      beforeEach inject (confirmationDialog) ->
        confirmationDialog.confirmed = false
        $scope.deleteItem(456)

      it "does not remove a row from the grid", ->
        expect($scope.grid.transactions.removeRow).to.not.have.been.called
