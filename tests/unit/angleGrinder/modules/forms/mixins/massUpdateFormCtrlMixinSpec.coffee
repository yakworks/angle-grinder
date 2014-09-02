describe "module: angleGrinder.forms mixin: massUpdateFormCtrlMixin", ->

  beforeEach module "exampleApp.resources", ($provide) ->
    $provide.decorator "Users", ($delegate, $q) ->
      deferred = $q.defer()

      # always resolved
      deferred.resolve
        data: [{ id: 100, foo: "bar" }],
        errors:
          "101": { foo: "bar"}

      sinon.stub($delegate, "massUpdate").returns $promise: deferred.promise
      $delegate

  beforeEach module "angleGrinder.forms"

  $rootScope = null
  $scope = null

  dialog = null
  grid = null

  beforeSave = null

  beforeEach inject (_$rootScope_, massUpdateFormCtrlMixin, Users) ->
    $rootScope = _$rootScope_
    $scope = $rootScope.$new()

    dialog = sinon.stub(close: angular.noop)
    selectedIds = [1, 2, 3]
    grid = sinon.stub
      reload: angular.noop,
      updateRow: angular.noop,
      flashOnError: ->

    massUpdateFormCtrlMixin $scope,
      dialog: dialog
      Resource: Users
      selectedIds: selectedIds
      grid: grid
      beforeSave: beforeSave

  describe "#massUpdate", ->

    records = {}
    beforeEach -> records = allowance: 123

    it "is mixed to the $scope", ->
      expect($scope.massUpdate).to.be.a "function"

    it "returns a promise", ->
      promise = $scope.massUpdate(records)

      expect(promise.then).to.be.a "function"
      expect(promise.catch).to.be.a "function"
      expect(promise.finally).to.be.a "function"

    describe "when the massUpdate form is valid", ->

      beforeEach ->
        $scope.massUpdate(records)
        $rootScope.$digest()

      it "updates the records", inject (Users) ->
        expect(Users.massUpdate).to.have.been.called
        expect(Users.massUpdate).to.have.been.calledWith(ids: [1, 2, 3], data: allowance: 123)

      it "does not reload a grid", ->
        expect(grid.reload).to.not.have.been.called

      it "updates data in the grid", ->
        expect(grid.updateRow).to.have.been.called
        expect(grid.updateRow).to.have.been.calledWith(100, id: 100, foo: "bar")

      it "flashes rows with errors", ->
        expect(grid.flashOnError).to.have.been.called
        expect(grid.flashOnError).to.have.been.calledWith("101")

      it "closes a dialog", ->
        expect(dialog.close).to.have.been.called

      describe "when `beforeSave` callback is given", ->

        before ->
          beforeSave = (records) ->
            records.allowance += 200
            return records

        it "uses it to transform the data", inject (Users) ->
          expect(Users.massUpdate).to.have.been.called
          expect(Users.massUpdate).to.have.been.calledWith(ids: [1, 2, 3], data: allowance: 323)

          data = Users.massUpdate.getCall(0).args[0].data
          expect(data.allowance).to.eq 323

        it "does not change the original records", ->
          expect(records.allowance).to.eq 123

  describe "#closeDialog", ->

    it "is mixed to the $scope", ->
      expect($scope.closeDialog).to.be.a "function"

    it "closes a dialog", ->
      # When
      $scope.closeDialog()

      # Then
      expect(dialog.close).to.have.been.called
