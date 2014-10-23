describe "module: angleGrinder.forms", ->

  describe "directive: editableCustom", ->

    beforeEach module "angleGrinder.forms"

    $scope = null
    element = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()

      $scope.roles = [
        { id: "guest", name: "Guest" }
        { id: "moderator", name: "Moderator" }
        { id: "admin", name: "Admin" }
      ]
      $scope.user = role: "guest"

      element = angular.element """
        <form editable-form name="testForm">
          <span editable-custom="user.login">{{user.role}}</span>
          <div editable-custom-template>
            <select name="role" ng-model="$data">
              <option ng-repeat="role in roles" value="{{role.id}}">{{role.name}}</option>
            </select>
          </div>
        </form>
      """
      $compile(element)($scope)
      $scope.$digest()

    describe "when the form is hidden", ->

      it "hides the custom input", ->
        expect(element.find("select[name=role]").length).to.eq 0

    describe "when the form is visible", ->

      beforeEach ->
        $scope.testForm.$show()
        $scope.$digest()

      it "shows the custom input", ->
        expect(element.find("select[name=role]").length).to.eq 1
