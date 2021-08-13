import module from 'angle-grinder/src/ng/controls/xeditable'

xdescribe("module: angleGrinder.forms", () => describe("directive: editableFormButtons", function() {

  beforeEach(angular.mock.module(module));

  let $scope = null;
  let element = null;

  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();
    $scope.user = {login: "foo"};

    $scope.save = angular.noop;
    sinon.spy($scope, "save");

    const template = `\
<form editable-form name="testForm" onbeforesave="save(user)">
<div editable-form-buttons="testForm"></div>
</form>\
`;
    element = $compile(template)($scope);
    return $scope.$digest();
  })
  );

  describe("when the form is not visible", () => beforeEach(function() {
    $scope.testForm.$visible = false;
    return $scope.$digest();
  })

  /*
        it "shows `edit` button", ->
          expect(element.find("button").text()).to.contain "Edit"

        describe "click on `edit` button", ->
          beforeEach -> element.find("button").click()

          it "shows the form", ->
            expect($scope.testForm.$visible).to.be.true

        */);

  return describe("when the form is visible", function() {
    beforeEach(inject(function($rootScope, $compile) {
      $scope = $rootScope.$new();
      $scope.user = {login: "foo"};

      $scope.save = angular.noop;
      sinon.spy($scope, "save");

      const template = `\
<form editable-form name="testForm" onbeforesave="save(user)">
<div editable-form-buttons="testForm"></div>
</form>\
`;
      element = $compile(template)($scope);
      $scope.$digest();

      $scope.testForm.$visible = true;
      return $scope.$digest();
    })
    );

    describe("`save` button", function() {
      let saveButtonEl = null;
      beforeEach(inject(function($rootScope, $compile) {
        $scope = $rootScope.$new();
        $scope.user = {login: "foo"};

        $scope.save = angular.noop;
        sinon.spy($scope, "save");

        const template = `\
<form editable-form name="testForm" onbeforesave="save(user)">
<div editable-form-buttons="testForm"></div>
</form>\
`;
        element = $compile(template)($scope);
        $scope.$digest();

        $scope.testForm.$visible = true;
        $scope.$digest();
        return saveButtonEl = element.find("button:nth-child(2)");
      })
      );

      it("is visible", () => expect(saveButtonEl.text()).to.contain("Cancel"));

      it("is enabled", () => expect(saveButtonEl.attr("disabled")).to.be.undefined);

      describe("when request is in progress", function() {
        beforeEach(function() {
          $scope.testForm.$waiting = true;
          return $scope.$digest();
        });

        return it("is disabled", () => expect(saveButtonEl.attr("disabled")).to.eq("disabled"));
      });

      xdescribe("when the form is invalid", function() {
        beforeEach(function() {
          $scope.testForm.$invalid = true;
          $scope.$digest();
        });

        it("is disabled", () => expect(saveButtonEl.attr("disabled")).to.eq("disabled"));
      });

      describe("on click", () => beforeEach(() => saveButtonEl[0].click()));
    });
    //Ignore for green circle
    /*it "saves the form", ->
      expect($scope.save).to.have.been.called

    it "hides the form", ->
      expect($scope.testForm.$visible).to.be.false*/

    return describe("`save` button", function() {
      let cancelButtonEl = null;
      beforeEach(() => cancelButtonEl = element.find("button:nth-child(1)"));

      it("is visible", () => expect(cancelButtonEl.text()).to.contain("Save"));

      it("is enabled", () => expect(cancelButtonEl.attr("disabled")).to.be.undefined);

      return describe("when request is in progress", function() {
        beforeEach(function() {
          $scope.testForm.$waiting = true;
          return $scope.$digest();
        });

        return it("is disabled", () => expect(cancelButtonEl.attr("disabled")).to.eq("disabled"));
      });
    });
  });
}));
