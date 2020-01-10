/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: exampleApp.resources", function() {
  beforeEach(angular.mock.module("exampleApp.resources"));

  describe("service: Users", function() {
    let $httpBackend = null;
    beforeEach(inject($injector => $httpBackend = $injector.get("$httpBackend"))
    );

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      return $httpBackend.verifyNoOutstandingRequest();
    });

    let Users = null;
    beforeEach(inject($injector => Users = $injector.get("Users"))
    );

    it("is defined", () => expect(Users).to.not.be.undefined);

    describe("#get", () => it("queries for the record", function() {
      $httpBackend.whenGET("/api/users/101").respond({});
      Users.get({id: 101});
      return $httpBackend.flush();
    }));

    describe("#massUpdate", () => it("updates records with the given ids", function() {
      $httpBackend.whenPUT("/api/users/massUpdate").respond({});
      Users.massUpdate({ids: [123, 234, 456], data: {paid: true}});
      return $httpBackend.flush();
    }));

    describe("#resourceName", function() {
      let user = null;
      beforeEach(() => user = new Users());

      return it("returns the resource name", () => expect(user.resourceName()).to.equal("user"));
    });

    describe("#persisted", function() {
      let user = null;
      beforeEach(() => user = new Users());

      describe("when the record has an id", function() {
        beforeEach(() => user.id = 123);

        return it("returns true", () => expect(user.persisted()).to.be.true);
      });

      return describe("when the record does not have an id", function() {
        beforeEach(() => user.id = null);

        return it("returns false", () => expect(user.persisted()).to.be.false);
      });
    });

    describe("#newRecord", function() {
      let user = null;
      beforeEach(() => user = new Users());

      describe("when the record is not persisted", () => it("returns true", () => expect(user.newRecord()).to.be.true));

      return describe("when the record is persisted", function() {
        beforeEach(() => user.id = 234);

        return it("returns false", () => expect(user.newRecord()).to.be.false);
      });
    });

    describe("#save", function() {
      let user = null;
      let onSuccess = null;

      beforeEach(function() {
        user = new Users();
        return onSuccess = sinon.stub();
      });

      describe("when the record is persisted", function() {
        beforeEach(() => user.id = 102);

        return it("updates the record", function() {
          // Given
          user.foo = "bar";
          $httpBackend.expectPUT("/api/users/102", {id: 102, foo: "bar"})
            .respond({id: 102, foo: "bar"});

          // when
          user.save({success: onSuccess});
          $httpBackend.flush();

          // Then
          expect(onSuccess).to.have.been.called;

          const args = onSuccess.lastCall.args[0];
          expect(args.id).to.equal(102);
          return expect(args.foo).to.equal("bar");
        });
      });

      describe("when the record is not persisted", function() {
        beforeEach(() => user.id = null);

        return it("creates a new record", function() {
          // Given
          user.foo = "biz";
          $httpBackend.expectPOST("/api/users", {id: null, foo: "biz"})
            .respond({id: 103, foo: "biz"});

          // When
          user.save({success: onSuccess});
          $httpBackend.flush();

          // Then
          expect(onSuccess).to.have.been.called;

          const args = onSuccess.lastCall.args[0];
          expect(args.id).to.equal(103);
          return expect(args.foo).to.equal("biz");
        });
      });

      return describe("when the action ends with failure", function() {
        let onError = null;

        beforeEach(function() {
          user.id = null;
          $httpBackend.whenPOST("/api/users").respond(500, "error!");
          return onError = sinon.stub();
        });

        return it("handles the error", function() {
          // When
          user.save({error: onError});
          $httpBackend.flush();

          // Then
          return expect(onError).to.have.been.called;
        });
      });
    });

    return describe("#delete", function() {
      let user = null;
      const onComplete = sinon.stub();

      beforeEach(() => user = new Users({id: 123}));

      describe("when the action was successfull", function() {
        beforeEach(() => $httpBackend.whenDELETE("/api/users/123").respond({id: 123}));

        return it("deletes the record", function() {
          // When
          user.delete({success: onComplete});
          $httpBackend.flush();

          // Then
          expect(onComplete).to.have.been.called;

          const args = onComplete.lastCall.args[0];
          return expect(args.id).to.equal(123);
        });
      });

      return describe("when the action ends with failure", function() {
        let onError = null;

        beforeEach(function() {
          $httpBackend.whenDELETE("/api/users/123").respond(404, "error!");
          return onError = sinon.stub();
        });

        return it("handles the error", function() {
          // When
          user.delete({error: onError});
          $httpBackend.flush();

          // Then
          return expect(onError).to.have.been.called;
        });
      });
    });
  });

  return describe("service: userResolver", function() {
    let $httpBackend = null;

    beforeEach(inject(_$httpBackend_ => $httpBackend = _$httpBackend_)
    );

    describe("when an user can be found", function() {
      beforeEach(() => $httpBackend.whenGET("/api/users/123").respond({id: 123, email: "test@user.com"}));

      return it("it resolves the user", inject(function(userResolver) {
        let resolvedUser = null;
        const promise = userResolver(123);
        promise.then(user => resolvedUser = user);
        $httpBackend.flush();

        expect(resolvedUser).to.not.be.undefined;
        expect(resolvedUser.id).to.equal(123);
        return expect(resolvedUser.email).to.equal("test@user.com");
      })
      );
    });

    return describe("when an user cannot be found", function() {
      beforeEach(() => $httpBackend.whenGET("/api/users/234").respond(404, "not found"));

      return it("rejects the user", inject(function(userResolver) {
        let called = false;
        const promise = userResolver(234);
        promise.then(null, () => called = true);
        $httpBackend.flush();

        return expect(called).to.be.true;
      })
      );
    });
  });
});
