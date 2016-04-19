describe "module: angleGrinder.forms", ->

  describe "service: FormDialogServ", ->

    beforeEach module "ui.bootstrap", ($provide) ->
      $provide.value "$uibModal", open: sinon.mock()
      return

    beforeEach module "angleGrinder.common", ($provide) ->
      $provide.value "pathWithContext", (path) -> "/ctx#{path}"
      return

    beforeEach module "angleGrinder.forms"

    describe "#open", ->

      it "opens a dialog for the given templateUrl", inject ($uibModal, FormDialogServ) ->
        FormDialogServ.open("/foo/bar/form.html")

        expect($uibModal.open).to.have.been.called

        options = $uibModal.open.getCall(0).args[0]
        expect(options).to.have.property "templateUrl", "/ctx/foo/bar/form.html"
        expect(options).to.have.property "controller", "FormDialogCtrl"
