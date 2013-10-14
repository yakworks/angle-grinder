describe "controller: usersDialog.ListCtrl", ->
  beforeEach module("angleGrinder")

  $scope = null
  usersGridStub = null

  beforeEach inject ($rootScope, $controller) ->
    usersGridStub = sinon.stub(removeRow: angular.noop)
    $scope = $rootScope.$new()
    $scope.usersGrid = usersGridStub

    $controller "usersDialog.ListCtrl",
      $scope: $scope

  describe "$scope", ->
    it "assigns gridOptions", ->
      expect($scope.gridOptions).to.not.be.undefined

      expect($scope.gridOptions.colModel.length).to.equal 6
      expect($scope.gridOptions.colModel[0].name).to.equal "id"
      expect($scope.gridOptions.colModel[1].name).to.equal "login"
      expect($scope.gridOptions.colModel[2].name).to.equal "name"
      expect($scope.gridOptions.colModel[3].name).to.equal "allowance"
      expect($scope.gridOptions.colModel[4].name).to.equal "birthday"
      expect($scope.gridOptions.colModel[5].name).to.equal "paid"

    describe "#editItem", ->
      resourceStub = null
      dialogSpy = null

      beforeEach inject (Users, editDialog) ->
        resourceStub = sinon.stub(Users, "get").returns($promise: {})
        dialogSpy = sinon.spy(editDialog, "open")

        $scope.editItem(123)

      it "loads a resource", ->
        expect(resourceStub.called).to.be.true
        expect(resourceStub.calledWith(id: 123)).to.be.true

      it "opens a dialog for editing loaded resource", ->
        expect(dialogSpy.called).to.be.true
        expect(dialogSpy.calledWith("templates/usersDialog/form.html", {})).to.be.true

    describe "#createItem", ->
      dialogSpy = null

      beforeEach inject (editDialog) ->
        dialogSpy = sinon.spy(editDialog, "open")

        $scope.createItem()

      it "opens a dialog for editing an item", ->
        expect(dialogSpy.called).to.be.true
        expect(dialogSpy.calledWith("templates/usersDialog/form.html")).to.be.true

    describe "#deleteItem", ->
      user = null
      beforeEach -> user = id: 123

      it "opens the confirmation dialog", inject (confirmationDialog) ->
        # Given
        spy = sinon.spy(confirmationDialog, "open")

        # When
        $scope.deleteItem(123)

        # Then
        expect(spy.called).to.be.true

      describe "when the dialog was confirmed", ->
        beforeEach inject (confirmationDialog, $httpBackend) ->
          sinon.stub(confirmationDialog, "open").returns(then: (fn) -> fn(true))
          $httpBackend.expectDELETE("/api/users/#{user.id}").respond(id: 123)

        it "deleates the user", inject ($httpBackend) ->
          $scope.deleteItem(123)
          $httpBackend.flush()

        it "removes a row from the grid", inject ($httpBackend) ->
          $scope.deleteItem(123)
          $httpBackend.flush()

          expect(usersGridStub.removeRow.called).to.be.true
          expect(usersGridStub.removeRow.calledWith(123)).to.be.true
