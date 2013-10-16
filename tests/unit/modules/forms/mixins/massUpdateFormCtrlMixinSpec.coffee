describe "module: angleGrinder.forms mixin: massUpdateFormCtrlMixin", ->

  beforeEach module "angleGrinder.resources", ($provide) ->
    $provide.decorator "Users", ($delegate, $q) ->
      deferred = $q.defer()
      deferred.resolve() # always resolved

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
    grid = sinon.stub(reload: ->)
    massUpdateFormCtrlMixin($scope, dialog, Users, selectedIds, grid)

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

      it "reloads a grid", ->
        expect(grid.reload.called).to.be.true

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
