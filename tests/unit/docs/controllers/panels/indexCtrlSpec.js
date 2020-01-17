import docResMod from '#/docs/src/main'

describe("controller: panels.IndexCtrl", function() {
  beforeEach(angular.mock.module(docResMod));

  let $scope = null;

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();

    return $controller("panels.IndexCtrl",
      {$scope});
  })
  );

  return it("is defined", () => expect($scope.title).to.eq("Panels"));
});
