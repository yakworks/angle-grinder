describe "module: angleGrinder.resources", ->
  beforeEach module("angleGrinder.resources")

  describe "service: Users", ->
    $httpBackend = null
    beforeEach inject ($injector) ->
      $httpBackend = $injector.get("$httpBackend")

    afterEach ->
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()

    Users = null
    beforeEach inject ($injector) ->
      Users = $injector.get("Users")

    it "is defined", ->
      expect(Users).toBeDefined()

    describe "#get", ->
      it "queries for the record", ->
        $httpBackend.whenGET("/api/users/101").respond({})
        Users.get(id: 101)
        $httpBackend.flush()

    describe "#resourceName", ->
      user = null
      beforeEach -> user = new Users()

      it "returns the resource name", ->
        expect(user.resourceName()).toEqual "user"

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

    describe "#newRecord", ->
      user = null
      beforeEach -> user = new Users()

      describe "when the record is not persisted", ->
        it "returns true", ->
          expect(user.newRecord()).toBeTruthy()

      describe "when the record is persisted", ->
        beforeEach -> user.id = 234

        it "returns false", ->
          expect(user.newRecord()).toBeFalsy()

    describe "#save", ->
      user = null
      onSuccess = null

      beforeEach ->
        user = new Users()
        onSuccess = sinon.stub()

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
          expect(onSuccess.called).toBeTruthy()

          args = onSuccess.lastCall.args[0]
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
          expect(onSuccess.called).toBeTruthy()

          args = onSuccess.lastCall.args[0]
          expect(args.id).toEqual 103
          expect(args.foo).toEqual "biz"

      describe "when the action ends with failure", ->
        onError = null

        beforeEach ->
          user.id = null
          $httpBackend.whenPOST("/api/users").respond 500, "error!"
          onError = sinon.stub()

        it "handles the error", ->
          # When
          user.save(error: onError)
          $httpBackend.flush()

          # Then
          expect(onError.called).toBeTruthy()

    describe "#delete", ->
      user = null
      onComplete = sinon.stub()

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
          expect(onComplete.called).toBeTruthy()

          args = onComplete.lastCall.args[0]
          expect(args.id).toEqual 123

      describe "when the action ends with failure", ->
        onError = null

        beforeEach ->
          $httpBackend.whenDELETE("/api/users/123").respond 404, "error!"
          onError = sinon.stub()

        it "handles the error", ->
          # When
          user.delete(error: onError)
          $httpBackend.flush()

          # Then
          expect(onError.called).toBeTruthy()

  describe "service: userResolver", ->
    $httpBackend = null

    beforeEach inject (_$httpBackend_) ->
      $httpBackend = _$httpBackend_

    describe "when an user can be found", ->
      beforeEach ->
        $httpBackend.whenGET("/api/users/123").respond id: 123, email: "test@user.com"

      it "it resolves the user", inject (userResolver) ->
        resolvedUser = null
        promise = userResolver(123)
        promise.then (user) -> resolvedUser = user
        $httpBackend.flush()

        expect(resolvedUser).toBeDefined()
        expect(resolvedUser.id).toEqual 123
        expect(resolvedUser.email).toEqual "test@user.com"

    describe "when an user cannot be found", ->
      beforeEach ->
        $httpBackend.whenGET("/api/users/234").respond 404, "not found"

      it "rejects the user", inject (userResolver) ->
        called = false
        promise = userResolver(234)
        promise.then null, -> called = true
        $httpBackend.flush()

        expect(called).toBeTruthy()
