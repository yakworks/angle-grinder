describe "module: angleGrinder.forms", ->
  beforeEach module("angleGrinder.forms")

  describe "service: confirmationDialog", ->

    modalSpy = null
    beforeEach inject ($modal) ->
      modalSpy = sinon.spy($modal, "open")

    it "displays the confirmation", inject (confirmationDialog) ->
      # When
      confirmationDialog.open()

      # Then
      expect(modalSpy.called).toBeTruthy()

      args = modalSpy.args[0][0]
      expect(args.templateUrl).toEqual "templates/dialogs/confirmation.html"
      expect(args.controller).toEqual "ConfirmationDialogCtrl"
