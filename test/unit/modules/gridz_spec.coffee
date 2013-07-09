describe "angleGrinder.gridz", ->
  beforeEach module("angleGrinder.gridz")

  describe "agGrid directive", ->
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

  describe "editDialog service", ->
    it "is defined", inject (editDialog) ->
      expect(editDialog).toBeDefined()

    describe "#open", ->
      beforeEach inject ($httpBackend) ->
        $httpBackend.whenGET("/views/some_template.html").respond({})

      it "opens the create dialog", inject (editDialog) ->
        item = name: "Foo"
        editDialog.open("/views/some_template.html", item)

  describe "flatten", ->
    flatten = null
    beforeEach inject ($injector) ->
      flatten = $injector.get("flatten")

    it "is defined", ->
      expect(flatten).toBeDefined()

    it "flattens an object", ->
      target =
        id: 123
        consumer:
          firstName: "Luke"
          lastName: "Sywalker"
        createdAt: "2013-11-11"

      flattened = flatten(target)

      expect(flattened.id).toEqual target.id
      expect(flattened["consumer.firstName"]).toEqual target.consumer.firstName
      expect(flattened["consumer.lastName"]).toEqual target.consumer.lastName
      expect(flattened.createdAt).toEqual target.createdAt
