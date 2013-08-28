describe "controller: users.FormCtrl", ->
  beforeEach module("angleGrinder")

  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    $controller "users.FormCtrl",
      $scope: $scope
      user: id: 456, email: "test@email.com"

  it "assings an user record to the scope", ->
    expect($scope.user).toBeDefined()
    expect($scope.user.id).toEqual 456
    expect($scope.user.email).toEqual "test@email.com"

  describe "#save", ->
    # Mark the form as valid
    beforeEach -> $scope.editForm = $valid: true

    describe "on success", ->
      it "saves a record and redirect to the show page", inject ($location) ->
        # Given
        spyOn($location, "path")
        recordSpy = jasmine.createSpyObj("user", ["save"])
        recordSpy.id = 123
        recordSpy.save.andCallFake (options) ->
          options.success(id: 123)

        # When
        $scope.save(recordSpy)

        # Then
        expect(recordSpy.save).toHaveBeenCalled()
        expect($location.path).toHaveBeenCalledWith("/users/123")

    describe "onError", ->
      it "sets server side validation errors", ->
        recordSpy = jasmine.createSpyObj("user", ["save"])
        recordSpy.id = 123
        recordSpy.resourceName = -> "user"
        recordSpy.save.andCallFake (options) ->
          options.error(status: 422, data: errors: user: login: "has to be unique")

        # When
        $scope.save(recordSpy)

        # Then
        expect(recordSpy.save).toHaveBeenCalled()
        expect($scope.editForm.$serverError.login).toEqual "has to be unique"

  describe "#delete", ->

    it "is defined", ->
      expect($scope.delete).toBeDefined()
