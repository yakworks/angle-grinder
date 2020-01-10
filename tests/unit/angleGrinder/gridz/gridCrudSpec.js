/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module:angleGrinder.gridz", () => describe("directive: gridCrud", function() {

  beforeEach(angular.mock.module("angleGrinder.gridz", function($provide) {
    let element;
    $provide.value("$uibModal", {open: sinon.stub().returns({rendered: {then: sinon.stub()}})});
    return;

    const $scope = null;
    return element = null;
  })
  );

  return it("applies custom classes", inject(function($rootScope, $compile, $uibModal) {
    const $scope = $rootScope.$new();
    $scope.gridOptions = {};
    let element = angular.element(`\
<div>
<div grid-crud
     is-modal="true"
     modal-options='{"windowClass":"custom-modal-dialog", "backdropClass":"transparent-backdrop"}'
     template="/payment/formTemplate"
     resource="payment"
     grid-name="grid"
     before-save="beforeSave">
</div>
</div>\
`
    );
    element = $compile(element)($scope);
    $rootScope.$apply();

    $scope.createPayment();

    expect($uibModal.open).to.have.been.called;
    const options = $uibModal.open.getCall(0).args[0];
    expect(options.windowClass).to.not.be.undefined;
    expect(options.windowClass).to.include("custom-modal-dialog");
    expect(options.backdropClass).to.not.be.undefined;
    return expect(options.backdropClass).to.include("transparent-backdrop");
  })
  );
}));
