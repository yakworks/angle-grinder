describe "controller: users.EditCtrl", ->
  beforeEach module("angleGrinder")

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    $controller "users.EditCtrl",
      $scope: $scope
      user: id: 456, email: "test@email.com"

  it "assings an user record to the scope", ->
    expect($scope.user).toBeDefined()
    expect($scope.user.id).toEqual 456
    expect($scope.user.email).toEqual "test@email.com"

  describe "#save", ->
    beforeEach -> $scope.editForm = $valid: true

    describe "on success", ->
      it "saves a record and redirect to the show page", inject ($location) ->
        # Given
        spyOn($location, "path")
        recordSpy = jasmine.createSpyObj("user", ["save"])
        recordSpy.id = 123
        recordSpy.save.andCallFake (options) ->
          options.success()

        # When
        $scope.save(recordSpy)

        # Then
        expect($location.path).toHaveBeenCalledWith("/users/123")

    describe "onError", ->
      it "sets server side validation errors", ->
        recordSpy = jasmine.createSpyObj("user", ["save"])
        recordSpy.id = 123
        recordSpy.save.andCallFake (options) ->
          options.error(status: 422, data: errors: "foo bar")

        # When
        $scope.save(recordSpy)

        # Then
        expect($scope.serverValidationErrors).toEqual "foo bar"
