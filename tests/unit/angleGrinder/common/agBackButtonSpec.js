import agCommon from '~/scripts/common'

describe("agBackButtonSpec", function() {

  // mock `$window.history.back` method
  beforeEach(angular.mock.module("ng", function($provide) {
    $provide.decorator("$window", function($delegate) {
      $delegate.history.back = sinon.mock();
      return $delegate;
    });

  })
  );

  beforeEach(angular.mock.module(agCommon));

  return describe("directive: agBackButton", function() {

    let $scope = null;
    let element = null;

    beforeEach(inject(function($rootScope, $compile) {
      $scope = $rootScope.$new();

      // compilete the directive
      element = angular.element(`\
<a href="/foo/bar" ag-back-button>back</a>\
`
      );
      return $scope.$apply(() => $compile(element)($scope));
    })
    );

    return describe("on `click`", () => it("loads the previous page from the history", inject(function($window) {
      // When
      element.click();

      // Then
      return expect($window.history.back.called).to.be.true;
    })
    ));
  });
});
