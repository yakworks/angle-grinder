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

    $controller "users.MassUpdateFormCtrl",
      $scope: $scope
      Users: usersStub
      userIds: [1, 2, 3]
      dialog: dialogStub
      usersGrid: gridStub

  describe "#save", ->
    beforeEach inject ($q, $rootScope) ->
      deferred = $q.defer()
      deferred.resolve() # always resolved
      usersStub.massUpdate.returns($promise: deferred.promise)

      $scope.save(allowance: 123)
      $rootScope.$apply() # promises are resolved/dispatched only on the next $digest cycle

    it "updates user records", ->
      expect(usersStub.massUpdate.called).toBeTruthy()
      expect(usersStub.massUpdate.calledWith(ids: [1, 2, 3], data: allowance: 123)).toBeTruthy()

    it "reloads a grid", ->
      expect(gridStub.reload.called).toBeTruthy()

    it "closes a dialog", ->
      expect(dialogStub.close.called).toBeTruthy()

  describe "#closeDialog", ->

    it "closes a dialog", ->
      # When
      $scope.closeDialog()

      # Then
      expect(dialogStub.close.called).toBeTruthy()
