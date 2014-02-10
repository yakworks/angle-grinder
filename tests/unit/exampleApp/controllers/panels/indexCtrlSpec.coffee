describe "controller: panels.IndexCtrl", ->
  beforeEach module "exampleApp"

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()

    $controller "panels.IndexCtrl",
      $scope: $scope

  it "is defined", ->
    expect($scope.title).to.eq "Panels"
