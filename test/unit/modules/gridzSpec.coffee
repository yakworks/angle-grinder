describe "module: angleGrinder.gridz", ->
  beforeEach module("angleGrinder.gridz")

  describe "directive: agGrid", ->
    $scope = null
    element = null
    gridzSpy = null

    sampleGridOptions =
      data: []
      colModel: [
        name: "id"
        label: "Inv No"
        search: true
      ]

    beforeEach inject ($rootScope) ->
      # create a spy on the gridz plugin
      gridzSpy = sinon.spy($.fn, "gridz")

      $scope = $rootScope.$new()
      $scope.gridOptions = sampleGridOptions

    afterEach ->
      gridzSpy.restore()

    itPassesValidOptionsToTheGrid = ->
      it "passes valid options to the gridz plugin", ->
        expect(gridzSpy.called).toBeTruthy()
        expect(gridzSpy.calledWith(sampleGridOptions)).toBeTruthy()

    itRendersTheGrid = ->
      it "renders the grid", ->
        expect(element).toContain "div.ui-jqgrid"
        expect(element).toContain "table.gridz"
        expect(element).toContain "div.gridz-pager"

    describe "when `ag-grid-name` is not provided", ->
      beforeEach inject ($injector) ->
        {element} = compileTemplate """
          <div ag-grid="gridOptions"></div>
        """, $injector, $scope

      itPassesValidOptionsToTheGrid()
      itRendersTheGrid()

      it "assigns default `id` for the grid element", ->
        expect(element.find("table.gridz").attr("id")).toEqual "gridz"

      it "assigns default `id` for the pager", ->
        expect(element.find("div.gridz-pager").attr("id")).toEqual "gridz-pager"

    describe "when `ag-grid-name` is provided", ->
      beforeEach inject ($injector) ->
        {element} = compileTemplate """
          <div ag-grid="gridOptions"
               ag-grid-name="projectsGrid"></div>
        """, $injector, $scope

      itPassesValidOptionsToTheGrid()
      itRendersTheGrid()

      it "generates `id` for the grid element", ->
        expect(element.find("table.gridz").attr("id")).toEqual "projectsGrid"

      it "generates `id` for the pager", ->
        expect(element.find("div.gridz-pager").attr("id")).toEqual "projectsGrid-pager"

      describe "the grid controller", ->

        it "is assigned to the scope", ->
          expect($scope.projectsGrid).toBeDefined()

        it "is initialized with the grid element", ->
          expect($scope.projectsGrid.$grid).toBeDefined()
          expect($scope.projectsGrid.$grid).toEqual element.find("table.gridz")

  describe "service: flatten", ->
    it "is defined", inject (flatten) ->
      expect(flatten).toBeDefined()

    it "flattens an object", inject (flatten) ->
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
