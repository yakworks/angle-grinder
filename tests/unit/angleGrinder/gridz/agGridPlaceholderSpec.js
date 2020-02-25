import agGridz from 'angle-grinder/src/ng/gridz'

describe("module: angleGrinder.gridz", function() {

  beforeEach(angular.mock.module(agGridz, function($provide) {
    $provide.value("pathWithContext", path => `/foo/${path}`);
  })
  );

  beforeEach(inject($templateCache => $templateCache.put("/foo/bar/biz.html", "<div id='the-grid'>grid</div>"))
  );

  return describe("directive: agGridPlaceholder", function() {

    let $scope = null;

    let elementTemplate = null;
    let element = null;
    let elementScope = null;

    before(() => elementTemplate = `\
<ag-grid-placeholder src="bar/biz.html"></ag-grid-placeholder>\
`);

    // compile the directive
    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();

      element = $compile(elementTemplate, $scope)($scope);
      elementScope = element.scope();

      return $rootScope.$digest();
    })
    );

    it("initially does not render the grid", () => expect(elementScope.renderGrid).to.be.false);

    it("initially hides the grid", () => expect(elementScope.showGrid).to.be.false);

    it("assings valid template url to the scope", () => expect(elementScope.templateSrc).to.eq("/foo/bar/biz.html"));

    context("on route change", function() {

      const changeRouteTo = path => inject($rootScope => $rootScope.$apply(() => $rootScope.$broadcast("$routeChangeSuccess", {originalPath: path})));

      it("renders the grid only once", function() {
        expect(elementScope.renderGrid).to.be.false;

        changeRouteTo("/");
        expect(elementScope.renderGrid).to.be.true;

        changeRouteTo("/show/123");
        return expect(elementScope.renderGrid).to.be.true;
      });

      context("to the other page", () => it("hides the grid", function() {
        changeRouteTo("/show/123");

        expect(elementScope.renderGrid).to.be.false;
        return expect(elementScope.showGrid).to.be.false;
      }));

      return context("to the root page", () => it("shows the grid", function() {
        changeRouteTo("/");

        expect(elementScope.renderGrid).to.be.true;
        expect(elementScope.showGrid).to.be.true;

        return expect(element.find("#the-grid").text()).to.eq("grid");
      }));
    });

    return context("when `forceRenderGrid` attribute is given", function() {

      context("and it is set to `true`", function() {
        before(() => elementTemplate = `\
<ag-grid-placeholder src="bar/biz.html" force-render-grid="true"></ag-grid-placeholder>\
`);

        return it("initially forces to render the grid", () => expect(elementScope.renderGrid).to.be.true);
      });

      return context("adn is is set to `false`", function() {
        before(() => elementTemplate = `\
<ag-grid-placeholder src="bar/biz.html" force-render-grid="false"></ag-grid-placeholder>\
`);

        return it("initially does not render the grid", () => expect(elementScope.renderGrid).to.be.false);
      });
    });
  });
});
