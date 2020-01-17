import docResMod from '#/docs/src/main'

describe("controller: users.ListCtrl", function() {

  beforeEach(angular.mock.module(docResMod));

  // Stub $uibModal service
  beforeEach(angular.mock.module("ui.bootstrap", function($provide) {
    $provide.value("$uibModal", {open: sinon.mock()});
  })
  );

  beforeEach(angular.mock.module("angleGrinder.forms", function($provide) {
    $provide.decorator("SinglePageCrudCtrlMixin", () => sinon.spy());
    return $provide.decorator("MassUpdateMixin", () => sinon.spy());
  })
  );

  let $scope = null;

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();

    return $controller("users.ListCtrl", {
      $scope,
      Users: "Users"
    }
    );
  })
  );

  it("assigns gridOptions to the $scope", () => expect($scope.gridOptions).to.not.be.undefined);

  describe("mixin: `SinglePageCrudCtrlMixin`", function() {

    it("is mixed", inject(SinglePageCrudCtrlMixin => expect(SinglePageCrudCtrlMixin).to.have.been.called)
    );

    return it("is mixed with valid arguments", inject(function(SinglePageCrudCtrlMixin) {
      expect(SinglePageCrudCtrlMixin).to.have.been.calledWith($scope);

      const args = SinglePageCrudCtrlMixin.getCall(0).args[1];
      expect(args).to.have.property("Resource", "Users");
      expect(args).to.have.property("resourcePath", "/users");
      return expect(args).to.have.property("gridName", "usersGrid");
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
