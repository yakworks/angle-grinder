describe "controller: users.ShowCtrl", ->

  beforeEach module "exampleApp", ($provide) ->
    # stub `$location` service
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

    it "is defined", ->
      expect($scope.delete).to.not.be.undefined

    describe "on success", ->
      user = null

      beforeEach ->
        user = delete: (options) -> options.success()
        sinon.spy(user, "delete")

        $scope.delete(user)

      it "deletes a record", ->
        expect(user.delete).to.have.been.called

      it "redirects to the users list page", inject ($location) ->
        expect($location.path).to.have.been.called
        expect($location.path).to.have.been.calledWith("/examples/users")
