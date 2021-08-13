import module from 'angle-grinder/src/ng/controls/xeditable'

describe("module: angleGrinder.forms", function() {

  beforeEach(angular.mock.module(module));

  return xdescribe("directive: editablePanelHeading", function() {
    let $scope = null;
    let element = null;

    beforeEach(inject(function($rootScope, $compile) {
      $scope = $rootScope.$new();

      $scope.form = {
        $show: sinon.spy(),
        $visible: false
      };

      element = angular.element(`\
<div editable-panel-heading="form">Foo bar</div>\
`
      );
      $compile(element)($scope);
      return $scope.$digest();
    })
    );

    it("has the heading", () => expect(element.hasClass("panel-heading")).to.be.true);

    it("has the title", () => expect(element.find("h4.panel-title").text()).to.contain("Foo bar"));

    return describe("edit button", function() {

      it("is visible", () => expect(element.find("a.pull-right").length).to.eq(1));

      describe("on click", function() {
        beforeEach(() => element.find("a.pull-right").click());

        return it("shows the form", () => expect($scope.form.$show).to.have.been.called);
      });

      return describe("when the form is visible", function() {
        beforeEach(() => $scope.$apply("form.$visible = true"));

        return it("is hidden", () => expect(element.find("a.pull-right").length).to.eq(0));
      });
    });
  });
});
