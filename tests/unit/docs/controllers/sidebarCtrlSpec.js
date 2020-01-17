import docResMod from '#/docs/src/main'

describe("controller: SidebarCtrl", function() {

  beforeEach(angular.mock.module(docResMod, function($provide) {
    $provide.value("scrollTo", sinon.stub());

    $provide.service("$location", function() {
      let path = "";

      return {
        setPath(_path_) { return path = _path_; },
        path() { return path; }
      };
    });

  })
  );

  let $scope = null;

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    return $controller("SidebarCtrl",
      {$scope});
  })
  );

  describe("#section", () => it("returns a valid section name", inject(function($location) {
    expect($scope.section()).to.eq("angleGrinder");

    $location.setPath("/foo/bar");
    expect($scope.section()).to.eq("angleGrinder");

    $location.setPath("/documentation/api");
    expect($scope.section()).to.eq("documentation");

    $location.setPath("/examples");
    return expect($scope.section()).to.eq("examples");
  })
  ));

  return describe("on `$routeChangeSuccess` event", () => it("scrolls to the given section", inject(function($routeParams, $rootScope, scrollTo) {
    // Given
    $routeParams.scrollTo = "fooBar";

    // When
    $rootScope.$emit("$routeChangeSuccess");
    $rootScope.$apply();

    // Then
    expect(scrollTo).to.have.been.called;
    return expect(scrollTo.getCall(0).args[0]).to.eq("fooBar");
  })
  ));
});
