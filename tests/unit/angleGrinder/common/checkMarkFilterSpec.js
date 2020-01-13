import agCommon from '~/scripts/common'

describe("checkMarkFilterSpec", function() {

  beforeEach(angular.mock.module(agCommon));

  return describe("filter: checkMark", function() {

    let checkMarkFilter = null;
    beforeEach(inject($filter => checkMarkFilter = $filter("checkMark"))
    );

    it("is defined", () => expect(checkMarkFilter).to.be.a("function"));

    context("when the input evaluated to `true`", function() {

      it("presents ✓", function() {
        expect(checkMarkFilter(true)).to.eq("✓");
        return expect(checkMarkFilter("this is true")).to.eq("✓");
      });

      return context("and `hideTruth` is set to true", () => it("presents nothing", function() {
        expect(checkMarkFilter(true, {hideTruth: true})).to.be.eq("");
        return expect(checkMarkFilter("this is true", {hideTruth: true})).to.be.eq("");
      }));
    });

    context("when the input evaluated to `false`", function() {

      it("presents ✘", function() {
        expect(checkMarkFilter(false)).to.eq("✘");
        expect(checkMarkFilter(null)).to.eq("✘");
        expect(checkMarkFilter(undefined)).to.eq("✘");
        return expect(checkMarkFilter(0)).to.eq("✘");
      });

      return context("and `hideFalse` is set to true", () => it("presents nothing", function() {
        expect(checkMarkFilter(false, {hideFalse: true})).to.be.eq("");
        return expect(checkMarkFilter(null, {hideFalse: true})).to.be.eq("");
      }));
    });

    return describe("usage in html templates", function() {

      let active = null;

      let $scope = null;
      let element = null;

      let template = null;
      before(() => template = "<div>active: {{user.active | checkMark}}</div>");

      beforeEach(inject(function($rootScope, $compile) {
        $scope = $rootScope.$new();
        $scope.user = {active};

        element = $compile(template)($scope);
        return $scope.$apply();
      })
      );

      context("on `true`", function() {
        before(() => active = true);

        it("displays tick", () => expect(element.text()).to.eq("active: ✓"));

        return context("when hide truth is requested", function() {
          before(() => template = "<div>active: {{ user.active | checkMark:{ hideTruth: true } }}</div>");

          return it("displays nothing", () => expect(element.text()).to.eq("active: "));
        });
      });

      return context("on `false`", function() {
        before(() => active = false);

        it("displays cross", () => expect(element.text()).to.eq("active: ✘"));

        return context("when hide false is requested", function() {
          before(() => template = "<div>active: {{ user.active | checkMark:{ hideFalse: true } }}</div>");

          return it("displays nothing", () => expect(element.text()).to.eq("active: "));
        });
      });
    });
  });
});
