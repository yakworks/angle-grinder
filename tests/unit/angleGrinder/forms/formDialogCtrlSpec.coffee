describe "module: angleGrinder.forms", ->

  beforeEach module "angleGrinder.forms"

  describe "controller: FormDialogCtrl", ->
    $scope = null

    $modalInstance = null
    record = null
    grid = null

    beforeEach inject ($rootScope, $controller) ->
      $scope = $rootScope.$new()

      # mock services

      $modalInstance = close: sinon.stub()

      record =
        id: 567
        resourceName: -> "account"
        $save: sinon.stub(), delete: sinon.stub()

      grid = saveRow: sinon.stub(), removeRow: sinon.stub()

      # instantiate the controller

      $controller "FormDialogCtrl",
        $scope: $scope

        $modalInstance: $modalInstance
        dialogOptions:
          record: record
          grid: grid

    it "assigns an instance to the scope", ->
      expect($scope.account).to.not.be.undefied

    describe "#closeDialog", ->

      it "closes a dialog", ->
        $scope.closeDialog()

        expect($modalInstance.close).to.have.been.called
        expect($modalInstance.close).to.have.been.calledWith(record)

    describe "#save", ->

      describe "when the form is valid", ->

        it "returns a promise along with the record", inject ($q) ->
          deferred = $q.defer()
          record.$save.returns(deferred.promise)

          [promise, record] = $scope.save(record)

          expect(promise.then).to.be.a "function"
          expect(promise.catch).to.be.a "function"
          expect(promise.finally).to.be.a "function"

          expect(record).to.deep.eq(record)

        describe "on success", ->

          beforeEach inject ($q) ->
            deferred = $q.defer()
            deferred.resolve(record)
            record.$save.returns(deferred.promise)

            $scope.save(record)
            $scope.$digest()

          it "updates a row inside the grid", ->
            expect(grid.saveRow).to.have.been.called
            expect(grid.saveRow).to.have.been.calledWith(567, record)

          it "closes the dialog", ->
            expect($modalInstance.close).to.have.been.called

    describe "#delete", ->

      it "returns a promise", ->
        promise = then: angular.noop, catch: angular.noop
        record.delete.returns(promise)
        expect($scope.delete()).to.deep.eq promise

      describe "on success", ->
        beforeEach ->
          promise =
            then: sinon.stub().yields({ id: 567 })
            catch: angular.noop
          record.delete.returns(promise)

          $scope.delete()
          $scope.$digest()

        it "removes a row from the grid", ->
          expect(grid.removeRow).to.have.been.called
          expect(grid.removeRow).to.have.been.calledWith(567)

        it "closes the dialog", ->
          expect($modalInstance.close.called).to.be.true

      describe "on error", ->
        beforeEach ->
          promise =
            then: angular.noop
            catch: sinon.stub().yields({})
          record.delete.returns(promise)

          $scope.delete()
          $scope.$digest()

        it "does not remove a row from the grid", ->
          expect(grid.removeRow.called).to.be.false

        it "does not close the dialog", ->
          expect($modalInstance.close.called).to.be.false
