describe "controller: users.MassUpdateFormCtrl", ->
  beforeEach module("angleGrinder")

  $scope = null
  usersStub  = null
  dialogStub = null
  gridStub = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    usersStub = sinon.stub(massUpdate: angular.noop)
    dialogStub = sinon.stub(close: angular.noop)
    gridStub = sinon.stub(reload: angular.noop)

    $scope.massUpdateForm = $invalid: false

    $controller "users.MassUpdateFormCtrl",
      $scope: $scope
      Users: usersStub
      dialog: dialogStub
      selectedIds: [1, 2, 3]
      grid: gridStub

  describe "#save", ->
    beforeEach inject ($q, $rootScope) ->
      deferred = $q.defer()
      deferred.resolve() # always resolved
      usersStub.massUpdate.returns($promise: deferred.promise)

      $scope.save(allowance: 123)
      $rootScope.$apply() # promises are resolved/dispatched only on the next $digest cycle

    it "updates user records", ->
      expect(usersStub.massUpdate.called).to.be.true
      expect(usersStub.massUpdate.calledWith(ids: [1, 2, 3], data: allowance: 123)).to.be.true

    it "reloads a grid", ->
      expect(gridStub.reload.called).to.be.true

    it "closes a dialog", ->
      expect(dialogStub.close.called).to.be.true

  describe "#closeDialog", ->

    it "closes a dialog", ->
      # When
      $scope.closeDialog()

      # Then
      expect(dialogStub.close.called).to.be.true
