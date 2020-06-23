import agCommon from 'angle-grinder/src/ng/common'

describe("commonSpec", function() {
  beforeEach(angular.mock.module(agCommon));

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
});
