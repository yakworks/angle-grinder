describe "module: angleGrinder.common", ->

  describe "controller: ConfirmationDialogCtrl", ->
    $scope = null
    ctrl = null

    beforeEach inject ($rootScope, $controller, _$q_) ->
      $scope = $rootScope.$new()
      ctrl = $controller "ConfirmationDialogCtrl",
        $scope: $scope
        options: message: "This is a test!"
        defer: _$q_.defer()

    it "has the message", ->
      expect(ctrl.options).to.have.property "message", "This is a test!"

    it "displays the confirmation with custom text", inject ( notificationDialog) ->
      # When
      notificationDialog.open("Test message for notification!")

      # Then
      text = document.querySelector('.sweet-alert h2')
      expect(text.textContent).to.eq("Test message for notification!")
      canselButton = document.querySelector('.sweet-alert button.cancel')
      expect(canselButton.textContent).to.eq("Cancel")
      okButton = document.querySelector('.sweet-alert button.confirm')
      expect(okButton.textContent).to.eq("Ok")

    it "displays the confirmation with custom ok button", inject ( notificationDialog) ->
      # When
      notificationDialog.open({message: "Test message for notification!", okLabel: "testOK"})

      # Then
      text = document.querySelector('.sweet-alert h2')
      expect(text.textContent).to.eq("Test message for notification!")
      canselButton = document.querySelector('.sweet-alert button.cancel')
      expect(canselButton.textContent).to.eq("Cancel")
      okButton = document.querySelector('.sweet-alert button.confirm')
      expect(okButton.textContent).to.eq("testOK")
