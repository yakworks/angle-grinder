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

    describe "on success", ->
      user = null

      beforeEach inject ($q) ->
        deferred = $q.defer()
        deferred.resolve({ id: 123 })

        user = save: sinon.stub().returns({ $promise: deferred.promise })

        $scope.save(user)
        $scope.$digest()

      it "saves a record", ->
        expect(user.save).to.have.been.called

      it "redirects to the show page", inject ($location) ->
        expect($location.path).to.have.been.called
        expect($location.path).to.have.been.calledWith("/examples/users/123")

  describe "#delete", ->

    it "is defined", ->
      expect($scope.delete).to.not.be.undefined
