describe "controller: users.ListCtrl", ->
  beforeEach module("angleGrinder")

  # Stub $modal service
  beforeEach module "ui.bootstrap", ($provide) ->
    $provide.value "$modal", sinon.stub(open: angular.noop)
    return

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $controller "users.ListCtrl",
      $scope: $scope

  describe "$scope", ->
    it "assigns gridOptions", ->
      expect($scope.gridOptions).toBeDefined()

    describe "#showItem", ->
      it "navigates to the show user page", inject ($location) ->
        # Given
        spy = sinon.spy($location, "path")

        # When
        $scope.showItem(123)

        # Then
        expect(spy.called).toBeTruthy()
        expect(spy.calledWith("/users/123")).toBeTruthy()

    describe "#editItem", ->
      it "navigates to the edit user page", inject ($location) ->
        # Given
        spy = sinon.spy($location, "path")

        # When
        $scope.editItem(234)

        # Then
        expect(spy.called).toBeTruthy()
        expect(spy.calledWith("/users/234/edit")).toBeTruthy()

    describe "#deleteItem", ->
      it "opens the confirmation dialog", inject (confirmationDialog) ->
        # Given
        stub = sinon.stub(confirmationDialog, "open").returns then: (fn) -> fn(false)

        # When
        $scope.deleteItem(123)

        # Then
        expect(stub.called).toBeTruthy()

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
          expect($scope.usersGrid.removeRow.called).toBeTruthy()
          expect($scope.usersGrid.removeRow.calledWith(123)).toBeTruthy()

    describe "#massUpdate", ->
      gridStub = null

      beforeEach ->
        gridStub = sinon.stub(getSelectedRowIds: angular.noop)
        $scope.usersGrid = gridStub

      describe "when no rows are selected", ->
        beforeEach ->
          gridStub.getSelectedRowIds.returns([])

        it "does nothing", inject ($modal) ->
          # when
          $scope.massUpdate()

          # Then
          expect($modal.open.called).toBeFalsy()

      describe "otherwise", ->

        beforeEach ->
          gridStub.getSelectedRowIds.returns([1, 2, 3])

        it "invokes a dialog", inject ($modal) ->
          # When
          $scope.massUpdate()

          # Then
          expect($modal.open.called).toBeTruthy()

          args = $modal.open.args[0][0]
          expect(args.templateUrl).toEqual "/templates/users/massUpdateForm.html"
          expect(args.controller).toEqual "users.MassUpdateFormCtrl"
