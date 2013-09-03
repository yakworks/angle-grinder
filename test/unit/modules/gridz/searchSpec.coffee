describe "module: angleGrinder.gridz", ->
  beforeEach module("angleGrinder.gridz")

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

  describe "directive: agSearchButton", ->
    $scope = null
    element = null

    beforeEach inject ($injector) ->
      {element, $scope} = compileTemplate """
        <ag-search-button></ag-search-button>
      """, $injector

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

  describe "directive: agResetSearchButton", ->
    $scope = null
    element = null

    beforeEach inject ($injector) ->
      {element, $scope} = compileTemplate """
        <ag-reset-search-button></ag-reset-search-button>
      """, $injector

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

  describe "directive: agSearchForm", ->
    $scope = null
    element = null

    beforeEach inject ($injector) ->
      {element, $scope} = compileTemplate """
        <form name="searchForm" ag-search-form>
          <input type="text" name="name" ng-model="search.name" />

          <ag-search-button id="search"></ag-search-button>
          <ag-reset-search-button id="reset"></ag-reset-search-button>
        </form>
      """, $injector

    it "has a valid css class", ->
      expect(element).toHaveClass "ag-search-form"

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
