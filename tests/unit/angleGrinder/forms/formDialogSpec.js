/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.forms", () => describe("service: FormDialogServ", function() {

  beforeEach(angular.mock.module("ui.bootstrap", function($provide) {
    $provide.value("$uibModal", {open: sinon.mock()});
  })
  );

  beforeEach(angular.mock.module("angleGrinder.common", function($provide) {
    $provide.value("pathWithContext", path => `/ctx${path}`);
  })
  );

  beforeEach(angular.mock.module("angleGrinder.forms"));

  return describe("#open", () => it("opens a dialog for the given templateUrl", inject(function($uibModal, FormDialogServ) {
    FormDialogServ.open("/foo/bar/form.html");

    expect($uibModal.open).to.have.been.called;

    const options = $uibModal.open.getCall(0).args[0];
    expect(options).to.have.property("templateUrl", "/ctx/foo/bar/form.html");
    return expect(options).to.have.property("controller", "FormDialogCtrl");
  })
  ));
}));
