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
      user = id: 123, name: "Test User"

      beforeEach inject ($httpBackend, editDialog) ->
        $httpBackend.whenGET("/api/users/#{user.id}").respond(user)
        spyOn(editDialog, "open")

      it "opens a dialog for editing the item", inject ($httpBackend, editDialog) ->
        # When
        $scope.editItem(user.id)
        $httpBackend.flush()

        # Then
        expect(editDialog.open).toHaveBeenCalled()

        args = editDialog.open.mostRecentCall.args
        expect(args[0]).toEqual "templates/partials/userForm.html"
        expect(args[1].id).toEqual user.id

    describe "#createItem", ->
      beforeEach inject (editDialog) ->
        spyOn(editDialog, "open")

      it "opens a dialog for editing the item", inject (editDialog) ->
        # When
        $scope.createItem()

        # Then
        expect(editDialog.open).toHaveBeenCalled()

        args = editDialog.open.mostRecentCall.args
        expect(args[0]).toEqual "templates/partials/userForm.html"

    describe "#deleteItem", ->
      user = id: 234

      it "opens the confirmation dialog", inject (confirmationDialog) ->
        spyOn(confirmationDialog, "open").andCallThrough()
        $scope.deleteItem(user.id)
        expect(confirmationDialog.open).toHaveBeenCalled()

      describe "when the dialog was confirmed", ->
        beforeEach inject (confirmationDialog, $httpBackend) ->
          spyOn(confirmationDialog, "open").andReturn
            then: (fn) -> fn(true)

          $httpBackend.expectDELETE("/api/users/#{user.id}").respond({})

        it "deleates the user", inject ($httpBackend) ->
          $scope.deleteItem(user.id)
          $httpBackend.flush()
