describe "controller: users.ShowCtrl", ->
  beforeEach module("angleGrinder")

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    $controller "users.ShowCtrl",
      $scope: $scope
      user: id: 456, email: "test@email.com"

  it "assings an user record to the scope", ->
    expect($scope.user).toBeDefined()
    expect($scope.user.id).toEqual 456
    expect($scope.user.email).toEqual "test@email.com"
