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

  describe "#massUpdate", ->

    it "is mixed to the $scope", ->
      expect($scope.massUpdate).to.be.a "function"

    describe "when the massUpdate form is valid", ->
      beforeEach ->
        $scope.massUpdateForm = $valid: true, $invalid: false

        $scope.massUpdate(allowance: 123)
        $rootScope.$digest()

      it "updates the records", inject (Users) ->
        expect(Users.massUpdate).to.have.been.called
        expect(Users.massUpdate).to.have.been.calledWith(ids: [1, 2, 3], data: allowance: 123)

      it "does not reload a grid", ->
        expect(grid.reload).to.not.have.been.called

      it "updates data in the grid", ->
        expect(grid.updateRow).to.have.been.called
        expect(grid.updateRow).to.have.been.calledWith(100, id: 100, foo: "bar")

      it "flashes errored rows", ->
        expect(grid.flashOnError).to.have.been.called
        expect(grid.flashOnError).to.have.been.calledWith("101")

      it "closes a dialog", ->
        expect(dialog.close).to.have.been.called

  describe "#closeDialog", ->

    it "is mixed to the $scope", ->
      expect($scope.closeDialog).to.be.a "function"

    it "closes a dialog", ->
      # When
      $scope.closeDialog()

      # Then
      expect(dialog.close).to.have.been.called
