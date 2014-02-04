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

    dialog = sinon.stub(close: ->)
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
        $rootScope.$apply -> $scope.massUpdate(allowance: 123)

      it "updates the records", inject (Users) ->
        expect(Users.massUpdate.called).to.be.true
        expect(Users.massUpdate.calledWith(ids: [1, 2, 3], data: allowance: 123)).to.be.true

      it "does not reload a grid", ->
        expect(grid.reload.called).to.not.be.true

      it "updates data in the grid", ->
        expect(grid.updateRow.called).to.be.true
        expect(grid.updateRow.calledWith(100, id: 100, foo: "bar")).to.be.true

      it "flashes errored rows", ->
        expect(grid.flashOnError.called).to.be.true
        expect(grid.flashOnError.calledWith("101")).to.be.true

      it "closes a dialog", ->
        expect(dialog.close.called).to.be.true

  describe "#closeDialog", ->

    it "is mixed to the $scope", ->
      expect($scope.closeDialog).to.be.a "function"

    it "closes a dialog", ->
      # When
      $scope.closeDialog()

      # Then
      expect(dialog.close.called).to.be.true
