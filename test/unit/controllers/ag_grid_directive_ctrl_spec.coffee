describe "AgGridDirectiveCtrl", ->
  beforeEach module("angleGrinder.gridz")
  beforeEach module("angleGrinder.services")
  beforeEach module("angleGrinder.controllers")

  controller = null
  $scope = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    controller = $controller "AgGridDirectiveCtrl",
      $scope: $scope

  describe "$scope", ->
    it "assigns gridOptions", ->
      expect($scope.gridOptions).toBeDefined()

      expect($scope.gridOptions.colModel.length).toEqual 5
      expect($scope.gridOptions.colModel[0].name).toEqual "id"
      expect($scope.gridOptions.colModel[1].name).toEqual "customer.name"
      expect($scope.gridOptions.colModel[2].name).toEqual "invoiceDate"
      expect($scope.gridOptions.colModel[3].name).toEqual "note"
      expect($scope.gridOptions.colModel[4].name).toEqual "complete"

      expect($scope.gridOptions.data.length).toEqual 100
