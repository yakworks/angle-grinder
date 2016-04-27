describe "Directive: agSubmit", ->

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.value "serverValidationErrorsHandler", sinon.stub()
    return

  $scope = null
  element = null
  clickSubmit = null

  beforeEach inject ($rootScope, $compile) ->
    $scope = $rootScope.$new()

    $scope.item = name: "", resourceName: -> "user"
    $scope.save = sinon.spy()

    element = angular.element """
      <form name="testForm" ag-submit="save(item)">
        <input type="text" name="name" ng-model="item.name" ng-required="true"/>
        <button type="submit">Save</button>
      </form>
    """
    element = $compile(element)($scope)

    clickSubmit = ->
      element.find("button[type=submit]").click()

  describe "when the form is valid", ->

    beforeEach -> $scope.$apply -> $scope.item.name = "foo"

    it "marks the form as submitted", ->
      #TODO: check why it became false instead of undefined
      expect($scope.testForm.$submitted).to.be.false
      clickSubmit()
      expect($scope.testForm.$submitted).to.be.true

    it "calls the given method", ->
      clickSubmit()
      expect($scope.save).to.have.been.calledWith($scope.item)

    describe "when the submit method returns a promise", ->

      describe "on success", ->

        beforeEach inject ($q) ->
          deferred = $q.defer()
          deferred.resolve({})

          $scope.save = ->
            return deferred.promise

        it "enable/disable the form controls", ->
          clickSubmit()

          expect($scope.testForm.$saving).to.be.true
          $scope.$digest() # resolve the promise
          expect($scope.testForm.$saving).to.be.false

        it "resets the form", ->
          sinon.spy($scope.testForm, "$setPristine")
          clickSubmit()

          expect($scope.testForm.$submitted).to.be.true
          $scope.$digest() # resolve the promise
          expect($scope.testForm.$setPristine).to.have.been.called
          expect($scope.testForm.$submitted).to.be.false

      describe "on error", ->

        response = null

        beforeEach inject ($q) ->
          deferred = $q.defer()
          deferred.reject(response)

          $scope.save = ->
            return [deferred.promise, $scope.item]

        describe "when the promise was rejected with server side errors", ->

          before ->
            response = { data: { errors: { name: { message: "is taken" } } } }

          it "enable/disable the form controls", ->
            clickSubmit()

            expect($scope.testForm.$saving).to.be.true
            $scope.$digest() # resolve the promise
            expect($scope.testForm.$saving).to.be.false

          it "does not reset the form", ->
            sinon.spy($scope.testForm, "$setPristine")
            clickSubmit()

            expect($scope.testForm.$submitted).to.be.true
            $scope.$digest() # resolve the promise
            expect($scope.testForm.$setPristine).to.not.have.been.called
            expect($scope.testForm.$submitted).to.be.true

          it "handles server side errors", inject (serverValidationErrorsHandler) ->
            clickSubmit()
            $scope.$digest() # resolve the promise

            expect(serverValidationErrorsHandler).to.have.been.called

            args = serverValidationErrorsHandler.getCall(0).args
            expect(args[0]).to.not.be.undefined
            expect(args[1]).to.eq response
            expect(args[2]).to.eq "user"

        describe "otherwise", ->

          before ->
            response = { data: { errors: undefined } }

          it "enable/disable the form controls", ->
            clickSubmit()

            expect($scope.testForm.$saving).to.be.true
            $scope.$digest() # resolve the promise
            expect($scope.testForm.$saving).to.be.false

          it "does not reset the form", ->
            sinon.spy($scope.testForm, "$setPristine")
            clickSubmit()

            expect($scope.testForm.$submitted).to.be.true
            $scope.$digest() # resolve the promise
            expect($scope.testForm.$setPristine).to.not.have.been.called
            expect($scope.testForm.$submitted).to.be.true

          it "does not assign the server side errors", ->
            clickSubmit()

            $scope.$digest() # resolve the promise
            expect($scope.testForm.$serverErrors).to.be.undefined

          it "does not set validity on fields with error", ->
            sinon.spy($scope.testForm.name, "$setValidity")
            clickSubmit()

            $scope.$digest() # resolve the promise
            expect($scope.testForm.name.$setValidity).to.not.have.been.called

  describe "when the form is not valid", ->

    beforeEach -> $scope.$apply -> $scope.item.name = ""

    it "does not call the given method", ->
      clickSubmit()
      expect($scope.save).to.not.have.been.called

  describe "check nested form", ->
    beforeEach inject ($compile) ->

      $scope.item = name: "", resourceName: -> "user"
      $scope.save = sinon.spy()

      element2 = angular.element """
          <form name="testForm" ag-submit="save(item)">
            <fieldset ng-form="test2Form">
              <input type="text" name="name" ng-model="item.name" ng-required="true"/>
            </fieldset>
            <button type="submit">Save</button>
      </form>
        """
      element2 = $compile(element2)($scope)

      clickSubmit2 = ->
        element2.find("button[type=submit]").click()

      describe "when the forms ar valid", ->

        beforeEach -> $scope.$apply -> $scope.item.name = "foo"

        it "marks the forms as submitted", ->
          expect($scope.testForm.$submitted).to.be.false
          expect($scope.test2Form.$submitted).to.be.false
          clickSubmit2()
          expect($scope.testForm.$submitted).to.be.true
          expect($scope.test2Form.$submitted).to.be.true
