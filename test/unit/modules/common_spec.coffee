describe "module: angleGrinder.common", ->
  beforeEach module("angleGrinder.common")

  describe "service: pathWithContext", ->
    it "is defined", inject (pathWithContext) ->
      expect(pathWithContext).toBeDefined()

    describe "when the path contains trailing slashes", ->
      using "valid paths", ["users/1.json", "/users/1.json", "//users/1.json"], (path) ->
        it "generates a valid path", inject (pathWithContext) ->
          expect(pathWithContext(path, "/example")).toEqual "/example/users/1.json"

    describe "when the context path context slashes", ->
      using "valid context paths", ["/example", "/example/", "/example//"], (contextPath) ->
        it "generates a valid path", inject (pathWithContext) ->
          expect(pathWithContext("/users/2.json", contextPath)).toEqual "/example/users/2.json"
