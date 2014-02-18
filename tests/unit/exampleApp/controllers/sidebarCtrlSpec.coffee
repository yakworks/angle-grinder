describe "controller: SidebarCtrl", ->

  beforeEach module "exampleApp", ($provide) ->
    $provide.value "scrollTo", sinon.stub()

    $provide.service "$location", ->
      path = ""

      setPath: (_path_) -> path = _path_
      path: -> path

    return

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    $controller "SidebarCtrl",
      $scope: $scope

  describe "#section", ->

    it "returns a valid section name", inject ($location) ->
      expect($scope.section()).to.eq "angleGrinder"

      $location.setPath("/foo/bar")
      expect($scope.section()).to.eq "angleGrinder"

      $location.setPath("/documentation/api")
      expect($scope.section()).to.eq "documentation"

      $location.setPath("/examples")
      expect($scope.section()).to.eq "examples"

  describe "on `$routeChangeSuccess` event", ->

    it "scrolls to the given section", inject ($routeParams, $rootScope, scrollTo) ->
      # Given
      $routeParams.scrollTo = "fooBar"

      # When
      $rootScope.$emit "$routeChangeSuccess"
      $rootScope.$apply()

      # Then
      expect(scrollTo.called).to.be.true
      expect(scrollTo.getCall(0).args[0]).to.eq "fooBar"
