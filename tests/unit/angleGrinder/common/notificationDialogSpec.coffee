describe "module: angleGrinder.common", ->

  describe "controller: NotificationDialogCtrl", ->

    beforeEach ->
      module "angleGrinder.common",
        $modalInstance: close: sinon.stub()

    $scope = null
    ctrl = null

    beforeEach inject ($rootScope, $controller) ->
      $scope = $rootScope.$new()
      ctrl = $controller "NotificationDialogCtrl",
        $scope: $scope
        options: message: "This is a notification!", okLabel: "OK"

    it "has the message", ->
      expect($scope.options.message).to.eq "This is a notification!"

    describe "#close", ->

      it "closes the dialog", inject ($modalInstance) ->
        ctrl.close()
        expect($modalInstance.close).to.have.been.called

  describe "service: confirmationDialog", ->

    beforeEach module "ui.bootstrap", ($provide) ->
      $provide.decorator "$modal", ($delegate) ->
        sinon.spy($delegate, "open")
        $delegate

      return

    beforeEach module "angleGrinder.forms"

    it "displays the notification", inject ($modal, notificationDialog) ->
      # When
      notificationDialog.open("test")

      # Then
      expect($modal.open).to.have.been.called

      options = $modal.open.getCall(0).args[0]
      expect(options).to.have.property "templateUrl", "templates/dialogs/notification.html"
      expect(options).to.have.property "controller", "NotificationDialogCtrl"
