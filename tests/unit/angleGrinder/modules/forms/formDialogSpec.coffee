describe "module: angleGrinder.forms", ->

  describe "service: formDialog", ->

    beforeEach module "ui.bootstrap", ($provide) ->
      $provide.value "$modal", open: sinon.mock()
      return

    beforeEach module "angleGrinder.common", ($provide) ->
      $provide.value "pathWithContext", (path) -> "/ctx#{path}"
      return

    beforeEach module "angleGrinder.forms"

    describe "#open", ->

      it "opens a dialog for the given templateUrl", inject ($modal, formDialog) ->
        formDialog.open("/foo/bar/form.html")

        expect($modal.open).to.have.been.called

        options = $modal.open.getCall(0).args[0]
        expect(options).to.have.property "templateUrl", "/ctx/foo/bar/form.html"
        expect(options).to.have.property "controller", "FormDialogCtrl"
