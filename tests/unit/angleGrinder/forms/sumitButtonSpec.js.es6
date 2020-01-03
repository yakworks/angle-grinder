/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.forms directive: agSubmitButton", function() {

  beforeEach(module("angleGrinder.forms"));

  let $scope = null;
  let element = null;
  let $http = null;

  beforeEach(inject(function($rootScope, $injector, _$http_) {
    $http = _$http_;

    $scope = $rootScope.$new();
    ({element, $scope} = compileTemplate(`\
<form name="theForm">
  <ag-submit-button></ag-submit-button>
</form>\
`, $injector));

    return element = element.find("button[type=submit]");
  })
  );

  const itIsEnabled = () => it("is enabled", () => expect(element.prop("disabled")).to.be.false);

  it("has valid label", () => expect(element.text()).to.contain("Save"));

  itIsEnabled();

  describe("disabling / enabling", function() {

    describe("when the request is in progress", function() {
      beforeEach(() => $scope.$apply(() => $scope.theForm.$saving = true));

      it("is disabled", () => expect(element.prop("disabled")).to.be.true);

      return it("changes the button label", () => expect(element.text()).to.contain("Save..."));
    });

    return describe("when the request is not in progress", function() {
      beforeEach(() => $scope.$apply(() => $scope.theForm.$saving = false));

      return itIsEnabled();
    });
  });

  return describe(" submit button in modal", function() {
    beforeEach(inject(function($rootScope, $injector, _$http_) {

      $scope = $rootScope.$new();
      ({element, $scope} = compileTemplate(`\
<div modal-window style="position: absolute">
       <form name="testForm">
         <ag-submit-button></ag-submit-button>
       </form>
 </div>\
`, $injector));
      return element = element.find("button[type=submit]");
    })
    );

    return describe("when the request is in progress", function() {
      beforeEach(() => $scope.$apply(() => $scope.testForm.$saving = true));

      return it("is disabled after saving is finished", function() {
        beforeEach(() => $scope.$apply(() => $scope.testForm.$saving = false));
        return expect(element.prop("disabled")).to.be.true;
      });
    });
  });
});