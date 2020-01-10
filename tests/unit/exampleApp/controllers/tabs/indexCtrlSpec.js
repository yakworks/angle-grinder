/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("controller: tabs.IndexCtrl", function() {
  beforeEach(angular.mock.module("exampleApp"));

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
