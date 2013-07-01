describe "directives", ->
  beforeEach module("angleGrinder.directives")

  describe "agGrid", ->
    element = null
    gridz = null

    sampleGridOptions =
      data: []
      colModel: [
        name: "id"
        label: "Inv No"
        search: true
      ]

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()
      $scope.gridOptions = sampleGridOptions

      # create a spy on the gridz plugin
      gridz = spyOn($.fn, "gridz").andCallThrough()

      element = angular.element """
        <div ag-grid="gridOptions"></div>
      """

      $compile(element)($scope)
      $scope.$digest()

    it "passes valid options to the gridz plugin", ->
      expect(gridz).toHaveBeenCalledWith sampleGridOptions

    it "renders the grid", ->
      expect(element.find("div.ui-jqgrid").length).toEqual 1
      expect(element.find("table#grid").length).toEqual 1
      expect(element.find("div#gridPager").length).toEqual 1
