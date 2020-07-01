import 'angle-grinder/src/ng/gridz'
import agGridz from 'angle-grinder/src/ng/legacy/ag-grid'

describe("module: angleGrinder.gridz", function() {

  beforeEach(angular.mock.module(agGridz, function($provide) {
    $provide.value("$location", {path: sinon.stub()});
  })
  )

  return describe("controller: gridPagerCtrlMixin", function() {

    let $scope = null;
    let gridCtrl = null;

    beforeEach(inject(function($rootScope, $q, $controller) {
      $scope = $rootScope.$new();

      $scope.current = {id: 123};

      // stub the grid ctrl
      const promiseStub = function() {
        const deferred = $q.defer();
        deferred.resolve({});
        return deferred.promise;
      };

      // stub the grid
      gridCtrl = {
        getIds: sinon.stub(),

        isFirstPage: sinon.stub(),
        isLastPage: sinon.stub(),

        prevPage: promiseStub,
        nextPage: promiseStub
      };

      $scope.grid =
        {products: gridCtrl};

      $scope.pager = $controller("gridPagerCtrlMixin", {
        $scope,
        gridName: "grid.products",
        currentId: "current.id",
        path: "/products/:id"
      }
      );

      return $scope.$digest();
    })
    );

    it("has `show` method", () => expect($scope.pager.show).to.be.a("function"));

    it("has `hasPrevRow` method", () => expect($scope.pager.hasPrevRow).to.be.a("function"));

    it("has `hasNextRow` method", () => expect($scope.pager.hasNextRow).to.be.a("function"));

    it("has `prevRow` method", () => expect($scope.pager.prevRow).to.be.a("function"));

    it("has `nextRow` method", () => expect($scope.pager.nextRow).to.be.a("function"));

    describe("#show()", function() {

      context("when the grid is defined", () => it("returns true", () => expect($scope.pager.show()).to.be.true));

      return context("when the grid is not defined", function() {
        beforeEach(() => $scope.grid = undefined);

        return it("returns true", () => expect($scope.pager.show()).to.be.false);
      });
    });

    describe("#hasPrevRow()", function() {

      beforeEach(function() {
        $scope.current.id = 1;
        return gridCtrl.getIds.returns(["123", "456", "789"]);});

      context("on the non-first page", function() {
        beforeEach(() => gridCtrl.isFirstPage.returns(false));

        return it("returns true", () => expect($scope.pager.hasPrevRow()).to.be.true);
      });

      return context("on the first page", function() {
        beforeEach(() => gridCtrl.isFirstPage.returns(true));

        context("when the row is not the first one", function() {
          beforeEach(() => $scope.current.id = "456");

          return it("returns true", () => expect($scope.pager.hasPrevRow()).to.be.true);
        });

        return context("when the row is the first one", function() {
          beforeEach(() => $scope.current.id = "123");

          return it("returns true", () => expect($scope.pager.hasPrevRow()).to.be.false);
        });
      });
    });

    describe("#hasNextRow()", function() {

      beforeEach(function() {
        $scope.current.id = 1;
        return gridCtrl.getIds.returns(["123", "456", "789"]);});

      context("on the non-last page", function() {
        beforeEach(() => gridCtrl.isLastPage.returns(false));

        return it("returns true", () => expect($scope.pager.hasNextRow()).to.be.true);
      });

      return context("on the last page", function() {
        beforeEach(() => gridCtrl.isLastPage.returns(true));

        context("when the row is not the last one", function() {
          beforeEach(() => $scope.current.id = "456");

          return it("returns true", () => expect($scope.pager.hasNextRow()).to.be.true);
        });

        return context("when the row is the last one", function() {
          beforeEach(() => $scope.current.id = "789");

          return it("returns true", () => expect($scope.pager.hasNextRow()).to.be.false);
        });
      });
    });

    describe("#prevRow()", function() {

      beforeEach(function() {
        gridCtrl.getIds.onCall(0).returns(["1", "3", "2"]);
        return sinon.spy(gridCtrl, "prevPage");
      });

      context("when the current row is in the middle", function() {

        beforeEach(function() {
          $scope.current.id = 3;

          $scope.pager.prevRow();
          return $scope.$digest();
        });

        it("does not load the previous page", () => expect(gridCtrl.prevPage).to.not.have.been.called);

        it("sets the current row id", () => expect($scope.current.id).to.eq("1"));

        return it("navigates to the previous row", inject(function($location) {
          expect($location.path).to.have.been.called;

          const newPath = $location.path.firstCall.args[0];
          return expect(newPath).to.eq("/products/1");
        })
        );
      });

      return context("when the current row is on the beginning", function() {

        beforeEach(function() {
          $scope.current.id = 1;
          gridCtrl.getIds.onCall(1).returns(["123", "456", "789"]);

          $scope.pager.prevRow();
          return $scope.$apply();
        });

        it("loads the previous page", () => expect(gridCtrl.prevPage).to.have.been.called);

        it("sets the current row id", () => expect($scope.current.id).to.eq("789"));

        return it("navigates to the previous row", inject(function($location) {
          expect($location.path).to.have.been.called;

          const newPath = $location.path.firstCall.args[0];
          return expect(newPath).to.eq("/products/789");
        })
        );
      });
    });

    return describe("#nextRow()" ,function() {

      beforeEach(function() {
        gridCtrl.getIds.onCall(0).returns(["1", "3", "22", "4"]);
        return sinon.spy(gridCtrl, "nextPage");
      });

      context("when the current row is in the middle", function() {

        beforeEach(function() {
          $scope.current.id = 22;

          $scope.pager.nextRow();
          return $scope.$digest();
        });

        it("does not load the next page", () => expect(gridCtrl.nextPage).to.not.have.been.called);

        it("sets the current row id", () => expect($scope.current.id).to.eq("4"));

        return it("navigates to the next row", inject(function($location) {
          expect($location.path).to.have.been.called;

          const newPath = $location.path.firstCall.args[0];
          return expect(newPath).to.eq("/products/4");
        })
        );
      });

      return context("when the current row is at the end", function() {

        beforeEach(function() {
          $scope.current.id = 4;
          gridCtrl.getIds.onCall(1).returns(["123", "456", "789"]);

          $scope.pager.nextRow();
          return $scope.$digest();
        });

        it("loads the next page", () => expect(gridCtrl.nextPage).to.have.been.called);

        it("sets the current row id", () => expect($scope.current.id).to.eq("123"));

        return it("navigates to the next row", inject(function($location) {
          expect($location.path).to.have.been.called;

          const newPath = $location.path.firstCall.args[0];
          return expect(newPath).to.eq("/products/123");
        })
        );
      });
    });
  });
});
