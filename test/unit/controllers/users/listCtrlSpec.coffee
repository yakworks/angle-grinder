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
          expect($dialog.dialog.called).toBeFalsy()

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
          expect($dialog.dialog.called).toBeTruthy()
          expect(dialogStub.open.called).toBeTruthy()
