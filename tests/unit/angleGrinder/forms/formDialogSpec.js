import formsModule from 'angle-grinder/src/ng/legacy/forms'

describe("module: angleGrinder.forms", () => describe("service: FormDialogServ", function() {

  beforeEach(angular.mock.module("ui.bootstrap", function($provide) {
    $provide.value("$uibModal", {open: sinon.mock()});
  })
  );

  beforeEach(angular.mock.module(formsModule, function($provide) {
    $provide.value("pathWithContext", path => `/ctx${path}`);
  })
  );

  beforeEach(angular.mock.module(formsModule));

  return describe("#open", () => it("opens a dialog for the given templateUrl", inject(function($uibModal, FormDialogServ) {
    FormDialogServ.open("/foo/bar/form.html");

    expect($uibModal.open).to.have.been.called;

    const options = $uibModal.open.getCall(0).args[0];
    expect(options).to.have.property("templateUrl", "/ctx/foo/bar/form.html");
    return expect(options).to.have.property("controller", "FormDialogCtrl");
  })
  ));
}));
