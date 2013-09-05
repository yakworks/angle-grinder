describe "controller: UsersListCtrl", ->
  beforeEach module("angleGrinder")

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    $controller "UsersListCtrl",
      $scope: $scope

  describe "$scope", ->
    it "assigns gridOptions", ->
      expect($scope.gridOptions).toBeDefined()

      expect($scope.gridOptions.colModel.length).toEqual 6
      expect($scope.gridOptions.colModel[0].name).toEqual "id"
      expect($scope.gridOptions.colModel[1].name).toEqual "login"
      expect($scope.gridOptions.colModel[2].name).toEqual "name"
      expect($scope.gridOptions.colModel[3].name).toEqual "allowance"
      expect($scope.gridOptions.colModel[4].name).toEqual "birthday"
      expect($scope.gridOptions.colModel[5].name).toEqual "paid"

    describe "#editItem", ->
      resourceStub = null
      dialogSpy = null

      beforeEach inject (Users, editDialog) ->
        resourceStub = sinon.stub(Users, "get").returns($promise: {})
        dialogSpy = sinon.spy(editDialog, "open")

        $scope.editItem(123)

      it "loads a resource", ->
        expect(resourceStub.called).toBeTruthy()
        expect(resourceStub.calledWith(id: 123)).toBeTruthy()

      it "opens a dialog for editing loaded resource", ->
        expect(dialogSpy.called).toBeTruthy()
        expect(dialogSpy.calledWith("templates/partials/userForm.html", {})).toBeTruthy()

    describe "#createItem", ->
      dialogSpy = null

      beforeEach inject (editDialog) ->
        dialogSpy = sinon.spy(editDialog, "open")

        $scope.createItem()

      it "opens a dialog for editing an item", ->
        expect(dialogSpy.called).toBeTruthy()
        expect(dialogSpy.calledWith("templates/partials/userForm.html")).toBeTruthy()

    describe "#deleteItem", ->
      user = null
      beforeEach -> user = id: 123

      it "opens the confirmation dialog", inject (confirmationDialog) ->
        # Given
        spy = sinon.spy(confirmationDialog, "open")

        # When
        $scope.deleteItem(123)

        # Then
        expect(spy.called).toBeTruthy()

      describe "when the dialog was confirmed", ->
        beforeEach inject (confirmationDialog) ->
          sinon.stub(confirmationDialog, "open").returns(then: (fn) -> fn(true))

        it "deleates the user", inject ($httpBackend) ->
          $httpBackend.expectDELETE("/api/users/#{user.id}").respond({})
          $scope.deleteItem(123)
          $httpBackend.flush()
