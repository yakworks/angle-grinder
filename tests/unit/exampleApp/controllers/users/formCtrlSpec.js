/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("controller: users.FormCtrl", function() {

  beforeEach(module("exampleApp", function($provide) {
    $provide.value("$location", {path: sinon.stub()});
  })
  );

  let $scope = null;

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    return $controller("users.FormCtrl", {
      $scope,
      user: { id: 456, email: "test@email.com"
    }
    }
    );
  })
  );

  it("assigns an user record to the scope", function() {
    expect($scope.user).to.not.be.undefined;
    expect($scope.user.id).to.equal(456);
    return expect($scope.user.email).to.equal("test@email.com");
  });

  describe("#save", () => describe("on success", function() {
    let user = null;

    beforeEach(inject(function($q) {
      const deferred = $q.defer();
      deferred.resolve({ id: 123 });

      user = {save: sinon.stub().returns({ $promise: deferred.promise })};

      $scope.save(user);
      return $scope.$digest();
    })
    );

    it("saves a record", () => expect(user.save).to.have.been.called);

    return it("redirects to the show page", inject(function($location) {
      expect($location.path).to.have.been.called;
      return expect($location.path).to.have.been.calledWith("/examples/users/123");
    })
    );
  }));

  return describe("#delete", () => it("is defined", () => expect($scope.delete).to.not.be.undefined));
});
