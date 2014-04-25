describe "module: angleGrinder.forms", ->

  describe "controller: FormDialogCtrl", ->

    beforeEach module "angleGrinder.forms", ($provide) ->
      $provide.value "serverValidationErrorsHandler", sinon.mock()
      return

    $scope = null

    dialog = null
    item = null
    grid = null

    beforeEach inject ($rootScope, $controller) ->
      $scope = $rootScope.$new()

      # mock services

      dialog = close: sinon.mock()

      item =
        id: 567
        persisted: sinon.mock(), resourceName: sinon.mock()
        save: sinon.mock(), delete: sinon.mock()

      grid = saveRow: sinon.mock(), removeRow: sinon.mock()

      # instantiate the controller

      $controller "FormDialogCtrl",
        $scope: $scope

        dialog: dialog
        item: item
        grid: grid

    it "assigns an item to the scope", ->
      expect($scope.item).to.not.be.undefied

    it "assigns `createNew` variable to the scope", ->
      expect($scope.createNew).to.not.be.undefined
      expect($scope.createNew).to.be.tre

    describe "#closeDialog", ->

      it "closes a dialog", ->
        $scope.closeDialog()

        expect(dialog.close).to.have.been.called
        expect(dialog.close).to.have.been.calledWith(item)

    describe "#save", ->
      form = null

      describe "when the form is valid", ->
        beforeEach ->
          item.save.returns($promise: true)
          form = $valid: true, $invalid: false

        it "returns a promise", ->
          expect($scope.save(form, item)).to.be.true

        describe "on success", ->
          response = null

          beforeEach ->
            response = id: 567
            item.save.yieldsTo("success", response).returns($promise: true)

            $scope.save(form, item)

          it "updates a row inside the grid", ->
            expect(grid.saveRow).to.have.been.called
            expect(grid.saveRow).to.have.been.calledWith(567, response)

          it "closes the dialog", ->
            expect(dialog.close).to.have.been.called

        describe "on error", ->
          response = null

          beforeEach ->
            item.resourceName.returns "fooBar"
            response = id: 567
            item.save.yieldsTo("error", response).returns($promise: true)

            $scope.save(form, item)

          it "displays server side errors", inject (serverValidationErrorsHandler) ->
            expect(serverValidationErrorsHandler).to.have.been.called
            expect(serverValidationErrorsHandler).to.have.been.calledWith(form, response, "fooBar")

      describe "when the form is not valid", ->
        beforeEach -> form = $valid: false, $invalid: true

        it "does nothing", ->
          $scope.save(form, item)

          expect(item.save).to.have.not.been.called
          expect(dialog.close).to.have.not.been.called

    describe "#delete", ->

      it "returns a promise", ->
        item.delete.returns($promise: true)
        expect($scope.delete()).to.be.true

      describe "on success", ->
        beforeEach ->
          response = new Object()
          item.delete.yieldsTo("success", response).returns($promise: true)
          $scope.delete()

        it "removes a row from the grid", ->
          expect(grid.removeRow).to.have.been.called
          expect(grid.removeRow).to.have.been.calledWith(567)

        it "closes the dialog", ->
          expect(dialog.close.called).to.be.true

      describe "on error", ->
        beforeEach ->
          response = id: 567
          item.delete.yieldsTo("error", response).returns($promise: true)

        it "does not remove a row from the grid", ->
          expect(grid.removeRow.called).to.be.false
          expect(grid.removeRow.calledWith(567)).to.be.false

        it "does not close the dialog", ->
          expect(dialog.close.called).to.be.false
