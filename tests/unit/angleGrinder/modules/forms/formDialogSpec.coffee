describe "module: angleGrinder.forms", ->

  describe "service: formDialog", ->

    beforeEach module "ui.bootstrap", ($provide) ->
      $provide.value "$dialog", dialog: sinon.mock()
      return

    beforeEach module "angleGrinder.common", ($provide) ->
      $provide.value "pathWithContext", (path) -> "/ctx#{path}"
      return

    beforeEach module "angleGrinder.forms"

    describe "#open", ->
      dialog = null

      beforeEach inject ($dialog) ->
        dialog = open: sinon.mock()
        $dialog.dialog.returns(dialog)

      it "opens a dialog for the given templateUrl", inject (formDialog) ->
        formDialog.open("/foo/bar/form.html")

        expect(dialog.open).to.have.been.called
        expect(dialog.open).to.have.been.calledWith("/ctx/foo/bar/form.html", "FormDialogCtrl")
