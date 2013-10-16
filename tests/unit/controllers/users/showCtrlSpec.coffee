describe "controller: users.ShowCtrl", ->
  beforeEach module("angleGrinder")

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    $controller "users.FormCtrl",
      $scope: $scope
      user: id: 456, email: "test@email.com"

  it "assigns an user record to the scope", ->
    expect($scope.user).to.not.be.undefined
    expect($scope.user.id).to.equal 456
    expect($scope.user.email).to.equal "test@email.com"

  describe "#delete", ->
    it "is defined", ->
      expect($scope.delete).to.not.be.undefined

    describe "on success", ->
      locationStub = null
      recordSpy = null

      beforeEach inject ($location) ->
        fakeUser = delete: (options) -> options.success()
        recordSpy = sinon.spy(fakeUser, "delete")
        locationStub = sinon.stub($location, "path")

        $scope.delete(fakeUser)

      it "deletes a record", ->
        expect(recordSpy.called).to.be.true

      it "redirects to the users list page", inject ($location) ->
        expect(locationStub.called).to.be.true
        expect(locationStub.calledWith("/users")).to.be.true
