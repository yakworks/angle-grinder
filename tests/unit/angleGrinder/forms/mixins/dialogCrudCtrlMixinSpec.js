import formsModule from '~/scripts/forms'
import userResModule from './userResourcesMockup'

describe("dialogCrudCtrlMixinSpec", function() {

  beforeEach(angular.mock.module(userResModule));

  beforeEach(angular.mock.module(formsModule, function($provide) {
    // stub `FormDialogServ` service
    $provide.decorator("FormDialogServ", function($delegate) {
      sinon.stub($delegate, "open");
      return $delegate;
    });

    // stub `ConfirmationDialogServ` service
    $provide.decorator("ConfirmationDialogServ", function($delegate) {
      $delegate.confirmed = true;
      sinon.stub($delegate, "open").returns({then(callback) { return callback($delegate.confirmed); }
      });

      return $delegate;
    })
  })
  );

  let $scope = null;
  let grid = null;

  let beforeEdit = null;
  let beforeCreate = null;

  beforeEach(inject(function($rootScope, Users, DialogCrudCtrlMixin) {
    $scope = $rootScope.$new();

    grid = {removeRow: sinon.stub()};
    $scope.grid = {transactions: grid};

    // initialize the mixin
    return DialogCrudCtrlMixin($scope, {
      Resource: Users,
      gridName: "grid.transactions",
      templateUrl: "/foo/bar/form.html",
      beforeEdit,
      beforeCreate
    }
    );
  })
  );

  describe("#editRecord", function() {

    beforeEach(inject(function($httpBackend) {
      $httpBackend.expectGET("/api/users/123").respond({id: 123, name: "the user"});
      $scope.editRecord(123);
      return $httpBackend.flush();
    })
    );

    it("is mixed to the $scope", () => expect($scope.editRecord).to.be.a("function"));

    it("loads a resource", inject(function($httpBackend) {
      $httpBackend.verifyNoOutstandingExpectation();
      return $httpBackend.verifyNoOutstandingRequest();
    })
    );

    it("opens a dialog for editing the loaded resource", inject(function(FormDialogServ) {
      expect(FormDialogServ.open).to.have.been.called;

      const {
        args
      } = FormDialogServ.open.getCall(0);
      expect(args[0]).to.be.equal("/foo/bar/form.html");

      const options = args[1];
      expect(options).to.have.property("record");
      expect(options).to.have.property("grid");
      return expect(options.record).to.have.property("id", 123);
    })
    );

    return context("when the `beforeEdit` callback is given", function() {
      before(() => beforeEdit = function(record) {
        record.someValue = "foo bar";
        return record;
      });

      return it("uses it to pre-process the loaded record", inject(function(FormDialogServ) {
        const {
          args
        } = FormDialogServ.open.getCall(0);

        const options = args[1];
        expect(options.record).to.have.property("id", 123);
        return expect(options.record).to.have.property("someValue", "foo bar");
      })
      );
    });
  });

  describe("#createRecord", function() {
    beforeEach(() => $scope.createRecord());

    it("is mixed to the $scope", () => expect($scope.createRecord).to.be.a("function"));

    it("opens a dialog for creating a resource", inject(function(FormDialogServ) {
      expect(FormDialogServ.open).to.have.been.called;
      return expect(FormDialogServ.open).to.have.been.calledWith("/foo/bar/form.html");
    })
    );

    return context("when the `beforeCreate` callback is given", function() {
      before(() => beforeCreate = function(record) {
        record.orderId = 66;
        return record;
      });

      return it("uses it to pre-process the record before create", inject(function(FormDialogServ) {
        const {
          record
        } = FormDialogServ.open.getCall(0).args[1];
        return expect(record).to.have.property("orderId", 66);
      })
      );
    });
  });

  return describe("#deleteRecord", function() {

    it("is mixed to the $scope", () => expect($scope.deleteRecord).to.be.a("function"));

    it("opens the confirmation dialog", inject(function(ConfirmationDialogServ) {
      $scope.deleteRecord(456);
      return expect(ConfirmationDialogServ.open).to.have.been.called;
    })
    );

    context("when the dialog was confirmed", function() {
      beforeEach(inject(function(ConfirmationDialogServ, $httpBackend) {
        ConfirmationDialogServ.confirmed = true;

        $httpBackend.expectDELETE("/api/users/456").respond({id: 456});
        $scope.deleteRecord(456);
        return $httpBackend.flush();
      })
      );

      it("deletes a resource", inject(function($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        return $httpBackend.verifyNoOutstandingRequest();
      })
      );

      return it("removes a row from the grid", function() {
        expect($scope.grid.transactions.removeRow).to.have.been.called;
        return expect($scope.grid.transactions.removeRow).to.have.been.calledWith(456);
      });
    });

    return context("when the dialog wasn't confirmed", function() {
      beforeEach(inject(function(ConfirmationDialogServ) {
        ConfirmationDialogServ.confirmed = false;
        return $scope.deleteRecord(456);
      })
      );

      return it("does not remove a row from the grid", () => expect($scope.grid.transactions.removeRow).to.not.have.been.called);
    });
  });
});
