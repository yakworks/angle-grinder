import formsModule from '~/scripts/forms'

describe("Directive: agSubmit", function() {

  beforeEach(angular.mock.module(formsModule, function($provide) {
    //console.log("12333333333333333333333333333333333333333")
    $provide.value("serverValidationErrorsHandler", sinon.stub());
  })
  );

  let $scope = null;
  let element = null;
  let clickSubmit = null;

  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();

    $scope.item = {name: "", resourceName() { return "user"; }};
    $scope.save = sinon.spy();

    element = angular.element(`\
<form id="testForm" name="testForm" ag-submit="save(item)">
  <input type="text" name="name" ng-model="item.name" ng-required="true"/>
  <button type="submit">Save</button>
</form>\
`
    );
    element = $compile(element)($scope);

    return clickSubmit = () => element.submit();
  })
  );

  describe("when the form is valid", function() {

    beforeEach(() => $scope.$apply(() => $scope.item.name = "foo"));

    it("marks the form as submitted", function() {
      //TODO: check why it became false instead of undefined
      expect($scope.testForm.$submitted).to.be.false;
      clickSubmit();
      return expect($scope.testForm.$submitted).to.be.true;
    });

    it("calls the given method", function() {
      clickSubmit();
      return expect($scope.save).to.have.been.calledWith($scope.item);
    });

    return describe("when the submit method returns a promise", function() {

      describe("on success", function() {

        beforeEach(inject(function($q) {
          const deferred = $q.defer();
          deferred.resolve({});

          return $scope.save = () => deferred.promise;
        })
        );

        it("enable/disable the form controls", function() {
          clickSubmit();

          expect($scope.testForm.$saving).to.be.true;
          $scope.$digest(); // resolve the promise
          return expect($scope.testForm.$saving).to.be.false;
        });

        return it("resets the form", function() {
          sinon.spy($scope.testForm, "$setPristine");
          clickSubmit();

          expect($scope.testForm.$submitted).to.be.true;
          $scope.$digest(); // resolve the promise
          expect($scope.testForm.$setPristine).to.have.been.called;
          return expect($scope.testForm.$submitted).to.be.false;
        });
      });

      return describe("on error", function() {

        let response = null;

        beforeEach(inject(function($q) {
          const deferred = $q.defer();
          deferred.reject(response);

          return $scope.save = () => [deferred.promise, $scope.item];}));

        describe("when the promise was rejected with server side errors", function() {

          before(() => response = { data: { errors: { name: { message: "is taken" } } } });

          it("enable/disable the form controls", function() {
            clickSubmit();

            expect($scope.testForm.$saving).to.be.true;
            $scope.$digest(); // resolve the promise
            return expect($scope.testForm.$saving).to.be.false;
          });

          it("does not reset the form", function() {
            sinon.spy($scope.testForm, "$setPristine");
            clickSubmit();

            expect($scope.testForm.$submitted).to.be.true;
            $scope.$digest(); // resolve the promise
            expect($scope.testForm.$setPristine).to.not.have.been.called;
            return expect($scope.testForm.$submitted).to.be.true;
          });

          return it("handles server side errors", inject(function(serverValidationErrorsHandler) {
            clickSubmit();
            $scope.$digest(); // resolve the promise

            expect(serverValidationErrorsHandler).to.have.been.called;

            const {
              args
            } = serverValidationErrorsHandler.getCall(0);
            expect(args[0]).to.not.be.undefined;
            expect(args[1]).to.eq(response);
            return expect(args[2]).to.eq("user");
          })
          );
        });

        return describe("otherwise", function() {

          before(() => response = { data: { errors: undefined } });

          it("enable/disable the form controls", function() {
            clickSubmit();

            expect($scope.testForm.$saving).to.be.true;
            $scope.$digest(); // resolve the promise
            return expect($scope.testForm.$saving).to.be.false;
          });

          it("does not reset the form", function() {
            sinon.spy($scope.testForm, "$setPristine");
            clickSubmit();

            expect($scope.testForm.$submitted).to.be.true;
            $scope.$digest(); // resolve the promise
            expect($scope.testForm.$setPristine).to.not.have.been.called;
            return expect($scope.testForm.$submitted).to.be.true;
          });

          it("does not assign the server side errors", function() {
            clickSubmit();

            $scope.$digest(); // resolve the promise
            return expect($scope.testForm.$serverErrors).to.be.undefined;
          });

          return it("does not set validity on fields with error", function() {
            sinon.spy($scope.testForm.name, "$setValidity");
            clickSubmit();

            $scope.$digest(); // resolve the promise
            return expect($scope.testForm.name.$setValidity).to.not.have.been.called;
          });
        });
      });
    });
  });

  describe("when the form is not valid", function() {

    beforeEach(() => $scope.$apply(() => $scope.item.name = ""));

    return it("does not call the given method", function() {
      clickSubmit();
      return expect($scope.save).to.not.have.been.called;
    });
  });

  return describe("check nested form", () => beforeEach(inject(function($compile) {

    $scope.item = {name: "", resourceName() { return "user"; }};
    $scope.save = sinon.spy();

    let element2 = angular.element(`\
  <form name="testForm" ag-submit="save(item)">
    <fieldset ng-form="test2Form">
      <input type="text" name="name" ng-model="item.name" ng-required="true"/>
    </fieldset>
    <button type="submit">Save</button>
</form>\
`
    );
    element2 = $compile(element2)($scope);

    const clickSubmit2 = () => element2.find("button[type=submit]").click();

    return describe("when the forms ar valid", function() {

      beforeEach(() => $scope.$apply(() => $scope.item.name = "foo"));

      return it("marks the forms as submitted", function() {
        expect($scope.testForm.$submitted).to.be.false;
        expect($scope.test2Form.$submitted).to.be.false;
        clickSubmit2();
        expect($scope.testForm.$submitted).to.be.true;
        return expect($scope.test2Form.$submitted).to.be.true;
      });
    });
  })
  ));
});
