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
        spyOn($location, "path")
        $scope.showItem(123)
        expect($location.path).toHaveBeenCalledWith("/users/123")

    describe "#editItem", ->
      it "navigates to the edit user page", inject ($location) ->
        spyOn($location, "path")
        $scope.editItem(234)
        expect($location.path).toHaveBeenCalledWith("/users/234/edit")
