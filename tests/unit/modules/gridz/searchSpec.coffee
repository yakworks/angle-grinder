describe "module: angleGrinder.gridz", ->
  beforeEach module("angleGrinder.gridz")

  describe "service: hasSearchFilters", ->
    hasSearchFilters = null
    beforeEach inject (_hasSearchFilters_) ->
      hasSearchFilters = _hasSearchFilters_

    describe "if filters contain at least one non-empty field", ->
      filters = foo: "  ", bar: "test", biz: null

      it "returns true", ->
        expect(hasSearchFilters(filters)).to.be.true

    describe "if filters contain an array", ->
      filters = select2Stuff: [foo: "bar"], bar: null

      it "returns true", ->
        expect(hasSearchFilters(filters)).to.be.true

    describe "if filters contain other complex object", ->
      filters = date: new Date()

      it "returns true", ->
        expect(hasSearchFilters(filters)).to.be.true

    describe "if all filters are empty", ->
      filters = foo: "  ", bar: "", biz: null, baz: undefined

      it "returns false", ->
        expect(hasSearchFilters(filters)).to.be.false

  describe "directive: agSearchButton", ->
    $scope = null
    element = null

    beforeEach inject ($injector) ->
      {element, $scope} = compileTemplate """
        <ag-search-button></ag-search-button>
      """, $injector

    it "renders the button", ->
      expect(element.is("button[type=submit]")).to.be.true
      expect(element.hasClass("btn")).to.be.true
      expect(element.text()).to.contain "Search"

    it "is enabled", ->
      expect(element.hasClass("disabled")).to.be.false

    describe "when the search request is in progress", ->
      beforeEach ->
        $scope.$apply -> $scope.promise = undefined

      it "is disabled", ->
        expect(element.is(":disabled")).to.be.true

      it "changes the button label", ->
        expect(element.text()).to.contain "Search..."

    describe "on click", ->
      beforeEach ->
        $scope.filters = name: "find it"
        $scope.advancedSearch = sinon.spy()

      it "calls #advancedSearch with valid params", ->
        # When
        element.click()

        # Then
        expect($scope.advancedSearch.called).to.be.true
        expect($scope.advancedSearch.calledWith(name: "find it")).to.be.true

  describe "directive: agResetSearchButton", ->
    $scope = null
    element = null

    beforeEach inject ($injector) ->
      {element, $scope} = compileTemplate """
        <ag-reset-search-button></ag-reset-search-button>
      """, $injector

    it "renders the button", ->
      expect(element.is("button[type=button]")).to.be.true
      expect(element.hasClass("btn")).to.be.true
      expect(element.text()).to.contain "Reset"

    it "is enabled", ->
      expect(element.hasClass("disabled")).to.be.false

    describe "when the search request is in progress", ->
      beforeEach ->
        $scope.$apply -> $scope.promise = undefined

      it "is disabled", ->
        expect(element.is(":disabled")).to.be.true

      it "changes the button label", ->
        expect(element.text()).to.contain "Reset..."

    describe "on click", ->
      beforeEach ->
        $scope.resetSearch = ->

      it "calls #resetSearch", ->
        # Given
        spy = sinon.spy($scope, "resetSearch")

        # When
        element.click()

        # Then
        expect(spy.called).to.be.true

  describe "directive: agSearchForm", ->
    $scope = null
    element = null

    beforeEach inject ($rootScope, $injector) ->
      $scope = $rootScope.$new()
      $scope.grid = sinon.stub(search: angular.noop)

      {element} = compileTemplate """
        <form name="searchForm" ag-search-form="grid">
          <input type="text" name="name" ng-model="filters.name" />

          <ag-search-button id="search"></ag-search-button>
          <ag-reset-search-button id="reset"></ag-reset-search-button>
        </form>
      """, $injector, $scope

    describe "on submit button click", ->
      $searchButton = null

      beforeEach ->
        directiveScope = element.scope()
        $searchButton = element.find("button")

        $scope.$apply -> directiveScope.searchForm.name.$setViewValue "find me"

      it "calls #advancedSearch", ->
        # When
        $searchButton.click()

        # Then
        expect($scope.grid.search.called).to.be.true
        expect($scope.grid.search.calledWith(name: "find me")).to.be.true

      it "disables the submit button", ->
        # When
        $searchButton.click()

        # Then
        expect($searchButton.is(":disabled")).to.be.true

    describe "on reset button click", ->
      $resetButton = null

      beforeEach ->
        $resetButton = element.find("button#reset")

      it "calls #resetSearch", ->
        # When
        $resetButton.click()

        # Then
        expect($scope.grid.search.called).to.be.true
        expect($scope.grid.search.calledWith({})).to.be.true

      it "disables the reset button", ->
        # When
        $resetButton.click()

        # Then
        expect($resetButton.is(":disabled")).to.be.true
