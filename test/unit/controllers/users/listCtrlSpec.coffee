describe "controller: users.ListCtrl", ->
  beforeEach module("angleGrinder")

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    $controller "users.ListCtrl",
      $scope: $scope

  describe "$scope", ->
    it "assigns gridOptions", ->
      expect($scope.gridOptions).toBeDefined()

    describe "#showItem", ->
      it "navigates to the show user page", inject ($location) ->
        # Given
        spy = sinon.spy($location, "path")

        # When
        $scope.showItem(123)

        # Then
        expect(spy.called).toBeTruthy()
        expect(spy.calledWith("/users/123")).toBeTruthy()

    describe "#editItem", ->
      it "navigates to the edit user page", inject ($location) ->
        # Given
        spy = sinon.spy($location, "path")

        # When
        $scope.editItem(234)

        # Then
        expect(spy.called).toBeTruthy()
        expect(spy.calledWith("/users/234/edit")).toBeTruthy()
