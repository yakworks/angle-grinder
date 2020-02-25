import formsModule from 'angle-grinder/src/ng/forms'

describe("panelFormMixinSpec", function() {

  beforeEach(angular.mock.module(formsModule));

  return describe("service: PanelFormMixin", function() {

    it("is defined", inject(function(PanelFormMixin) {
      expect(PanelFormMixin).not.to.be.undefined;
      return expect(PanelFormMixin).to.be.a("function");
    })
    );

    let $scope = null;

    beforeEach(inject(function($rootScope, PanelFormMixin) {
      $scope = $rootScope.$new();

      return PanelFormMixin($scope,
        {formName: "theForm"});
    })
    );

    const itIsMixedToTheScope = name => it("is mixed to the $scope", function() {
      expect($scope[name]).to.not.be.undefined;
      return expect($scope[name]).to.be.a("function");
    });

    describe("#showForm", () => it("initially is set to `false`", () => expect($scope.showForm).to.be.false));

    describe("#toggle()", function() {
      itIsMixedToTheScope("toggle");

      return it("toggles form visibility", function() {
        $scope.toggle();
        expect($scope.showForm).to.be.true;

        $scope.toggle();
        return expect($scope.showForm).to.be.false;
      });
    });

    return describe("#update()", function() {
      itIsMixedToTheScope("update");

      beforeEach(() => $scope.showForm = true);

      describe("when the form is valid", function() {
        beforeEach(function() {
          //$scope.theForm = formMock().$setValidity(true);
          $scope.theForm = { $valid:true, $invalid: false }
          return $scope.update();
        })

        return it("closes the form", () => expect($scope.showForm).to.be.false);
      });

      return describe("when the form is not valid", function() {
        beforeEach(function() {
          $scope.theForm = { $valid:false, $invalid: true }
          return $scope.update();
        })

        return it("does not close the form", () => expect($scope.showForm).to.be.true);
      });
    });
  });
});
