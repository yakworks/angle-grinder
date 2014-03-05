describe "controller: users.FormCtrl", ->

  beforeEach module "exampleApp", ($provide) ->
    $provide.value "$location", path: sinon.stub()
    return

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
    form = null
    beforeEach -> form = $valid: true

    describe "on success", ->
      fakeUser = null

      beforeEach ->
        fakeUser = id: 123, save: (options) -> options.success(id: 123)
        sinon.spy(fakeUser, "save")

        $scope.save(form, fakeUser)

      it "saves a record", ->
        expect(fakeUser.save.called).to.be.true

      it "redirects to the show page", inject ($location) ->
        expect($location.path.called).to.be.true
        expect($location.path.calledWith("/examples/users/123")).to.be.true

    describe "onError", ->
      fakeUser = null

      beforeEach ->
        fakeUser =
          id: 234
          resourceName: -> "user"
          save: (options) ->
            options.error(status: 422, data: errors: user: login: "has to be unique")

        sinon.spy(fakeUser, "save")

        $scope.save(form, fakeUser)

      it "tries to save a record", ->
        expect(fakeUser.save.called).to.be.true

      it "sets server side validation errors", ->
        expect(form.$serverError.login).to.equal "has to be unique"

  describe "#delete", ->

    it "is defined", ->
      expect($scope.delete).to.not.be.undefined
