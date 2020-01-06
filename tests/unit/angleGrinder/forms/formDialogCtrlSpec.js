/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.forms", function() {

  beforeEach(module("angleGrinder.forms"));

  return describe("controller: FormDialogCtrl", function() {
    let $scope = null;

    let $modalInstance = null;
    let record = null;
    let grid = null;

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();

      // mock services

      $modalInstance = {close: sinon.stub()};

      record = {
        id: 567,
        resourceName() { return "account"; },
        save: sinon.stub(), delete: sinon.stub()
      };

      grid = {saveRow: sinon.stub(), removeRow: sinon.stub()};

      // instantiate the controller

      return $controller("FormDialogCtrl", {
        $scope,

        $modalInstance,
        dialogOptions: {
          record,
          grid
        }
      }
      );
    })
    );

    it("assigns an instance to the scope", () => expect($scope.account).to.not.be.undefied);

    describe("#closeDialog", () => it("closes a dialog", function() {
      $scope.closeDialog();

      expect($modalInstance.close).to.have.been.called;
      return expect($modalInstance.close).to.have.been.calledWith(record);
    }));

    describe("#save", () => describe("when the form is valid", function() {

      it("returns a promise along with the record", inject(function($q) {
        let promise;
        const deferred = $q.defer();
        record.save.returns({$promise: deferred.promise});

        [promise, record] = Array.from($scope.save(record));

        expect(promise.then).to.be.a("function");
        expect(promise.catch).to.be.a("function");
        expect(promise.finally).to.be.a("function");

        return expect(record).to.deep.eq(record);
      })
      );

      return describe("on success", function() {

        beforeEach(inject(function($q) {
          const deferred = $q.defer();
          deferred.resolve(record);
          record.save.returns({$promise: deferred.promise});

          $scope.save(record);
          return $scope.$digest();
        })
        );

        it("updates a row inside the grid", function() {
          expect(grid.saveRow).to.have.been.called;
          return expect(grid.saveRow).to.have.been.calledWith(567, record);
        });

        return it("closes the dialog", () => expect($modalInstance.close).to.have.been.called);
      });
    }));

    return describe("#delete", function() {

      it("returns a promise", function() {
        const promise = {then: angular.noop, catch: angular.noop};
        record.delete.returns({$promise: promise});
        return expect($scope.delete()).to.deep.eq(promise);
      });

      describe("on success", function() {
        beforeEach(function() {
          const promise = {
            then: sinon.stub().yields({ id: 567 }),
            catch: angular.noop
          };
          record.delete.returns({$promise: promise});

          $scope.delete();
          return $scope.$digest();
        });

        it("removes a row from the grid", function() {
          expect(grid.removeRow).to.have.been.called;
          return expect(grid.removeRow).to.have.been.calledWith(567);
        });

        return it("closes the dialog", () => expect($modalInstance.close.called).to.be.true);
      });

      return describe("on error", function() {
        beforeEach(function() {
          const promise = {
            then: angular.noop,
            catch: sinon.stub().yields({})
          };
          record.delete.returns({$promise: promise});

          $scope.delete();
          return $scope.$digest();
        });

        it("does not remove a row from the grid", () => expect(grid.removeRow.called).to.be.false);

        return it("does not close the dialog", () => expect($modalInstance.close.called).to.be.false);
      });
    });
  });
});
