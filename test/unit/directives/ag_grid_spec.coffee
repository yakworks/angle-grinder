describe "directives", ->
  beforeEach module("angleGrinder.directives")

  describe "agGrid", ->
    $scope = null
    element = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope

      $scope.gridOptions =
        colModel: []

      element = angular.element "<div ag-grid='gridOptions'></div>"
      $compile(element)($scope)
      $scope.$digest()

    it "renders the grid", ->
      expect(element.find("table#grid").length).toEqual(1)
      expect(element.find("div#gridPager").length).toEqual(1)
