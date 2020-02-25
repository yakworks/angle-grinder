import formsModule from 'angle-grinder/src/ng/forms'

describe("singlePageCrudCtrlMixinSpec", function() {

  beforeEach(angular.mock.module(formsModule, function($provide) {
    $provide.decorator("DialogCrudCtrlMixin", () => sinon.stub());

    return $provide.decorator("$location", function($delegate) {
      sinon.stub($delegate, "path");
      return $delegate;
    });
  })
  );

  let $scope = null;

  beforeEach(inject(function($rootScope, SinglePageCrudCtrlMixin) {
    $scope = $rootScope.$new();

    // initialize the mixin
    return SinglePageCrudCtrlMixin($scope, {
      Resource: "Users",
      resourcePath: "/path_to_the_resource",
      gridName: "usersGrid"
    }
    );
  })
  );

  describe("mixin: `DialogCrudCtrlMixin`", function() {

    it("is mixed", inject(DialogCrudCtrlMixin => expect(DialogCrudCtrlMixin).to.have.been.called)
    );

    return it("is mixed with valid arguments", inject(function(DialogCrudCtrlMixin) {
      expect(DialogCrudCtrlMixin).to.have.been.calledWith($scope);

      const args = DialogCrudCtrlMixin.getCall(0).args[1];
      expect(args).to.have.property("Resource", "Users");
      return expect(args).to.have.property("gridName", "usersGrid");
    })
    );
  });

  describe("#showRecord", function() {

    it("is mixed to the $scope", () => expect($scope.showRecord).to.be.a("function"));

    return it("navigates to the show record page", inject(function($location) {
      $scope.showRecord(123);

      expect($location.path).to.have.been.called;
      return expect($location.path).to.have.been.calledWith("/path_to_the_resource/123");
    })
    );
  });

  return describe("#editRecord", function() {

    it("is mixed to the $scope", () => expect($scope.editRecord).to.be.a("function"));

    return it("navigates to the edit record page", inject(function($location) {
      $scope.editRecord(456);

      expect($location.path).to.have.been.called;
      return expect($location.path).to.have.been.calledWith("/path_to_the_resource/456/edit");
    })
    );
  });
});
