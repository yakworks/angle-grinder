describe "module: angleGrinder.gridz", ->

  beforeEach module "angleGrinder.gridz"

  describe "service: idsArrayPager", ->
    pager = null
    beforeEach inject (idsArrayPager) ->
      pager = idsArrayPager(@rowId, @ids)

    describe "new instaince", ->

      it "can be initialized with undefined array of ids", inject (idsArrayPager) ->
        pager = idsArrayPager(null, undefined)
        expect(pager.length()).to.eq 0

      it "can be initialized with empty string", inject (idsArrayPager) ->
        pager = idsArrayPager(null, "")
        expect(pager.length()).to.eq 0

      it "can be initialized with comma separated string of ids", inject (idsArrayPager) ->
        pager = idsArrayPager(null, "1,2,3")
        expect(pager.length()).to.eq 3

      it "can be initialized with an array", inject (idsArrayPager) ->
        pager = idsArrayPager(null, [1,2,3,4])
        expect(pager.length()).to.eq 4

    describe "#length()", ->
      before -> @ids = [1,2]

      it "returns number of elements in the array", ->
        expect(pager.length()).to.eq 2

    describe "#currIndex()", ->
      before -> @rowId = 2; @ids = [1,2,3]

      it "returns the current row index", ->
        expect(pager.currIndex()).to.eq 1

    describe "#prev()", ->
      before -> @ids = [10, 20, 30]

      context "when the current id is the first one", ->
        before -> @rowId = 10

        it "returns the last id", ->
          expect(pager.prev()).to.eq 30

      context "whe the current id is not the first one", ->
        before -> @rowId = 20

        it "returns the previous id", ->
          expect(pager.prev()).to.eq 10

      context "when the current id is not present in the array", ->
        before -> @rowId = 11

        it "returns the last id", ->
          expect(pager.prev()).to.eq 30

    describe "#next()", ->
      before -> @ids = [101, 201, 202, 301]

      context "when the current id is the last one", ->
        before -> @rowId = 301

        it "returns the first id", ->
          expect(pager.next()).to.eq 101

      context "whe the current id is not the last one", ->
        before -> @rowId = 101

        it "returns the next id", ->
          expect(pager.next()).to.eq 201

      context "when the current id is not present in the array", ->
        before -> @rowId = 11

        it "returns the first id", ->
          expect(pager.next()).to.eq 101

  describe "directive: agShowPagePager", ->

    beforeEach module "ui.router", ($provide) ->
      $provide.value "$stateParams", ids: "120,121,12,123,125"
      return

    element = null
    elementScope = null
    $scope = null

    beforeEach inject ($injector, $rootScope) ->
      scope = $rootScope.$new()
      scope.user = id: 123

      {element, $scope} = compileTemplate """
        <div ag-show-page-pager="user" ng-show="showPager()">
          <a href="#/users/{{prevId()}}?ids={{ids}}">prev</a>
          <a href="#/users/{{nextId()}}?ids={{ids}}">next</a>
        </div>
      """, $injector, scope

      elementScope = element.scope()

    it "is not hidden", ->
      expect(elementScope.showPager()).to.be.true

    describe "element scope", ->

      describe "#nextId()", ->

        it "returns the next id", ->
          expect(elementScope.nextId()).to.eq 125

      describe "#prevId()", ->

        it "returns the next id", ->
          expect(elementScope.prevId()).to.eq 12

  describe "directive: agGridWithPager", ->
    element = null
    $scope = null
    gridCtrlMock = null

    beforeEach module ("ui.router"), ($provide) ->
      $provide.value "$state", go: sinon.stub()
      return

    beforeEach inject ($injector, $rootScope) ->
      $scope = $rootScope.$new()
      $scope.fakeGridOptions = {}

      {element} = compileTemplate """
        <div ag-grid="fakeGridOptions" ag-grid-with-pager></div>
      """, $injector, $scope

      # stub the grid controller
      gridCtrl = element.controller("agGrid")
      gridCtrlMock = sinon.mock(gridCtrl).expects("getIds").returns([10,2,30,4])

      # append fake show link to the grid
      element.find("table#gridz").append """
        <a class="with-pager" href="" data-row-id="4" data-ui-sref="items.show">click me!</a>
      """

    it "loads `ids` from the current grid view", ->
      element.find("a.with-pager").click()
      gridCtrlMock.verify()

    it "navigates to the valid show path with `ids` param", inject ($state) ->
      element.find("a.with-pager").click()

      expect($state.go.called).to.be.true
      expect($state.go.calledWith("items.show", id: 4, ids: "10,2,30,4")).to.be.true
