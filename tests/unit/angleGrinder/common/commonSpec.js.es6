/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.common", function() {
  beforeEach(module("angleGrinder.common"));

  describe("service: pendingRequests", function() {
    let $http = null;
    let pendingRequests = null;

    beforeEach(inject(function(_$http_, _pendingRequests_) {
      $http = _$http_;
      return pendingRequests = _pendingRequests_;
    })
    );

    describe("when a request is in progress", function() {
      beforeEach(() => $http.pendingRequests = [{method: "GET"}]);

      return it("returs true", () => expect(pendingRequests()).to.be.true);
    });

    describe("when there are no requests in progress", function() {
      beforeEach(() => $http.pendingRequests = [{method: "unknown"}]);

      return it("returs true", () => expect(pendingRequests()).to.be.false);
    });

    return describe("#for", function() {
      beforeEach(() => $http.pendingRequests = [{method: "DELETE"}, {method: "GET"}]);

      describe("when a request with the given method is in progres", () => it("returns true", function() {
        expect(pendingRequests.for("DELETE", "POST")).to.be.true;
        return expect(pendingRequests.for("PUT", "POST")).to.be.false;
      }));

      return describe("otherwise", () => it("returns false", function() {
        expect(pendingRequests.for("POST")).to.be.false;
        return expect(pendingRequests.for("POST", "GET")).to.be.true;
      }));
    });
  });

  describe("service: isEmpty", function() {

    it("is defined", inject(isEmpty => expect(isEmpty).to.not.be.undefined)
    );

    describe("for empty strings", () => [undefined, null, ""].map((str) =>
      it(`returns true for \`${str}\``, inject(isEmpty => expect(isEmpty(str)).to.be.true)
      )));

    return describe("for non empty strings", () => [" ", "    ", "test", " foo bar "].map((str) =>
      it(`returns false for \`${str}\``, inject(isEmpty => expect(isEmpty(str)).to.be.false)
      )));
  });

  describe("service: IsFalsyServ", function() {

    let IsFalsyServ = null;

    beforeEach(inject(_IsFalsyServ_ => IsFalsyServ = _IsFalsyServ_));

    it("returns true for `NaN`", () => expect(IsFalsyServ(NaN)).to.be.true);

    it("returns true empty strings", function() {
      expect(IsFalsyServ("")).to.be.true;
      return expect(IsFalsyServ("foo")).to.be.false;
    });

    it("returns true for `null`", () => expect(IsFalsyServ(null)).to.be.true);

    it("returns true for `undefined`", () => expect(IsFalsyServ(undefined)).to.be.true);

    it("returns true for `false`", () => expect(IsFalsyServ(false)).to.be.true);

    return it("returns false for other value", function() {
      expect(IsFalsyServ(true)).to.be.false;
      expect(IsFalsyServ(0)).to.be.false;
      expect(IsFalsyServ(0.0)).to.be.false;
      return expect(IsFalsyServ(123)).to.be.false;
    });
  });

  return describe("service: camelize", function() {

    context("when the input is dasherized", () => it("camalizes the input", inject(function(camelize) {
      expect(camelize("foo_bar")).to.eq("fooBar");
      expect(camelize("foo.bar.baz")).to.eq("fooBarBaz");
      return expect(camelize("-foo-bar")).to.eq("FooBar");
    })
    ));

    return context("when the input is not dasherized", () => it("does nothing", inject(camelize => expect(camelize("foobar")).to.eq("foobar"))
    ));
  });
});
