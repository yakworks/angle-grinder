import module from 'angle-grinder/src/ng/controls/xeditable'

describe("module: angleGrinder.forms", function() {

  beforeEach(angular.mock.module(module));

  return describe("directive: editableCardHeading", function() {
    let $scope = null;
    let element = null;

    beforeEach(inject(function($rootScope, $compile) {
      $scope = $rootScope.$new();

      $scope.form = {
        $show: sinon.spy(),
        $visible: false
      };

      element = angular.element(`\
<div editable-card-heading="form">Foo bar</div>\
`
      );
      $compile(element)($scope);
      return $scope.$digest();
    })
    );

    it("has the heading", () => expect(element.hasClass("card-header")).to.be.true);

    it("has the title", () => expect(element.find(".card-header-title").text()).to.contain("Foo bar"));

    return describe("edit button", function() {

      it("shouldn be visible", () => expect(element.find(".icon.is-solo").length).to.eq(0));

      describe("on click", function() {
        beforeEach(() => element.find("a.pull-right").click());

        return xit("shows the form", () => expect($scope.form.$show).to.have.been.called);
      });

      return describe("when the form is visible", function() {
        beforeEach(() => $scope.$apply("form.$visible = true"));

        return it("is hidden", () => expect(element.find(".icon.is-solo").length).to.eq(0));
      });
    });
  });
});
