describe "module: angleGrinder.common", ->

  beforeEach module "angleGrinder.common"

  describe "service: urlBuilder", ->

    it "builds an url with the query string", inject (urlBuilder) ->
      params = one: 1, two: 2, foo: "bar"
      url = urlBuilder("/foo", params)

      expect(url).to.eq "/foo?one=1&two=2&foo=bar"

  describe "service: pathWithContext", ->

    it "is defined", inject (pathWithContext) ->
      expect(pathWithContext).to.not.be.undefined

    it "has default context path", inject (pathWithContext) ->
      expect(pathWithContext("/foo")).to.equal("/foo")
      expect(pathWithContext("bar")).to.equal("/bar")

    it "can build query string", inject (pathWithContext) ->
      params = foo: "one", bar: "two"
      path = pathWithContext("/foo", params)

      expect(path).to.eq "/foo?foo=one&bar=two"

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

    beforeEach module "angleGrinder.common",
      pathWithContext: sinon.stub()

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
