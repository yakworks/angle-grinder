import pwcModule from 'angle-grinder/src/ng/pathWithContext'

describe("pathWithContextSpec", function() {

  beforeEach(angular.mock.module(pwcModule));

  describe("service: urlBuilder", () => it("builds an url with the query string", inject(function(urlBuilder) {
    const params = {one: 1, two: 2, foo: "bar"};
    const url = urlBuilder("/foo", params);

    expect(url).to.eq("/foo?one=1&two=2&foo=bar");
  })
  ));

  describe("service: pathWithContext", function() {

    it("is defined", inject(pathWithContext => expect(pathWithContext).to.not.be.undefined)
    );

    it("has default context path", inject(function(pathWithContext) {
      expect(pathWithContext("/foo")).to.equal("/foo");
      expect(pathWithContext("bar")).to.equal("/bar");
    })
    );

    it("can build query string", inject(function(pathWithContext) {
      const params = {foo: "one", bar: "two"};
      const path = pathWithContext("/foo", params);

      expect(path).to.eq("/foo?foo=one&bar=two");
    })
    );

    describe("when the context path is provided", function() {
      let useContextPath = (path) => beforeEach(angular.mock.module(pathWithContextProvider => pathWithContextProvider.setContextPath(path))
      );

      describe("first example", function() {
        useContextPath("/example");

        return it("generates a path with the context", inject(pathWithContext => expect(pathWithContext("/foo/bar")).to.equal("/example/foo/bar"))
        );
      });

      describe("when the path contains trailing slashes", function() {
        useContextPath("/other-example");

        const paths = ["users/1.json", "/users/1.json", "//users/1.json", "////////users/1.json"];
        return Array.from(paths).map((path) =>
          it("generates a valid path", inject(pathWithContext => expect(pathWithContext(path)).to.equal("/other-example/users/1.json"))
          ));
      });
    });
  });

  describe("filter: withContext", function() {

    beforeEach(angular.mock.module(pwcModule,
      {pathWithContext: sinon.stub()})
    );

    it("is defined", inject(function($filter, withContextFilter) {
      expect($filter("withContext")).to.not.be.undefined;
      expect(withContextFilter).to.not.be.undefined;
      expect($filter("withContext")).to.equal(withContextFilter);
    })
    );

    it("uses `pathWithContext` service to append a context", inject(function(pathWithContext, withContextFilter) {
      // Given
      pathWithContext.returns("/context/path");

      // When
      expect(withContextFilter("path")).to.equal("/context/path");

      // Then
      expect(pathWithContext).to.have.been.called;
      expect(pathWithContext).to.have.been.calledWith("path");
    })
    );
  });
});
