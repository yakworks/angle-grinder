import agCommon from 'angle-grinder/src/ng/common'

describe("menuItemSpec", function() {

  beforeEach(angular.mock.module(agCommon));

  return describe("directive: menuItem", function() {

    let element = null;
    let parentElement = null;
    let $scope = null;

    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();

      parentElement = angular.element(`\
<div list-icon="test">
  <menu-item for="user">Show user</menu-item>
</div>\
`
      );
      $compile(parentElement)($scope);
      $scope.$digest();
      return element = parentElement.children().first();
    })
    );

    it("has valid menu item title", () => expect(element.find("a").text()).to.include("Show user"));

    it("has valid href", () => expect(element.find("a").attr("href")).to.eq("#/user"));

    return describe("activate link", function() {

      describe("when the current path match the section", function() {

        beforeEach(inject(function($route) {
          $route.current = {page: "user"};
          return $scope.$digest();
        })
        );

        return it("activates the menu item", () => expect(element.hasClass("active")).to.be.true);
      });

      return describe("otherwise", function() {

        beforeEach(inject(function($route) {
          $route.current = {page: "transaction"};
          return $scope.$digest();
        })
        );

        return it("activates the menu item", () => expect(element.hasClass("active")).to.be.false);
      });
    });
  });
});
