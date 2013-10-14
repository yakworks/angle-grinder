describe "controller: users.ListCtrl", ->
  beforeEach module("angleGrinder")

  # Stub $dialog service
  beforeEach module "ui.bootstrap", ($provide) ->
    $provide.value "$dialog", sinon.stub(dialog: angular.noop)
    return

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $controller "users.ListCtrl",
      $scope: $scope

  describe "$scope", ->
    it "assigns gridOptions", ->
      expect($scope.gridOptions).to.not.be.undefined

    describe "#showItem", ->
      it "navigates to the show user page", inject ($location) ->
        # Given
        spy = sinon.spy($location, "path")

        # When
        $scope.showItem(123)

        # Then
        expect(spy.called).to.be.true
        expect(spy.calledWith("/users/123")).to.be.true

    describe "#editItem", ->
      it "navigates to the edit user page", inject ($location) ->
        # Given
        spy = sinon.spy($location, "path")

        # When
        $scope.editItem(234)

        # Then
        expect(spy.called).to.be.true
        expect(spy.calledWith("/users/234/edit")).to.be.true

    describe "#deleteItem", ->
      it "opens the confirmation dialog", inject (confirmationDialog) ->
        # Given
        stub = sinon.stub(confirmationDialog, "open").returns then: (fn) -> fn(false)

        # When
        $scope.deleteItem(123)

        # Then
        expect(stub.called).to.be.true

      describe "when the dialog was confirmed",->
        beforeEach inject (confirmationDialog, $httpBackend) ->
          # Given
          sinon.stub(confirmationDialog, "open").returns then: (fn) -> fn(true)
          $httpBackend.expectDELETE("/api/users/123").respond(id: 123)
          $scope.usersGrid = sinon.stub(removeRow: angular.noop)

          # When
          $scope.deleteItem(123)
          $httpBackend.flush()

        it "deletes a row", inject ($httpBackend) ->
          $httpBackend.verifyNoOutstandingExpectation()
          $httpBackend.verifyNoOutstandingRequest()

        it "removes a row from the grid", ->
          expect($scope.usersGrid.removeRow.called).to.be.true
          expect($scope.usersGrid.removeRow.calledWith(123)).to.be.true

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
        dialogStub = null

        beforeEach inject ($dialog) ->
          gridStub.getSelectedRowIds.returns([1, 2, 3])
          dialogStub = sinon.stub(open: angular.noop)
          $dialog.dialog.returns(dialogStub)

        it "invokes a dialog", inject ($dialog) ->
          # When
          $scope.massUpdate()

          # Then
          expect($dialog.dialog.called).to.be.true
          expect(dialogStub.open.called).to.be.true
