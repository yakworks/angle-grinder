describe "module: angleGrinder.common", ->
  beforeEach module("angleGrinder.common")

  describe "service: pathWithContext", ->
    it "is defined", inject (pathWithContext) ->
      expect(pathWithContext).toBeDefined()

    it "has default context path", inject (pathWithContext) ->
      expect(pathWithContext("/foo")).toEqual("/foo")
      expect(pathWithContext("bar")).toEqual("bar")

    describe "when the context path is provided", ->
      useContextPath = (path) ->
        beforeEach module (pathWithContextProvider) ->
          pathWithContextProvider.setContextPath path

      describe "first example", ->
        useContextPath "/example"

        it "generates a path with the context", inject (pathWithContext) ->
          expect(pathWithContext("/foo/bar")).toEqual "/example/foo/bar"

      describe "when the path contains trailing slashes", ->
        useContextPath "/other-example"

        paths = ["users/1.json", "/users/1.json", "//users/1.json", "////////users/1.json"]
        using "valid paths", paths, (path) ->
          it "generates a valid path", inject (pathWithContext) ->
            expect(pathWithContext(path)).toEqual "/other-example/users/1.json"

  describe "filter: withContext", ->
    # create spy on `pathWithContext` service
    beforeEach module "angleGrinder.common", ($provide) ->
      $provide.value "pathWithContext", jasmine.createSpy("pathWithContext")
      return

    it "is defined", inject ($filter, withContextFilter) ->
      expect($filter("withContext")).toBeDefined()
      expect(withContextFilter).toBeDefined()
      expect($filter("withContext")).toBe withContextFilter

    it "uses `pathWithContext` service to append a context", inject (pathWithContext, withContextFilter) ->
      # Given
      pathWithContext.andReturn("/context/path")

      # When
      expect(withContextFilter("path")).toEqual "/context/path"

      # Then
      expect(pathWithContext).toHaveBeenCalledWith "path"

  describe "service: pendingRequests", ->
    $http = null
    pendingRequests = null

    beforeEach inject (_$http_, _pendingRequests_) ->
      $http = _$http_
      pendingRequests = _pendingRequests_

    describe "when a request is in progress", ->
      beforeEach -> $http.pendingRequests = [{method: "GET"}]

      it "returs true", ->
        expect(pendingRequests()).toBeTruthy()

    describe "when there are no requests in progress", ->
      beforeEach -> $http.pendingRequests = [{method: "unknown"}]

      it "returs true", ->
        expect(pendingRequests()).toBeFalsy()

    describe "#for", ->
      beforeEach -> $http.pendingRequests = [{method: "DELETE"}, {method: "GET"}]

      describe "when a request with the given method is in progres", ->
        it "returns true", ->
          expect(pendingRequests.for("DELETE", "POST")).toBeTruthy()
          expect(pendingRequests.for("PUT", "POST")).toBeFalsy()

      describe "otherwise", ->
        it "returns false", ->
          expect(pendingRequests.for("POST")).toBeFalsy()
          expect(pendingRequests.for("POST", "GET")).toBeTruthy()

  describe "service: isEmpty", ->

    it "is defined", inject (isEmpty) ->
      expect(isEmpty).toBeDefined()

    describe "for empty strings", ->

      for str in [undefined, null, ""]
        it "returns true for `#{str}`", inject (isEmpty) ->
          expect(isEmpty(str)).toBeTruthy()

    describe "for non empty strings", ->

      for str in [" ", "    ", "test", " foo bar "]
        it "returns false for `#{str}`", inject (isEmpty) ->
          expect(isEmpty(str)).toBeFalsy()
