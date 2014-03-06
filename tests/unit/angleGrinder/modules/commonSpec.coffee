describe "module: angleGrinder.common", ->
  beforeEach module "angleGrinder.common"

  describe "service: pathWithContext", ->
    it "is defined", inject (pathWithContext) ->
      expect(pathWithContext).to.not.be.undefined

    it "has default context path", inject (pathWithContext) ->
      expect(pathWithContext("/foo")).to.equal("/foo")
      expect(pathWithContext("bar")).to.equal("bar")

    describe "when the context path is provided", ->
      useContextPath = (path) ->
        beforeEach module (pathWithContextProvider) ->
          pathWithContextProvider.setContextPath path

      describe "first example", ->
        useContextPath "/example"

        it "generates a path with the context", inject (pathWithContext) ->
          expect(pathWithContext("/foo/bar")).to.equal "/example/foo/bar"

      describe "when the path contains trailing slashes", ->
        useContextPath "/other-example"

        paths = ["users/1.json", "/users/1.json", "//users/1.json", "////////users/1.json"]
        for path in paths
          it "generates a valid path", inject (pathWithContext) ->
            expect(pathWithContext(path)).to.equal "/other-example/users/1.json"

  describe "filter: withContext", ->

    # stub `pathWithContext` service
    beforeEach module "angleGrinder.common", ($provide) ->
      $provide.value "pathWithContext", sinon.stub()
      return

    it "is defined", inject ($filter, withContextFilter) ->
      expect($filter("withContext")).to.not.be.undefined
      expect(withContextFilter).to.not.be.undefined
      expect($filter("withContext")).to.equal withContextFilter

    it "uses `pathWithContext` service to append a context", inject (pathWithContext, withContextFilter) ->
      # Given
      pathWithContext.returns("/context/path")

      # When
      expect(withContextFilter("path")).to.equal "/context/path"

      # Then
      expect(pathWithContext).to.have.been.called
      expect(pathWithContext).to.have.been.calledWith("path")

  describe "service: pendingRequests", ->
    $http = null
    pendingRequests = null

    beforeEach inject (_$http_, _pendingRequests_) ->
      $http = _$http_
      pendingRequests = _pendingRequests_

    describe "when a request is in progress", ->
      beforeEach -> $http.pendingRequests = [{method: "GET"}]

      it "returs true", ->
        expect(pendingRequests()).to.be.true

    describe "when there are no requests in progress", ->
      beforeEach -> $http.pendingRequests = [{method: "unknown"}]

      it "returs true", ->
        expect(pendingRequests()).to.be.false

    describe "#for", ->
      beforeEach -> $http.pendingRequests = [{method: "DELETE"}, {method: "GET"}]

      describe "when a request with the given method is in progres", ->
        it "returns true", ->
          expect(pendingRequests.for("DELETE", "POST")).to.be.true
          expect(pendingRequests.for("PUT", "POST")).to.be.false

      describe "otherwise", ->
        it "returns false", ->
          expect(pendingRequests.for("POST")).to.be.false
          expect(pendingRequests.for("POST", "GET")).to.be.true

  describe "service: isEmpty", ->

    it "is defined", inject (isEmpty) ->
      expect(isEmpty).to.not.be.undefined

    describe "for empty strings", ->

      for str in [undefined, null, ""]
        it "returns true for `#{str}`", inject (isEmpty) ->
          expect(isEmpty(str)).to.be.true

    describe "for non empty strings", ->

      for str in [" ", "    ", "test", " foo bar "]
        it "returns false for `#{str}`", inject (isEmpty) ->
          expect(isEmpty(str)).to.be.false

  describe "service: camelize", ->

    context "when the input is dasherized", ->

      it "camalizes the input", inject (camelize) ->
        expect(camelize("foo_bar")).to.eq "fooBar"
        expect(camelize("foo.bar.baz")).to.eq "fooBarBaz"
        expect(camelize("-foo-bar")).to.eq "FooBar"

    context "when the input is not dasherized", ->

      it "does nothing", inject (camelize) ->
        expect(camelize("foobar")).to.eq "foobar"
