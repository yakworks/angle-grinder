describe "module: angleGrinder.forms mixin: DialogCrudCtrlMixin", ->

  beforeEach module "exampleApp.resources"

  beforeEach module "angleGrinder.forms", ($provide) ->
    # stub `FormDialogServ` service
    $provide.decorator "FormDialogServ", ($delegate) ->
      sinon.stub($delegate, "open")
      $delegate

    # stub `ConfirmationDialogServ` service
    $provide.decorator "ConfirmationDialogServ", ($delegate) ->
      $delegate.confirmed = true
      sinon.stub($delegate, "open").returns then:
        (callback) -> callback($delegate.confirmed)

      $delegate

  $scope = null
  grid = null

  beforeEdit = null
  beforeCreate = null

  beforeEach inject ($rootScope, resourceBuilder, DialogCrudCtrlMixin, $document) ->
    body = sinon.stub()
    body.withArgs("resource-path").returns("/users")
    body.withArgs("resource-name").returns "users"
    sinon.stub($document, "find").withArgs("body").returns
      data: body
    $scope = $rootScope.$new()
    UsersTest = resourceBuilder("/api/users")

    grid = removeRow: sinon.stub()
    $scope.grid = transactions: grid

    # initialize the mixin
    DialogCrudCtrlMixin $scope,
      Resource: UsersTest
      gridName: "grid.transactions"
      templateUrl: "/foo/bar/form.html"
      beforeEdit: beforeEdit
      beforeCreate: beforeCreate

  describe "#editRecord", ->

    beforeEach inject ($httpBackend) ->
      $httpBackend.expectGET("/api/users/get/123").respond id: 123, name: "the user"
      $scope.editRecord(123)
      $httpBackend.flush()

    it "is mixed to the $scope", ->
      expect($scope.editRecord).to.be.a "function"

    it "loads a resource", inject ($httpBackend) ->
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()

    it "opens a dialog for editing the loaded resource", inject (FormDialogServ) ->
      expect(FormDialogServ.open).to.have.been.called

      args = FormDialogServ.open.getCall(0).args
      expect(args[0]).to.be.equal "/foo/bar/form.html"

      options = args[1]
      expect(options).to.have.property "record"
      expect(options).to.have.property "grid"
      expect(options.record).to.have.property "id", 123

    context "when the `beforeEdit` callback is given", ->
      before ->
        beforeEdit = (record) ->
          record.someValue = "foo bar"
          return record

      it "uses it to pre-process the loaded record", inject (FormDialogServ) ->
        args = FormDialogServ.open.getCall(0).args

        options = args[1]
        expect(options.record).to.have.property "id", 123
        expect(options.record).to.have.property "someValue", "foo bar"

  describe "#createRecord", ->
    beforeEach -> $scope.createRecord()

    it "is mixed to the $scope", ->
      expect($scope.createRecord).to.be.a "function"

    it "opens a dialog for creating a resource", inject (FormDialogServ) ->
      expect(FormDialogServ.open).to.have.been.called
      expect(FormDialogServ.open).to.have.been.calledWith("/foo/bar/form.html")

    context "when the `beforeCreate` callback is given", ->
      before ->
        beforeCreate = (record) ->
          record.orderId = 66
          return record

      it "uses it to pre-process the record before create", inject (FormDialogServ) ->
        record = FormDialogServ.open.getCall(0).args[1].record
        expect(record).to.have.property "orderId", 66

  describe "#deleteRecord", ->

    it "is mixed to the $scope", ->
      expect($scope.deleteRecord).to.be.a "function"

    it "opens the confirmation dialog", inject (ConfirmationDialogServ) ->
      $scope.deleteRecord(456)
      expect(ConfirmationDialogServ.open).to.have.been.called

    context "when the dialog was confirmed", ->
      beforeEach inject (ConfirmationDialogServ, $httpBackend) ->
        ConfirmationDialogServ.confirmed = true

        $httpBackend.expectPOST("/api/users/delete/456").respond id: 456
        $scope.deleteRecord(456)
        $httpBackend.flush()

      it "deletes a resource", inject ($httpBackend) ->
        $httpBackend.verifyNoOutstandingExpectation()
        $httpBackend.verifyNoOutstandingRequest()

      it "removes a row from the grid", ->
        expect($scope.grid.transactions.removeRow).to.have.been.called
        expect($scope.grid.transactions.removeRow).to.have.been.calledWith(456)

    context "when the dialog wasn't confirmed", ->
      beforeEach inject (ConfirmationDialogServ) ->
        ConfirmationDialogServ.confirmed = false
        $scope.deleteRecord(456)

      it "does not remove a row from the grid", ->
        expect($scope.grid.transactions.removeRow).to.not.have.been.called
