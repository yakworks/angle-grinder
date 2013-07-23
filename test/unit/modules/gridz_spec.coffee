describe "module: angleGrinder.gridz", ->
  beforeEach module("angleGrinder.gridz")

  describe "directive: agGrid", ->
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
      $scope.$apply()

    it "passes valid options to the gridz plugin", ->
      expect(gridz).toHaveBeenCalledWith sampleGridOptions

    it "renders the grid", ->
      expect(element.find("div.ui-jqgrid").length).toEqual 1
      expect(element.find("table#grid").length).toEqual 1
      expect(element.find("div#gridPager").length).toEqual 1
        
  describe "service: flatten", ->
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

  describe "service: hasSearchFilters", ->
    hasSearchFilters = null
    beforeEach inject (_hasSearchFilters_) ->
      hasSearchFilters = _hasSearchFilters_

    describe "if filters contain at least one non-empty field", ->
      filters = foo: "  ", bar: "test", biz: null

      it "returns true", ->
        expect(hasSearchFilters(filters)).toBeTruthy()

    describe "if filters contain an array", ->
      filters = select2Stuff: [foo: "bar"], bar: null

      it "returns true", ->
        expect(hasSearchFilters(filters)).toBeTruthy()

    describe "if filters contain other complex object", ->
      filters = date: new Date()

      it "returns true", ->
        expect(hasSearchFilters(filters)).toBeTruthy()

    describe "if all filters are empty", ->
      filters = foo: "  ", bar: "", biz: null, baz: undefined

      it "returns false", ->
        expect(hasSearchFilters(filters)).toBeFalsy()

  describe "directive: searchButton", ->
    $scope = null
    element = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()
      element = angular.element """
        <search-button></search-button>
      """

      $compile(element)($scope)
      $scope.$apply()

    it "renders the button", ->
      expect(element).toBe "button[type=submit]"
      expect(element).toHaveClass "btn"
      expect(element).toHaveText /Search/

    it "is enabled", ->
      expect(element).not.toHaveClass "disabled"

    describe "when the search request is in progress", ->
      beforeEach ->
        $scope.$apply -> $scope.searching = true

      it "is disabled", ->
        expect(element).toHaveClass "disabled"

      it "changes the button label", ->
        expect(element).toHaveText "Search..."

  describe "directive: resetSearchButton", ->
    $scope = null
    element = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()
      element = angular.element """
        <reset-search-button></reset-search-button>
      """

      $compile(element)($scope)
      $scope.$apply()

    it "renders the button", ->
      expect(element).toBe "button[type=button]"
      expect(element).toHaveClass "btn"
      expect(element).toHaveText /Reset/

    it "is enabled", ->
      expect(element).not.toHaveClass "disabled"

    describe "when the search request is in progress", ->
      beforeEach ->
        $scope.$apply -> $scope.searching = true

      it "is disabled", ->
        expect(element).toHaveClass "disabled"

      it "changes the button label", ->
        expect(element).toHaveText "Reset..."
