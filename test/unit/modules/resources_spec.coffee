describe "module: angleGrinder.resources", ->
  beforeEach module("angleGrinder.resources")

  $httpBackend = null
  beforeEach inject ($injector) ->
    $httpBackend = $injector.get("$httpBackend")

  afterEach ->
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()

  describe "service: Users", ->
    Users = null
    beforeEach inject ($injector) ->
      Users = $injector.get("Users")

    it "is defined", ->
      expect(Users).toBeDefined()

    describe "#get", ->
      it "queries for the record", ->
        $httpBackend.whenGET("/api/users/101").respond([])
        Users.get(id: 101)
        $httpBackend.flush()

    describe "#persisted", ->
      user = null
      beforeEach -> user = new Users()

      describe "when the record has an id", ->
        beforeEach -> user.id = 123

        it "returns true", ->
          expect(user.persisted()).toBeTruthy()

      describe "when the record does not have an id", ->
        beforeEach -> user.id = null

        it "returns false", ->
          expect(user.persisted()).toBeFalsy()

    describe "#save", ->
      user = null
      onSuccess = null

      beforeEach ->
        user = new Users()
        onSuccess = jasmine.createSpy("#onSuccess callback")

      describe "when the record is persisted", ->
        beforeEach -> user.id = 102

        it "updates the record", ->
          # Given
          user.foo = "bar"
          $httpBackend.expectPUT("/api/users/102", id: 102, foo: "bar")
            .respond(id: 102, foo: "bar")

          # when
          user.save(success: onSuccess)
          $httpBackend.flush()

          # Then
          expect(onSuccess).toHaveBeenCalled()

          args = onSuccess.mostRecentCall.args[0]
          expect(args.id).toEqual 102
          expect(args.foo).toEqual "bar"

      describe "when the record is not persisted", ->
        beforeEach -> user.id = null

        it "creates a new record", ->
          # Given
          user.foo = "biz"
          $httpBackend.expectPOST("/api/users", id: null, foo: "biz")
            .respond(id: 103, foo: "biz")

          # When
          user.save(success: onSuccess)
          $httpBackend.flush()

          # Then
          expect(onSuccess).toHaveBeenCalled()

          args = onSuccess.mostRecentCall.args[0]
          expect(args.id).toEqual 103
          expect(args.foo).toEqual "biz"

      describe "when the action ends with failure", ->
        onError = null

        beforeEach ->
          user.id = null
          $httpBackend.whenPOST("/api/users").respond 500, "error!"
          onError = jasmine.createSpy("#onError callback")

        it "handles the error", ->
          # When
          user.save(error: onError)
          $httpBackend.flush()

          # Then
          expect(onError).toHaveBeenCalled()

    describe "#delete", ->
      user = null
      onComplete = jasmine.createSpy("#onComplete callback")

      beforeEach ->
        user = new Users(id: 123)

      describe "when the action was successfull", ->
        beforeEach ->
          $httpBackend.whenDELETE("/api/users/123").respond(id: 123)

        it "deletes the record", ->
          # When
          user.delete(success: onComplete)
          $httpBackend.flush()

          # Then
          expect(onComplete).toHaveBeenCalled()

          args = onComplete.mostRecentCall.args[0]
          expect(args.id).toEqual 123

      describe "when the action ends with failure", ->
        onError = null

        beforeEach ->
          $httpBackend.whenDELETE("/api/users/123").respond 404, "error!"
          onError = jasmine.createSpy("#onError callback")

        it "handles the error", ->
          # When
          user.delete(error: onError)
          $httpBackend.flush()

          # Then
          expect(onError).toHaveBeenCalled()
