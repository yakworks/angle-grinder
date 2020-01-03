/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("controller: panels.IndexCtrl", function() {
  beforeEach(module("exampleApp"));

  let $scope = null;

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();

    return $controller("panels.IndexCtrl",
      {$scope});
  })
  );

  return it("is defined", () => expect($scope.title).to.eq("Panels"));
});
