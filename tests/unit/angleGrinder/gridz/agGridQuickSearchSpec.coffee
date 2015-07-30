describe "module: angleGrinder.gridz", ->

  beforeEach module "angleGrinder.gridz"

  describe "directive: agGridQuickSearch", ->

    $scope = null
    element = null

    beforeEach inject ($rootScope) ->
      $scope = $rootScope.$new()

      $scope.grid = customers: search: sinon.stub()
      $scope.filters = foo: "bar"

    describe "when external `filters` are given", ->

      beforeEach inject ($compile) ->
        element = angular.element """
          <ag-grid-quick-search for="grid.customers" filters="filters"></ag-grid-quick-search>
        """

        $compile(element)($scope)
        $scope.$digest()

      it "initially has empty `quickSearch` filter", ->
        expect($scope.filters.quickSearch).to.eq ""
        expect($scope.filters.foo).to.eq "bar"

      it "tigers search", ->
        # Given
        quickSearch = (value) ->
          $scope.filters.quickSearch = value

          inputEl = element.find("form[name=quickSearch]").find("input")
          inputEl.triggerHandler
            type: 'keydown',
            which: 13

        # When
        quickSearch("name")

        # Then
        expect($scope.grid.customers.search.called).to.be.true
        expect($scope.grid.customers.search.calledWith(foo: "bar", quickSearch: "name")).to.be.true

        quickSearch("")
        expect($scope.grid.customers.search.calledWith(foo: "bar", quickSearch: "")).to.be.true

    describe "when external `filters` are not given", ->

      beforeEach inject ($compile) ->
        element = angular.element """
          <ag-grid-quick-search for="grid.customers"></ag-grid-quick-search>
        """

        $compile(element)($scope)
        $scope.$digest()

      it "initially has empty `quickSearch` filter", ->
        expect(element.isolateScope().filters.quickSearch).to.eq ""
        expect($scope.filters.foo).to.eq "bar"

      it "trigers search", ->
        # Given
        quickSearch = (value) ->
          scope = element.isolateScope()
          scope.filters.quickSearch = value

          inputEl = element.find("form[name=quickSearch]").find("input")
          inputEl.triggerHandler
            type: 'keydown',
            which: 13

        # When
        quickSearch("name")

        # Then
        expect($scope.grid.customers.search.called).to.be.true
        expect($scope.grid.customers.search.calledWith(quickSearch: "name")).to.be.true

        quickSearch("")
        expect($scope.grid.customers.search.calledWith(quickSearch: "")).to.be.true
