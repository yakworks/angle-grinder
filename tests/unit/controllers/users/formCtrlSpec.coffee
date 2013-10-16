describe "controller: users.FormCtrl", ->
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

  describe "#save", ->
    # Mark the form as valid
    beforeEach -> $scope.editForm = $valid: true

    describe "on success", ->
      recordSpy = null
      locationStub = null

      beforeEach inject ($location) ->
        fakeUser = id: 123, save: (options) -> options.success(id: 123)
        recordSpy = sinon.spy(fakeUser, "save")
        locationStub = sinon.stub($location, "path")

        $scope.save(fakeUser)

      it "saves a record", ->
        expect(recordSpy.called).to.be.true

      it "redirects to the show page", ->
        expect(locationStub.called).to.be.true
        expect(locationStub.calledWith("/users/123")).to.be.true

    describe "onError", ->
      recordSpy = null

      beforeEach ->
        fakeUser =
          id: 234
          resourceName: -> "user"
          save: (options) ->
            options.error(status: 422, data: errors: user: login: "has to be unique")

        recordSpy = sinon.spy(fakeUser, "save")

        $scope.save(fakeUser)

      it "tries to save a record", ->
        expect(recordSpy.called).to.be.true

      it "sets server side validation errors", ->
        expect($scope.editForm.$serverError.login).to.equal "has to be unique"

  describe "#delete", ->

    it "is defined", ->
      expect($scope.delete).to.not.be.undefined
