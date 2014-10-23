describe "module: angleGrinder.forms", ->

  describe "directive: editableDatepicker", ->

    beforeEach module "angleGrinder.forms"

    $scope = null
    element = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()
      $scope.user = birth: new Date()

      element = angular.element """
        <form editable-form name="testForm">
          <span editable-datepicker="user.birth">{{user.birth | date}}</span>
        </form>
      """
      $compile(element)($scope)
      $scope.$digest()

    describe "when the form is visible", ->

      beforeEach ->
        $scope.testForm.$show()
        $scope.$digest()

      editableScope = null
      beforeEach -> editableScope = element.find("[editable-datepicker]").scope()

      calendarButtonEl = null
      beforeEach -> calendarButtonEl = element.find("button i.icon-calendar")

      it "has a button for open the picker", ->
        expect(calendarButtonEl.length).to.eq 1

      it "initially has closed calendar", ->
        expect(editableScope.opened).to.be.false

      describe "when `open calendar` button is clicked", ->

        beforeEach -> calendarButtonEl.click()

        it "opens the calendar", ->
          expect(editableScope.opened).to.be.true
