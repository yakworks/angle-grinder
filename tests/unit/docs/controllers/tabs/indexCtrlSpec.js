import docResMod from '#/docs/src/main'

describe("controller: tabs.IndexCtrl", function() {
  beforeEach(angular.mock.module(docResMod));

  let $scope = null;

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();

    return $controller("tabs.IndexCtrl",
      {$scope});
  })
  );

  return describe("#save", () => it("saves the dummy form", inject(function($log) {
    sinon.spy($log, "debug");
    $scope.save();
    return expect($log.debug).to.have.been.called;
  })
  ));
});
