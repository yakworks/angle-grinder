describe "controller: users.ShowCtrl", ->
  beforeEach module("angleGrinder")

  $scope = null

  beforeEach inject ($rootScope, $routeParams) ->
    $scope = $rootScope.$new()
    $routeParams.id = 456

  describe "when an user can be found", ->
    beforeEach inject ($controller, Users) ->
      spyOn(Users, "get").andCallFake (params, onSuccess, onError) ->
        onSuccess id: params.id, email: "test@user.com"

      $controller "users.ShowCtrl", $scope: $scope

    it "loads the user record", inject (Users) ->
      expect(Users.get.mostRecentCall.args[0]).toEqual id: 456

    it "assings user record to the scope", ->
      expect($scope.user).toBeDefined()
      expect($scope.user.id).toEqual 456
      expect($scope.user.email).toEqual "test@user.com"

  describe "when an user cannot be found", ->
    beforeEach inject ($controller, Users, $location) ->
      spyOn(Users, "get").andCallFake (params, onSuccess, onError) ->
        onError()

      spyOn($location, "path").andCallThrough()

      $controller "users.ShowCtrl", $scope: $scope

    it "redirect to the show page", inject ($location) ->
      expect($location.path).toHaveBeenCalledWith("/users")
