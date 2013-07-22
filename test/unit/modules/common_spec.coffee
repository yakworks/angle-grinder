describe "module: angleGrinder.common", ->
  beforeEach ->
    module("angleGrinder.common")

  describe "service: pathWithContext", ->
    it "is defined", inject (pathWithContext) ->
      expect(pathWithContext).toBeDefined()

    it "has default context path", inject (pathWithContext) ->
      expect(pathWithContext("/foo")).toEqual("/foo")
      expect(pathWithContext("bar")).toEqual("bar")

    describe "when the context path is provided", ->
      useContextPath = (path) ->
        beforeEach ->
          module (pathWithContextProvider) -> pathWithContextProvider.setContextPath path

      describe "first example", ->
        useContextPath "/example"

        it "generates a path with the context", inject (pathWithContext) ->
          expect(pathWithContext("/foo/bar")).toEqual "/example/foo/bar"

      describe "when the path contains trailing slashes", ->
        useContextPath "/other-example"

        using "valid paths", ["users/1.json", "/users/1.json", "//users/1.json"], (path) ->
          it "generates a valid path", inject (pathWithContext) ->
            expect(pathWithContext(path)).toEqual "/other-example/users/1.json"
