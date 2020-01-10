/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("controller: users.ShowCtrl", function() {

  // stub `$location` service
  beforeEach(angular.mock.module("ng", function($provide) {
    $provide.value("$location", {path: sinon.stub()});
  })
  );

  beforeEach(angular.mock.module("exampleApp"));

  let $scope = null;

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();

    return $controller("users.ShowCtrl", {
      $scope,
      user: { id: 456, email: "test@email.com"
    }
    }
    );
  })
  );

  it("assigns an user record to the scope", function() {
    expect($scope.user).to.not.be.undefined;
    expect($scope.user).to.have.property("id", 456);
    return expect($scope.user).to.have.property("email", "test@email.com");
  });

  return describe("#delete", function() {
    let deferred = null;
    let user = null;

    beforeEach(inject(function($q) {
      deferred = $q.defer();
      user = {delete: sinon.stub().returns({$promise: deferred.promise})};

      return $scope.delete(user);
    })
    );

    it("deletes a record", () => expect(user.delete).to.have.been.called);

    return describe("on success", function() {
      beforeEach(() => $scope.$apply(() => deferred.resolve(true)));

      return it("redirects to the users list page", inject(function($location) {
        expect($location.path).to.have.been.called;
        return expect($location.path).to.have.been.calledWith("/examples/users");
      })
      );
    });
  });
});
