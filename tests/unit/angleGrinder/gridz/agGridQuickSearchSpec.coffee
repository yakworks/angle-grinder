describe "module: angleGrinder.gridz", ->

  beforeEach module "angleGrinder.gridz"

  describe "directive: agGridQuickSearch", ->

    $scope = null
    element = null

    beforeEach inject ($rootScope) ->
      $scope = $rootScope.$new()

      $scope.grid = customers: search: sinon.stub()
      $scope.criteria = foo: "bar"

    describe "when external `criteria` are given", ->

      beforeEach inject ($compile) ->
        element = angular.element """
          <ag-grid-quick-search for="grid.customers" criteria="criteria"></ag-grid-quick-search>
        """

        $compile(element)($scope)
        $scope.$digest()

      it "initially has empty `quickSearch` filter", ->
        expect($scope.criteria.quickSearch).to.eq ""
        expect($scope.criteria.foo).to.eq "bar"

      it "tigers search", ->
        # Given
        quickSearch = (value) ->
          $scope.criteria.quickSearch = value

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

    describe "when external `criteria` are not given", ->

      beforeEach inject ($compile) ->
        element = angular.element """
          <ag-grid-quick-search for="grid.customers"></ag-grid-quick-search>
        """

        $compile(element)($scope)
        $scope.$digest()

      it "initially has empty `quickSearch` filter", ->
        expect(element.isolateScope().criteria.quickSearch).to.eq ""
        expect($scope.criteria.foo).to.eq "bar"

      it "trigers search", ->
        # Given
        quickSearch = (value) ->
          scope = element.isolateScope()
          scope.criteria.quickSearch = value

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
