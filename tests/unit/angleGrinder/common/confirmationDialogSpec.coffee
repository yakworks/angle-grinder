describe "module: angleGrinder.common", ->

  describe "controller: ConfirmationDialogCtrl", ->

    beforeEach ->
      module "angleGrinder.common",
        $modalInstance: close: sinon.stub()

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
      $provide.decorator "$uibModal", ($delegate) ->
        sinon.spy($delegate, "open")
        return $delegate

      return

    beforeEach module "angleGrinder.forms"

    itOpensModalWindow = ->
      it "opens a modal window", inject ($uibModal) ->
        expect($uibModal.open).to.have.been.called

      it "opens a modal window with valid options", inject ($uibModal) ->
        modalOptions = $uibModal.open.lastCall.args[0]

        expect(modalOptions).to.have.property "template"
        expect(modalOptions).to.have.property "controller", "ConfirmationDialogCtrl as ctrl"

        expect(modalOptions.keyboard).to.be.false
        expect(modalOptions.backdrop).to.eq "static"

    itHasValidConfirmationMessage = (message) ->
      it "has valid confirmation message", inject ($uibModal) ->
        modalOptions = $uibModal.open.lastCall.args[0]
        expect(modalOptions.resolve.options()).to.have.property "message", message

    itHasValidButtonLabels = (labels = {}) ->
      labels.cancelLabel ?= "Cancel"
      labels.okLabel ?= "Ok"

      it "has default button labels", inject ($uibModal) ->
        modalOptions = $uibModal.open.lastCall.args[0]
        options = modalOptions.resolve.options()

        expect(options).to.have.property "cancelLabel", labels.cancelLabel
        expect(options).to.have.property "okLabel", labels.okLabel

    describe "when arguments are not given", ->

      beforeEach inject (confirmationDialog) ->
        confirmationDialog.open()

      itOpensModalWindow()
      itHasValidConfirmationMessage("Are you sure?")
      itHasValidButtonLabels()

    it "return promise", inject (confirmationDialog) ->
      r = confirmationDialog.open()
      expect(r).to.be.an('object')
      expect(r).to.respondTo('then')

    describe "when the confirmation message is specified", ->

      beforeEach inject (confirmationDialog) ->
        confirmationDialog.open("Are you really sure?")

      itOpensModalWindow()
      itHasValidConfirmationMessage("Are you really sure?")
      itHasValidButtonLabels()

    describe "when the confirmation message is specified as an opton", ->

      beforeEach inject (confirmationDialog) ->
        confirmationDialog.open(message: "Are you absolutelly really sure?")

      itOpensModalWindow()
      itHasValidConfirmationMessage("Are you absolutelly really sure?")
      itHasValidButtonLabels()

    describe "when the options does not contain a massage", ->

      beforeEach inject (confirmationDialog) ->
        confirmationDialog.open(foo: "bar")

      itOpensModalWindow()
      itHasValidConfirmationMessage("Are you sure?")
      itHasValidButtonLabels()

    describe "when `cancel` button label is overriden", ->

      beforeEach inject (confirmationDialog) ->
        confirmationDialog.open(cancelLabel: "No, don't do it!")

      itOpensModalWindow()
      itHasValidConfirmationMessage("Are you sure?")
      itHasValidButtonLabels(cancelLabel: "No, don't do it!", okLabel: "Ok")

    describe "when `ok` button label is overriden", ->

      beforeEach inject (confirmationDialog) ->
        confirmationDialog.open(okLabel: "Yes, I'm sure!")

      itOpensModalWindow()
      itHasValidConfirmationMessage("Are you sure?")
      itHasValidButtonLabels(cancelLabel: "Cancel", okLabel: "Yes, I'm sure!")

    describe "when both labels are overriden", ->

      beforeEach inject (confirmationDialog) ->
        confirmationDialog.open(cancelLabel: "Nooooo", okLabel: "Oh yesss")

      itOpensModalWindow()
      itHasValidConfirmationMessage("Are you sure?")
      itHasValidButtonLabels(cancelLabel: "Nooooo", okLabel: "Oh yesss")
