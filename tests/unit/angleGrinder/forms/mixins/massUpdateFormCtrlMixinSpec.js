import formsModule from '~/scripts/forms'
import exampleAppResources from '../../../../../docs/exampleApp/modules/resources'

describe("massUpdateFormCtrlMixinSpec", function() {

  beforeEach(angular.mock.module(formsModule));

  beforeEach(angular.mock.module(exampleAppResources, ($provide) => $provide.decorator("Users", function($delegate, $q) {
    const deferred = $q.defer();

    // always resolved
    deferred.resolve({
      data: [{ id: 100, foo: "bar" }],
      errors: {
        "101": { foo: "bar"}
      }});

    sinon.stub($delegate, "massUpdate").returns({$promise: deferred.promise});
    return $delegate;
  }))
  );

  let $rootScope = null;
  let $scope = null;

  let dialog = null;
  let grid = null;

  let beforeSave = null;

  beforeEach(inject(function(_$rootScope_, massUpdateFormCtrlMixin, Users) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    dialog = sinon.stub({close: angular.noop});
    const selectedIds = [1, 2, 3];
    grid = sinon.stub({
      reload: angular.noop,
      updateRow: angular.noop,
      clearSelection: angular.noop,
      flashOnError() {}
    });

    return massUpdateFormCtrlMixin($scope, {
      dialog,
      Resource: Users,
      selectedIds,
      grid,
      beforeSave
    }
    );
  })
  );

  describe("#massUpdate", function() {

    let records = {};
    beforeEach(() => records = {allowance: 123});

    it("is mixed to the $scope", () => expect($scope.massUpdate).to.be.a("function"));

    it("returns a promise", function() {
      const promise = $scope.massUpdate(records);

      expect(promise.then).to.be.a("function");
      expect(promise.catch).to.be.a("function");
      expect(promise.finally).to.be.a("function");

      $rootScope.$digest();
      return expect(grid.clearSelection.called).to.be.true;
    });

    return describe("when the massUpdate form is valid", function() {

      beforeEach(function() {
        $scope.massUpdate(records);
        return $rootScope.$digest();
      });

      it("updates the records", inject(function(Users) {
        expect(Users.massUpdate).to.have.been.called;
        return expect(Users.massUpdate).to.have.been.calledWith({ids: [1, 2, 3], data: {allowance: 123}});
      })
      );

      it("does not reload a grid", () => expect(grid.reload).to.not.have.been.called);

      it("updates data in the grid", function() {
        expect(grid.updateRow).to.have.been.called;
        return expect(grid.updateRow).to.have.been.calledWith(100, {id: 100, foo: "bar"});
      });

      it("flashes rows with errors", function() {
        expect(grid.flashOnError).to.have.been.called;
        return expect(grid.flashOnError).to.have.been.calledWith("101");
      });

      it("closes a dialog", () => expect(dialog.close).to.have.been.called);

      return describe("when `beforeSave` callback is given", function() {

        before(() => beforeSave = function(records) {
          records.allowance += 200;
          return records;
        });

        it("uses it to transform the data", inject(function(Users) {
          expect(Users.massUpdate).to.have.been.called;
          expect(Users.massUpdate).to.have.been.calledWith({ids: [1, 2, 3], data: {allowance: 323}});

          const {
            data
          } = Users.massUpdate.getCall(0).args[0];
          return expect(data.allowance).to.eq(323);
        })
        );

        return it("does not change the original records", () => expect(records.allowance).to.eq(123));
      });
    });
  });

  return describe("#closeDialog", function() {

    it("is mixed to the $scope", () => expect($scope.closeDialog).to.be.a("function"));

    return it("closes a dialog", function() {
      // When
      $scope.closeDialog();

      // Then
      return expect(dialog.close).to.have.been.called;
    });
  });
});
