describe "module: angleGrinder.forms", ->

  describe "directive: editableDirectiveFactory", ->

    beforeEach module "angleGrinder.forms"

    $scope = null
    element = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()
      $scope.user = login: "foobar"

      element = angular.element """
        <form editable-form name="testForm">
          <span editable-text="user.login"
                e-name="login"
                e-ng-required="true"></span>
        </form>
      """
      $compile(element)($scope)
      $rootScope.$apply()

    describe "when the form is visible", ->

      beforeEach ->
        $scope.testForm.$show()
        $scope.$digest()

      describe "whe the field is valid", ->

        beforeEach ->
          $scope.testForm.login.$setViewValue("foo")
          $scope.$digest()

        it "it hides the error message", ->
          expect(element.find("div.editable-error").text()).to.eq ""

      describe "when the field has error", ->

        beforeEach ->
          $scope.testForm.login.$setViewValue("")
          $scope.$digest()

        it "it displays the error message", ->
          expect(element.find("div.editable-error").text()).to.eq "This field is required"
