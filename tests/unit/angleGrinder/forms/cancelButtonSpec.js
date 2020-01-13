import formsModule from '~/scripts/forms'
import compileTemplate from '../../helpers/compileTemplate'

describe("module: angleGrinder.forms directive: agCancelButton", function() {
  beforeEach(angular.mock.module(formsModule));

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
