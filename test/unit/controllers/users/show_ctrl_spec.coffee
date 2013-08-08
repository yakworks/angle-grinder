describe "controller: users.ShowCtrl", ->
  beforeEach module("angleGrinder")

  $scope = null

  beforeEach inject ($rootScope, $controller, $routeParams, Users) ->
    $routeParams.id = 456
    spyOn(Users, "get").andReturn id: 456, email: "test@user.com"

    $scope = $rootScope.$new()
    $controller "users.ShowCtrl",
      $scope: $scope

  it "loads the user record", inject (Users) ->
    expect(Users.get).toHaveBeenCalledWith(id: 456)

  it "assings user record to the scope", ->
    expect($scope.user).toBeDefined()
    expect($scope.user.id).toEqual 456
    expect($scope.user.email).toEqual "test@user.com"
