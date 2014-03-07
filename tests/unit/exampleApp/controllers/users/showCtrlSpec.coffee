describe "controller: users.ShowCtrl", ->

  # stub `$location` service
  beforeEach module "ng", ($provide) ->
    $provide.value "$location", path: sinon.stub()
    return

  beforeEach module "exampleApp"

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $controller "users.ShowCtrl",
      $scope: $scope
      user: id: 456, email: "test@email.com"

  it "assigns an user record to the scope", ->
    expect($scope.user).to.not.be.undefined
    expect($scope.user).to.have.property "id", 456
    expect($scope.user).to.have.property "email", "test@email.com"

  describe "#delete", ->
    deferred = null
    user = null

    beforeEach inject ($q) ->
      deferred = $q.defer()
      user = delete: sinon.stub().returns($promise: deferred.promise)

      $scope.delete(user)

    it "deletes a record", ->
      expect(user.delete).to.have.been.called

    describe "on success", ->
      beforeEach -> $scope.$apply -> deferred.resolve(true)

      it "redirects to the users list page", inject ($location) ->
        expect($location.path).to.have.been.called
        expect($location.path).to.have.been.calledWith("/examples/users")
