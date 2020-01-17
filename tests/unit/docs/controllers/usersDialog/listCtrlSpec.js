import docResMod from '#/docs/src/main'

describe("controller: usersDialog.ListCtrl", function() {

  beforeEach(angular.mock.module(docResMod, function($provide) {
    $provide.decorator("DialogCrudCtrlMixin", () => sinon.spy());
    return $provide.decorator("MassUpdateMixin", () => sinon.spy());
  })
  );

  let $scope = null;

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();

    $scope.usersGrid = {};

    return $controller("usersDialog.ListCtrl", {
      $scope,
      Users: "Users"
    }
    );
  })
  );

  describe("$scope", () => it("assigns gridOptions", function() {
    expect($scope.gridOptions).to.not.be.undefined;

    expect($scope.gridOptions.colModel.length).to.equal(7);
    expect($scope.gridOptions.colModel[0].name).to.equal("id");
    expect($scope.gridOptions.colModel[1].name).to.equal("login");
    expect($scope.gridOptions.colModel[2].name).to.equal("info.email");
    expect($scope.gridOptions.colModel[3].name).to.equal("name");
    expect($scope.gridOptions.colModel[4].name).to.equal("birthday");
    expect($scope.gridOptions.colModel[5].name).to.equal("creditInfo.allowance");
    return expect($scope.gridOptions.colModel[6].name).to.equal("creditInfo.paid");
  }));

  describe("mixin: `DialogCrudCtrlMixin`", function() {

    it("is mixed", inject(DialogCrudCtrlMixin => expect(DialogCrudCtrlMixin).to.have.been.called)
    );

    return it("is mixed with valid arguments", inject(function(DialogCrudCtrlMixin) {
      expect(DialogCrudCtrlMixin).to.have.been.calledWith($scope);

      const args = DialogCrudCtrlMixin.getCall(0).args[1];
      expect(args).to.have.property("Resource", "Users");
      expect(args).to.have.property("gridName", "usersGrid");
      //expect(args).to.have.property("templateUrl", "templates/usersDialog/form.html");
    })
    );
  });

  return describe("mixin: `MassUpdateMixin`", function() {

    it("is mixed", inject(MassUpdateMixin => expect(MassUpdateMixin).to.have.been.called)
    );

    return it("is mixed with valid arguments", inject(function(MassUpdateMixin) {
      expect(MassUpdateMixin).to.have.been.calledWith($scope);

      const args = MassUpdateMixin.getCall(0).args[1];
      //expect(args).to.have.property("templateUrl", "/templates/users/massUpdateForm.html");
      expect(args).to.have.property("controller", "users.MassUpdateFormCtrl");
      return expect(args).to.have.property("gridName", "usersGrid");
    })
    );
  });
});
