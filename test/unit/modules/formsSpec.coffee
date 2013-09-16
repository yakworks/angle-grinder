describe "module: angleGrinder.forms", ->
  beforeEach module("angleGrinder.forms")

  $rootScope = null

  beforeEach inject (_$rootScope_) ->
    $rootScope = _$rootScope_

  describe "controller: ConfirmationDialogCtrl", ->

    $scope = null
    modalInstanceStub = null

    beforeEach inject ($controller) ->
      $scope = $rootScope.$new()
      modalInstanceStub = sinon.stub(close: angular.noop)

      $controller "ConfirmationDialogCtrl",
        $scope: $scope
        $modalInstance: modalInstanceStub
        message: "Execute order 66?"

    it "assigns a message to the scope", ->
      expect($scope.message).toEqual "Execute order 66?"

    describe "#close", ->

      it "is defined", ->
        expect($scope.close).toBeDefined()

      it "closes a dialog", ->
        # When
        $scope.close("this is a boolean value")

        # Then
        stub = modalInstanceStub.close
        expect(stub.called).toBeTruthy()
        expect(stub.calledWith("this is a boolean value")).toBeTruthy()

  describe "service: confirmationDialog", ->

    modalSpy = null

    beforeEach inject (_$rootScope_, $modal) ->
      modalSpy = sinon.spy($modal, "open")

    dismiss = (modal, reason = "closing in test") ->
      modal.dismiss(reason)
      $rootScope.$apply()

    describe "#open", ->

      it "opens the confirmation dialog", inject (confirmationDialog) ->
        # When
        confirmationDialog.open()

        # Then
        expect(modalSpy.called).toBeTruthy()

        args = modalSpy.args[0][0]
        expect(args.templateUrl).toEqual "templates/dialogs/confirmation.html"
        expect(args.controller).toEqual "ConfirmationDialogCtrl"

      describe "confirmation message", ->

        beforeEach ->
          @addMatchers toHaveModalOpenWithMessage: (message) ->
            $rootScope.$digest()
            actual = @actual.find("body > div.modal div.modal-body").text()

            @message = "Expected '#{angular.mock.dump(actual)}' to be open with '#{message}'."

            actual is message

        describe "when it is not provided", ->

          it "displays default message", inject (confirmationDialog, $document) ->
            # When
            instance = confirmationDialog.open()

            # Then
            expect($document).toHaveModalOpenWithMessage("Are you sure?")

            dismiss(instance)

        describe "otherwise", ->

          it "displays custom message", inject (confirmationDialog, $document) ->
            # When
            instance = confirmationDialog.open("This is custom message...")

            # Then
            expect($document).toHaveModalOpenWithMessage("This is custom message...")

            dismiss(instance)
