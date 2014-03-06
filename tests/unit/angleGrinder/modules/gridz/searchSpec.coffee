describe "module: angleGrinder.gridz", ->
  beforeEach module "angleGrinder.gridz"

  describe "service: hasSearchFilters", ->
    hasSearchFilters = null
    beforeEach inject (_hasSearchFilters_) -> hasSearchFilters = _hasSearchFilters_

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
      beforeEach -> $scope.$apply -> $scope.searching = true

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
        expect($scope.advancedSearch).to.have.been.called
        expect($scope.advancedSearch).to.have.been.calledWith(name: "find it")

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
      beforeEach -> $scope.$apply -> $scope.searching = true

      it "is disabled", ->
        expect(element.is(":disabled")).to.be.true

      it "changes the button label", ->
        expect(element.text()).to.contain "Reset..."

    describe "on click", ->
      beforeEach -> $scope.resetSearch = ->

      it "calls #resetSearch", ->
        # Given
        sinon.spy($scope, "resetSearch")

        # When
        element.click()

        # Then
        expect($scope.resetSearch).to.have.been.called

  describe "directive: agSearchForm", ->
    $scope = null
    element = null

    beforeEach inject ($rootScope, $injector) ->
      $scope = $rootScope.$new()

      # stub the grid controller
      gridCtrl = search: sinon.stub()
      gridCtrl.search.returns finally: ->

      $scope.grid = users: gridCtrl

      {element} = compileTemplate """
        <form name="searchForm" ag-search-form="grid.users">
          <input type="text" name="name" ng-model="filters.name" />

          <ag-search-button id="search"></ag-search-button>
          <ag-reset-search-button id="reset"></ag-reset-search-button>
        </form>
      """, $injector, $scope

    describe "on submit button click", ->
      searchButtonEl = null

      beforeEach ->
        directiveScope = element.scope()
        searchButtonEl = element.find("button")

        $scope.$apply -> directiveScope.searchForm.name.$setViewValue "find me"

      it "calls #advancedSearch", ->
        # When
        searchButtonEl.click()

        # Then
        expect($scope.grid.users.search).to.have.been.called
        expect($scope.grid.users.search).to.have.been.calledWith(name: "find me")

      it "disables the submit button", ->
        # When
        searchButtonEl.click()

        # Then
        expect(searchButtonEl.is(":disabled")).to.be.true

    describe "on reset button click", ->
      resetButtonEl = null

      beforeEach ->
        resetButtonEl = element.find("button#reset")

      it "calls #resetSearch", ->
        # When
        resetButtonEl.click()

        # Then
        expect($scope.grid.users.search).to.have.been.called
        expect($scope.grid.users.search).to.have.been.calledWith({})

      it "disables the reset button", ->
        # When
        resetButtonEl.click()

        # Then
        expect(resetButtonEl.is(":disabled")).to.be.true
