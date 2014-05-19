describe "module: angleGrinder.forms", ->

  describe "controller: ConfirmationDialogCtrl", ->

    beforeEach ->
      module "angleGrinder.forms",
        $modalInstance: close: sinon.stub()

    $scope = null
    ctrl = null

    beforeEach inject ($rootScope, $controller) ->
      $scope = $rootScope.$new()
      ctrl = $controller "ConfirmationDialogCtrl",
        $scope: $scope
        message: "This is a test!"

    it "has the message", ->
      expect($scope.message).to.eq "This is a test!"

    describe "#close", ->

      describe "when the dialog was confirmed", ->

        it "closes the dialog", inject ($modalInstance) ->
          ctrl.close(true)
          expect($modalInstance.close).to.have.been.calledWith(true)

      describe "otherwise", ->

        it "closes the dialog", inject ($modalInstance) ->
          ctrl.close(false)
          expect($modalInstance.close).to.have.been.calledWith(false)

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
