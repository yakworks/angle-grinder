import formsModule from 'angle-grinder/src/ng/forms'

describe("massUpdateMixinSpec", function() {

  beforeEach(angular.mock.module(formsModule, function($provide) {
    $provide.value("$uibModal", {open: sinon.mock()});
  })
  );

  let $scope = null;
  let grid = null;
  let massUpdateFormCtrl = null;

  beforeEach(inject(function($rootScope, MassUpdateMixin) {
    $scope = $rootScope.$new();

    grid = {getSelectedRowIds: sinon.stub()};
    $scope.theGrid = grid;

    return MassUpdateMixin($scope, {
      gridName: "theGrid",
      controller: massUpdateFormCtrl,
      templateUrl: "/path/to/the/form.html",
      extraParams: { foo: "bar"
    }
    }
    );
  })
  );

  context("when the grid is not defined", () => it("throws an error", inject(MassUpdateMixin => expect(MassUpdateMixin({gridName: "other"})).to.throw("the grid is not defined"))
  ));

  return describe("#massUpdate", function() {

    it("is mixed to the $scope", () => expect($scope.massUpdate).to.be.a("function"));

    context("when some rows are selected", function() {
      beforeEach(function() {
        grid.getSelectedRowIds.returns([1, 2, 3]);
        return $scope.massUpdate();
      });

      it("gets selected rows", () => expect($scope.theGrid.getSelectedRowIds).to.have.been.called);

      it("opens the dialog", inject(function($uibModal) {
        expect($uibModal.open).to.have.been.called;

        const args = $uibModal.open.getCall(0).args[0];
        expect(args.resolve.selectedIds).to.exist
        expect(args.resolve.grid).to.exist
        expect(args.resolve.extraParams).to.exist

        return expect(args.resolve.extraParams()).to.have.property("foo", "bar");
      })
      );

      context("when the controller is not specified", function() {
        before(() => massUpdateFormCtrl = null);

        return it("uses the default mass update form controller", inject(function($uibModal) {
          const options = $uibModal.open.getCall(0).args[0];

          expect(options).to.have.property("templateUrl", "/path/to/the/form.html");
          return expect(options).to.have.property("controller", "MassUpdateFormCtrl");
        })
        );
      });

      return context("when the controller is specified", function() {
        before(() => massUpdateFormCtrl = "OtherCtrl");

        return it("uses the custom controller", inject(function($uibModal) {
          const options = $uibModal.open.getCall(0).args[0];

          expect(options).to.have.property("templateUrl", "/path/to/the/form.html");
          return expect(options).to.have.property("controller", "OtherCtrl");
        })
        );
      });
    });

    context("when nothing is selected", function() {
      beforeEach(function() {
        grid.getSelectedRowIds.returns([]);
        return $scope.massUpdate();
      });

      it("gets selected rows", () => expect($scope.theGrid.getSelectedRowIds).to.have.been.called);

      return it("does not open the dialog", inject($uibModal => expect($uibModal.open).to.not.have.been.called)
      );
    });

    return context("when the grid name is an expression", function() {

      $scope = null;
      grid = null;

      beforeEach(inject(function($rootScope, MassUpdateMixin) {
        $scope = $rootScope.$new();

        grid = {getSelectedRowIds: sinon.stub()};
        $scope.grid = {customers: grid};

        return MassUpdateMixin($scope,
          {gridName: "grid.customers"});
      })
      );

      return it("does the same trick", function() {
        grid.getSelectedRowIds.returns([]);
        $scope.massUpdate();
        return expect(grid.getSelectedRowIds).to.have.been.called;
      });
    });
  });
});
