describe "controller: users.ShowCtrl", ->
  beforeEach module("angleGrinder")

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    $controller "users.FormCtrl",
      $scope: $scope
      user: id: 456, email: "test@email.com"

  it "assings an user record to the scope", ->
    expect($scope.user).toBeDefined()
    expect($scope.user.id).toEqual 456
    expect($scope.user.email).toEqual "test@email.com"

  describe "#delete", ->
    it "is defined", ->
      expect($scope.delete).toBeDefined()

    describe "on success", ->
      it "redirects to the users list page", inject ($location) ->
        spyOn($location, "path")

        # Given
        userSpy = jasmine.createSpyObj("user", ["delete"])
        userSpy.delete.andCallFake (options) ->
          expect($scope.deleting).toBeTruthy()
          options.success()
          expect($scope.deleting).toBeFalsy()

        # When
        $scope.delete(userSpy)

        # Then
        expect(userSpy.delete).toHaveBeenCalled()
        expect($location.path).toHaveBeenCalledWith("/users")
