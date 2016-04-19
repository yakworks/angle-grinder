describe "module: angleGrinder.common", ->

  describe "controller: NotificationDialogCtrl", ->
    $scope = null
    ctrl = null

    beforeEach inject ($rootScope, $controller) ->
      $scope = $rootScope.$new()
      ctrl = $controller "NotificationDialogCtrl",
        $scope: $scope
        options: message: "This is a notification!", okLabel: "OK"

    it "has the message", ->
      expect($scope.options.message).to.eq "This is a notification!"

  describe "service: NotificationDialogServ", ->

    beforeEach module "angleGrinder.forms"

    it "displays the notification", inject ( NotificationDialogServ) ->
      # When
      NotificationDialogServ.open("Test message for notification!")

      # Then
      text = document.querySelector('.sweet-alert h2')
      expect(text.textContent).to.eq("Test message for notification!")
      canselButton = document.querySelector('.sweet-alert button.cancel')
      expect(canselButton.style.display).to.eq("none")
      okButton = document.querySelector('.sweet-alert button.confirm')
      expect(okButton.textContent).to.eq("Ok")

    it "displays the notification with custom ok button", inject ( NotificationDialogServ) ->
      # When
      NotificationDialogServ.open({message: "Test message for notification!", okLabel: "testOK"})

      # Then
      text = document.querySelector('.sweet-alert h2')
      expect(text.textContent).to.eq("Test message for notification!")
      canselButton = document.querySelector('.sweet-alert button.cancel')
      expect(canselButton.style.display).to.eq("none")
      okButton = document.querySelector('.sweet-alert button.confirm')
      expect(okButton.textContent).to.eq("testOK")