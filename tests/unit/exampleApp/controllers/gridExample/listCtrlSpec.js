/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("controller: gridExample.ListCtrl", function() {

  beforeEach(angular.mock.module("templates/gridExample/form.html"));

  beforeEach(angular.mock.module("angleGrinder.forms", function($provide) {
    $provide.value("$uibModal", {open: sinon.stub().returns({result: {then: angular.noop}})});
  })
  );

  beforeEach(angular.mock.module("exampleApp"));

  let $scope = null;
  let controller = null;

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    return controller = $controller("gridExample.ListCtrl",
      {$scope});
  })
  );

  describe("$scope", function() {
    it("assigns gridOptions", function() {
      expect($scope.gridOptions).to.not.be.undefined;

      expect($scope.gridOptions.colModel.length).to.equal(6);
      expect($scope.gridOptions.colModel[0].name).to.equal("id");
      expect($scope.gridOptions.colModel[1].name).to.equal("customer.name");
      expect($scope.gridOptions.colModel[2].name).to.equal("invoiceDate");
      expect($scope.gridOptions.colModel[3].name).to.equal("amount");
      expect($scope.gridOptions.colModel[4].name).to.equal("note");
      expect($scope.gridOptions.colModel[5].name).to.equal("complete");

      return expect($scope.gridOptions.data.length).to.equal(100);
    });

    describe("#editRecord", function() {
      let record = null;

      beforeEach(function() {
        record = {id: 123};
        sinon.stub(controller, "findRecordById").withArgs(123).returns(record);

        $scope.editRecord(record.id);
        return $scope.$digest();
      });

      it("loads an record", () => expect(controller.findRecordById).to.have.been.calledWith(123));

      return it("opens opens a dialog for editing the the loaded record", inject(function($uibModal) {
        expect($uibModal.open).to.have.been.called;

        const options = $uibModal.open.getCall(0).args[0];
        expect(options).to.have.property("templateUrl", "/templates/gridExample/form.html");
        return expect(options.resolve.dialogOptions().record).to.eq(record);
      })
      );
    });

    return describe("#createRecord", () => it("opens a dialog for creating a new item", inject(function($uibModal) {
      // When
      $scope.createRecord();

      // Then
      expect($uibModal.open).to.have.been.called;

      const options = $uibModal.open.getCall(0).args[0];
      expect(options).to.have.property("templateUrl", "/templates/gridExample/form.html");
      return expect(options.resolve.dialogOptions().record).to.not.be.undefined;
    })
    ));
  });

  return describe("controller", function() {

    beforeEach(() => controller.data = [
      { id: 123, name: "foo" },
      { id: 456, name: "bar" }
    ]);

    describe("#findRecordById", function() {

      context("when an item can be found", () => it("returns the item", function() {
        const item = controller.findRecordById(123);
        expect(item).to.not.be.undefined;
        expect(item.id).to.equal(123);
        return expect(item.name).to.equal("foo");
      }));

      return context("when an item cannot be found", () => it("returns undefined", function() {
        const item = controller.findRecordById(1);
        return expect(item).to.be.undefined;
      }));
    });

    return describe("#deleteRecordById", function() {

      context("when an item can be found", () => it("deletes the item", function() {
        controller.deleteRecordById(123);
        return expect(controller.data).to.have.length(1);
      }));

      return context("when an item cannot be found", () => it("does not delete", function() {
        controller.deleteRecordById(1231);
        return expect(controller.data).to.have.length(2);
      }));
    });
  });
});
