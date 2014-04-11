describe "module: angleGrinder.gridz", ->

  beforeEach module "angleGrinder.gridz", ($provide) ->
    $provide.value "$location", path: sinon.stub()
    return

  describe "controller: gridPagerCtrlMixin", ->

    $scope = null
    gridCtrl = null

    beforeEach inject ($rootScope, $q, $controller) ->
      $scope = $rootScope.$new()

      $scope.current = id: 123

      # stub the grid ctrl
      promiseStub = ->
        deferred = $q.defer()
        deferred.resolve({})
        deferred.promise

      # stub the grid
      gridCtrl =
        getIds: sinon.stub()

        isFirstPage: sinon.stub()
        isLastPage: sinon.stub()

        prevPage: promiseStub
        nextPage: promiseStub

      $scope.grid =
        products: gridCtrl

      $scope.pager = $controller "gridPagerCtrlMixin",
        $scope: $scope
        gridName: "grid.products"
        currentId: "current.id"
        path: "/products/:id"

      $scope.$digest()

    it "has `show` method", ->
      expect($scope.pager.show).to.be.a "function"

    it "has `hasPrevRow` method", ->
      expect($scope.pager.hasPrevRow).to.be.a "function"

    it "has `hasNextRow` method", ->
      expect($scope.pager.hasNextRow).to.be.a "function"

    it "has `prevRow` method", ->
      expect($scope.pager.prevRow).to.be.a "function"

    it "has `nextRow` method", ->
      expect($scope.pager.nextRow).to.be.a "function"

    describe "#show()", ->

      context "when the grid is defined", ->

        it "returns true", ->
          expect($scope.pager.show()).to.be.true

      context "when the grid is not defined", ->
        beforeEach -> $scope.grid = undefined

        it "returns true", ->
          expect($scope.pager.show()).to.be.false

    describe "#hasPrevRow()", ->

      beforeEach ->
        $scope.current.id = 1
        gridCtrl.getIds.returns ["123", "456", "789"]

      context "on the non-first page", ->
        beforeEach -> gridCtrl.isFirstPage.returns false

        it "returns true", ->
          expect($scope.pager.hasPrevRow()).to.be.true

      context "on the first page", ->
        beforeEach -> gridCtrl.isFirstPage.returns true

        context "when the row is not the first one", ->
          beforeEach -> $scope.current.id = "456"

          it "returns true", ->
            expect($scope.pager.hasPrevRow()).to.be.true

        context "when the row is the first one", ->
          beforeEach -> $scope.current.id = "123"

          it "returns true", ->
            expect($scope.pager.hasPrevRow()).to.be.false

    describe "#hasNextRow()", ->

      beforeEach ->
        $scope.current.id = 1
        gridCtrl.getIds.returns ["123", "456", "789"]

      context "on the non-last page", ->
        beforeEach -> gridCtrl.isLastPage.returns false

        it "returns true", ->
          expect($scope.pager.hasNextRow()).to.be.true

      context "on the last page", ->
        beforeEach -> gridCtrl.isLastPage.returns true

        context "when the row is not the last one", ->
          beforeEach -> $scope.current.id = "456"

          it "returns true", ->
            expect($scope.pager.hasNextRow()).to.be.true

        context "when the row is the last one", ->
          beforeEach -> $scope.current.id = "789"

          it "returns true", ->
            expect($scope.pager.hasNextRow()).to.be.false

    describe "#prevRow()", ->

      beforeEach ->
        gridCtrl.getIds.onCall(0).returns ["1", "3", "2"]
        sinon.spy(gridCtrl, "prevPage")

      context "when the current row is in the middle", ->

        beforeEach ->
          $scope.current.id = 3

          $scope.pager.prevRow()
          $scope.$digest()

        it "does not load the previous page", ->
          expect(gridCtrl.prevPage).to.not.have.been.called

        it "sets the current row id", ->
          expect($scope.current.id).to.eq "1"

        it "navigates to the previous row", inject ($location) ->
          expect($location.path).to.have.been.called

          newPath = $location.path.firstCall.args[0]
          expect(newPath).to.eq "/products/1"

      context "when the current row is on the beginning", ->

        beforeEach ->
          $scope.current.id = 1
          gridCtrl.getIds.onCall(1).returns ["123", "456", "789"]

          $scope.pager.prevRow()
          $scope.$apply()

        it "loads the previous page", ->
          expect(gridCtrl.prevPage).to.have.been.called

        it "sets the current row id", ->
          expect($scope.current.id).to.eq "789"

        it "navigates to the previous row", inject ($location) ->
          expect($location.path).to.have.been.called

          newPath = $location.path.firstCall.args[0]
          expect(newPath).to.eq "/products/789"

    describe "#nextRow()" ,->

      beforeEach ->
        gridCtrl.getIds.onCall(0).returns ["1", "3", "22", "4"]
        sinon.spy(gridCtrl, "nextPage")

      context "when the current row is in the middle", ->

        beforeEach ->
          $scope.current.id = 22

          $scope.pager.nextRow()
          $scope.$digest()

        it "does not load the next page", ->
          expect(gridCtrl.nextPage).to.not.have.been.called

        it "sets the current row id", ->
          expect($scope.current.id).to.eq "4"

        it "navigates to the next row", inject ($location) ->
          expect($location.path).to.have.been.called

          newPath = $location.path.firstCall.args[0]
          expect(newPath).to.eq "/products/4"

      context "when the current row is at the end", ->

        beforeEach ->
          $scope.current.id = 4
          gridCtrl.getIds.onCall(1).returns ["123", "456", "789"]

          $scope.pager.nextRow()
          $scope.$digest()

        it "loads the next page", ->
          expect(gridCtrl.nextPage).to.have.been.called

        it "sets the current row id", ->
          expect($scope.current.id).to.eq "123"

        it "navigates to the next row", inject ($location) ->
          expect($location.path).to.have.been.called

          newPath = $location.path.firstCall.args[0]
          expect(newPath).to.eq "/products/123"
