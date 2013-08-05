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
      expect(element).toBe "button[type=button]"
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

    describe "on click", ->
      beforeEach ->
        $scope.search = name: "find it"
        $scope.advancedSearch = (params) ->
        spyOn($scope, "advancedSearch")

      it "calls #advancedSearch with valid params", ->
        # When
        element.click()
        # Then
        expect($scope.advancedSearch).toHaveBeenCalledWith name: "find it"

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

    describe "on click", ->
      beforeEach ->
        $scope.resetSearch = ->
        spyOn($scope, "resetSearch")

      it "calls #resetSearch", ->
        # When
        element.click()
        # Then
        expect($scope.resetSearch).toHaveBeenCalled()

  describe "directive: searchForm", ->
    $scope = null
    element = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()
      element = angular.element """
        <form name="searchForm" search-form>
          <input type="text" name="name" ng-model="search.name" />

          <search-button id="search"></search-button>
          <reset-search-button id="reset"></reset-search-button>
        </form>
      """

      $compile(element)($scope)
      $scope.$apply()

    describe "on submit button click", ->
      $searchButton = null
      beforeEach ->
        $searchButton = element.find("button")
        $scope.$apply -> $scope.searchForm.name.$setViewValue "find me"

      it "calls #advancedSearch", ->
        # Given
        spyOn($scope, "advancedSearch")
        # When
        $searchButton.click()
        # Then
        expect($scope.advancedSearch).toHaveBeenCalledWith name: "find me"

      it "disables the submit button", ->
        # When
        $searchButton.click()
        # Then
        expect($searchButton).toHaveClass "disabled"

      it "triggers the grid reload with the valid params", inject ($rootScope) ->
        # Given
        spyOn($rootScope, "$broadcast")
        # when
        $searchButton.click()
        # Then
        expect($rootScope.$broadcast).toHaveBeenCalledWith "searchUpdated", name: "find me"

    describe "on reset button click", ->
      $resetButton = null
      beforeEach ->
        $resetButton = element.find("button#reset")

      it "calls #resetSearch", ->
        # Given
        spyOn($scope, "resetSearch")
        # When
        $resetButton.click()
        # Then
        expect($scope.resetSearch).toHaveBeenCalled()

      it "disables the reset button", ->
        # When
        $resetButton.click()
        # Then
        expect($resetButton).toHaveClass "disabled"

      it "triggers the grid reload with empty params", inject ($rootScope) ->
        # Given
        spyOn($rootScope, "$broadcast")
        # when
        $resetButton.click()
        # Then
        expect($rootScope.$broadcast).toHaveBeenCalledWith "searchUpdated", { }

  describe "directive: agSelect2", ->
    $scope = null
    element = null

    compileTemplate = (template) ->
      beforeEach inject ($rootScope, $compile) ->
        $scope = $rootScope.$new()
        $scope.selectOptions = {}
        element = angular.element(template)

        $compile(element)($scope)
        $scope.$apply()

    compileTemplate """
      <ag-select2 select-options="selectOptions" ng-model="search.organization" />
    """

    it "generates select2 component along with show button", ->
      expect(element).toContain "input[type=text]"
      expect(element).toContain "button[type=button]"

    describe "scope", ->
      $directiveScope = null

      beforeEach ->
        $scope.$apply ->
          $scope.foo = "bar"
          $scope.selectOptions = foo: "bar"

        $directiveScope = element.scope()

      it "isolates the scope", ->
        expect($directiveScope).not.toBe $scope
        expect($directiveScope.foo).not.toBeEqualToObject "bar"

      it "takes the select2 options from the parent scope", ->
        expect($directiveScope.selectOptions).toBeDefined()
        expect($directiveScope.selectOptions).toBeEqualToObject foo: "bar"

      it "takes a model from the parent scope", ->
        $scope.$apply -> $scope.search = organization: "the org name"

        expect($directiveScope.ngModel).toBeDefined()
        expect($directiveScope.ngModel).toEqual "the org name"
        expect(element.find("input")).toHaveValue "the org name"

    describe "the open select button", ->
      it "opens the select component", ->
        spy = spyOn($.fn, "select2")
        element.find("button.open").click()
        expect(spy).toHaveBeenCalledWith "open"
