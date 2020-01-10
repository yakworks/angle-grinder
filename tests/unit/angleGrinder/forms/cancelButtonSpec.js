/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.forms directive: agCancelButton", function() {
  beforeEach(angular.mock.module("angleGrinder.forms"));

  let element = null;
  let $scope = null;

  beforeEach(inject($injector => ({element, $scope} = compileTemplate(`\
<ag-cancel-button></ag-cancel-button>\
`, $injector)))
  );

  return it("create a cancel button", function() {
    expect(element.text()).to.contain("Cancel");
    return expect(element.hasClass("btn")).to.be.true;
  });
});
