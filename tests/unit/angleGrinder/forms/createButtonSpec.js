import formsModule from 'angle-grinder/src/ng/legacy/forms'
import compileTemplate from '../../helpers/compileTemplate'

describe("module: angleGrinder.forms directive: agCreateButton", function() {
  beforeEach(angular.mock.module(formsModule));

  let element = null;
  let $scope = null;

  beforeEach(inject(function($rootScope) {
    $scope = $rootScope.$new();
    return $scope.foo = sinon.stub();
  })
  );

  const itHasTheFollowingHref = href => it("generates a link with valid `href`", () => expect(element.attr("href")).to.equal(href));

  const itHasValidCssClass = () => it("has valid css class", () => expect(element.hasClass("btn")).to.be.true);

  const itHasANiceIcon = () => it("has a nice icon", () => expect(element.find("i").hasClass("fa-pencil-square-o")).to.be.true);

  const itOnClickCallsTheScopeMethod = () => describe("on click", () => it("calls the given scope method", function() {
    // When
    element.click();
    // Then
    return expect($scope.foo).to.have.been.called;
  }));

  describe("without a custom label", function() {
    beforeEach(inject($injector => ({element} = compileTemplate(`\
<ag-create-button href="#/users/create" ng-click="foo()" />\
`, $injector, $scope)))
    );

    itHasTheFollowingHref("#/users/create");
    itHasValidCssClass();
    itHasANiceIcon();
    itOnClickCallsTheScopeMethod();

    return it("has the default label", () => expect($.trim(element.text())).to.equal("Create"));
  });

  return describe("with the custom label", function() {
    beforeEach(inject($injector => ({element} = compileTemplate(`\
<ag-create-button href="#/projects/create" ng-click="foo()">Create user</ag-create-button>\
`, $injector, $scope)))
    );

    itHasTheFollowingHref("#/projects/create");
    itHasValidCssClass();
    itHasANiceIcon();
    itOnClickCallsTheScopeMethod();

    return it("has the custom label", () => expect($.trim(element.text())).to.equal("Create user"));
  });
});
