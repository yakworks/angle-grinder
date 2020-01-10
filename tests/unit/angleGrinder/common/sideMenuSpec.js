/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.common directive: agSideMenu", function() {
  beforeEach(angular.mock.module("angleGrinder.common"));

  let element = null;
  let $scope = null;
  const ngModel = null;

  beforeEach(angular.mock.module("angleGrinder", function($provide) {
    $provide.decorator("$window", $delegate => $delegate);

  })
  );

  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();

    element = angular.element(`\
   <ul offset="40" ag-side-menu id="test">
  <li><a><i class="icon-chevron-right"></i> test1</a></li>
  <li><a><i class="icon-chevron-right"></i> test2</a></li>
</ul>\
`
    );
    $compile(element)($scope);
    return $scope.$digest();
  })
  );

  return describe("check scrolling", () => it("window scroll", function() {
    $(window).trigger("scroll");
    element.find('#test').triggerHandler('scroll');
    return expect(element.css("position")).eq('relative');
  }));
});
