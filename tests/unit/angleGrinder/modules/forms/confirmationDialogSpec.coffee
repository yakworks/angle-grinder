describe "module: angleGrinder.forms", ->

  describe "service: confirmationDialog", ->

    beforeEach module "ui.bootstrap", ($provide) ->
      $provide.decorator "$modal", ($delegate) ->
        sinon.spy($delegate, "open")
        $delegate

      return

    beforeEach module "angleGrinder.forms"

    it "displays the confirmation", inject ($modal, confirmationDialog) ->
      # When
      confirmationDialog.open()

      # Then
      expect($modal.open).to.have.been.called

      options = $modal.open.getCall(0).args[0]
      expect(options).to.have.property "templateUrl", "templates/dialogs/confirmation.html"
      expect(options).to.have.property "controller", "ConfirmationDialogCtrl"
