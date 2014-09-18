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
        options: message: "This is a test!"

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
      $provide.decorator "$modal", ($delegate) ->
        sinon.spy($delegate, "open")
        return $delegate

      return

    beforeEach module "angleGrinder.forms"

    itOpensModalWindow = ->
      it "opens a modal window", inject ($modal) ->
        expect($modal.open).to.have.been.called

      it "opens a modal window with valid options", inject ($modal) ->
        options = $modal.open.lastCall.args[0]

        expect(options).to.have.property "template"
        expect(options).to.have.property "controller", "ConfirmationDialogCtrl as ctrl"

        expect(options.keyboard).to.be.false
        expect(options.backdrop).to.eq "static"

    itHasValidConfirmationMessage = (message) ->
      it "has valid confirmation message", inject ($modal) ->
        options = $modal.open.lastCall.args[0]
        expect(options.resolve.options()).to.have.property "message", message

    describe "when arguments are not given", ->

      beforeEach inject (confirmationDialog) ->
        confirmationDialog.open()

      itOpensModalWindow()
      itHasValidConfirmationMessage("Are you sure?")

    describe "when the confirmation message is specified", ->

      beforeEach inject (confirmationDialog) ->
        confirmationDialog.open("Are you really sure?")

      itOpensModalWindow()
      itHasValidConfirmationMessage("Are you really sure?")

    describe "when the confirmation message is specified as an opton", ->

      beforeEach inject (confirmationDialog) ->
        confirmationDialog.open(message: "Are you absolutelly really sure?")

      itOpensModalWindow()
      itHasValidConfirmationMessage("Are you absolutelly really sure?")

    describe "when the options does not contain a massage", ->

      beforeEach inject (confirmationDialog) ->
        confirmationDialog.open(foo: "bar")

      itOpensModalWindow()
      itHasValidConfirmationMessage("Are you sure?")
