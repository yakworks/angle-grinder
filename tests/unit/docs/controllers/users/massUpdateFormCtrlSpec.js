import docResMod from '#/docs/src/main'

describe("controller: users.MassUpdateFormCtrl", function() {

  beforeEach(angular.mock.module(docResMod, $provide => $provide.decorator("massUpdateFormCtrlMixin", () => sinon.spy()))
  );

  beforeEach(angular.mock.module(docResMod));

  let $scope = null;

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();

    return $controller("users.MassUpdateFormCtrl", {
      $scope,
      dialog: "foo",
      Users: "Users",
      selectedIds: "bar",
      grid: "biz"
    }
    );
  })
  );

  it("assigns default value for records", function() {
    expect($scope.records).to.not.be.undefined;
    return expect($scope.records.creditInfo.allowance).to.be.eq( 0);
  });

  return describe("mixin: `massUpdateFormCtrlMixin`", function() {

    it("is mixed", inject(massUpdateFormCtrlMixin => expect(massUpdateFormCtrlMixin).to.have.been.called)
    );

    return it("is mixed with valid arguments", inject(function(massUpdateFormCtrlMixin) {
      expect(massUpdateFormCtrlMixin).to.have.been.calledWith($scope);

      const args = massUpdateFormCtrlMixin.getCall(0).args[1];
      expect(args).to.have.property("dialog", "foo");
      expect(args).to.have.property("Resource", "Users");
      expect(args).to.have.property("selectedIds", "bar");
      return expect(args).to.have.property("grid", "biz");
    })
    );
  });
});
