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
      onComplete = null

      beforeEach ->
        user = new Users()
        onComplete = jasmine.createSpy("#onComplete callback")

      describe "when the record is persisted", ->
        beforeEach -> user.id = 102

        it "updates the record", ->
          # Given
          $httpBackend.whenPUT("/api/users/102").respond(id: 102, foo: "bar")

          # when
          user.save(onComplete)
          $httpBackend.flush()

          # Then
          expect(onComplete).toHaveBeenCalled()

          args = onComplete.mostRecentCall.args[0]
          expect(args.id).toEqual 102
          expect(args.foo).toEqual "bar"

      describe "when the record is not persisted", ->
        beforeEach -> user.id = null

        it "creates a new record", ->
          # Given
          $httpBackend.whenPOST("/api/users").respond(id: 103, foo: "biz")

          # When
          user.save(onComplete)
          $httpBackend.flush()

          # Then
          expect(onComplete).toHaveBeenCalled()

          args = onComplete.mostRecentCall.args[0]
          expect(args.id).toEqual 103
          expect(args.foo).toEqual "biz"
