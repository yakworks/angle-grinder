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
      locationStub = null
      recordSpy = null

      beforeEach inject ($location) ->
        fakeUser = delete: (options) -> options.success()
        recordSpy = sinon.spy(fakeUser, "delete")
        locationStub = sinon.stub($location, "path")

        $scope.delete(fakeUser)

      it "deletes a record", ->
        expect(recordSpy.called).toBeTruthy()

      it "redirects to the users list page", inject ($location) ->
        expect(locationStub.called).toBeTruthy()
        expect(locationStub.calledWith("/users")).toBeTruthy()
