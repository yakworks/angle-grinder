describe "module: angleGrinder.forms", ->

  beforeEach module "angleGrinder.forms"

  describe "service: confirmationDialog", ->

    it "displays the confirmation", inject ($modal, confirmationDialog) ->
      # Given
      sinon.spy($modal, "open")

      # When
      confirmationDialog.open()

      # Then
      expect($modal.open).to.have.been.called

      options = $modal.open.getCall(0).args[0]
      expect(options).to.have.property "templateUrl", "templates/dialogs/confirmation.html"
      expect(options).to.have.property "controller", "ConfirmationDialogCtrl"
