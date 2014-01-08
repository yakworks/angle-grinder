describe "controller: panels.IndexCtrl", ->
  beforeEach module("angleGrinder.examples")

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $controller "panels.IndexCtrl",
      $scope: $scope

  it "is defined", ->
    expect($scope.title).to.eq "Panels"
