describe "module: angleGrinder.forms", ->

  describe "directive: editableFormButtons", ->

    beforeEach module "angleGrinder.forms"

    $scope = null
    element = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()
      $scope.user = login: "foo"

      $scope.save = angular.noop
      sinon.spy($scope, "save")

      template = """
        <form editable-form name="testForm" onbeforesave="save(user)">
          <div editable-form-buttons="testForm"></div>
        </form>
      """
      element = $compile(template)($scope)
      $scope.$digest()

    describe "when the form is not visible", ->
      beforeEach ->
        $scope.testForm.$visible = false
        $scope.$digest()

      it "shows `edit` button", ->
        expect(element.find("button").text()).to.contain "Edit"

      describe "click on `edit` button", ->
        beforeEach -> element.find("button").click()

        it "shows the form", ->
          expect($scope.testForm.$visible).to.be.true

    describe "when the form is visible", ->
      beforeEach ->
        $scope.testForm.$visible = true
        $scope.$digest()

      describe "`save` button", ->
        saveButtonEl = null
        beforeEach -> saveButtonEl = element.find("button:nth-child(1)")

        it "is visible", ->
          expect(saveButtonEl.text()).to.contain "Save"

        it "is enabled", ->
          expect(saveButtonEl.attr("disabled")).to.be.undefined

        describe "when request is in progress", ->
          beforeEach ->
            $scope.testForm.$waiting = true
            $scope.$digest()

          it "is disabled", ->
            expect(saveButtonEl.attr("disabled")).to.eq "disabled"

        describe "when the form is invalid", ->
          beforeEach ->
            $scope.testForm.$invalid = true
            $scope.$digest()

          it "is disabled", ->
            expect(saveButtonEl.attr("disabled")).to.eq "disabled"

        describe "on click", ->
          beforeEach -> saveButtonEl.click()

          it "saves the form", ->
            expect($scope.save).to.have.been.called

          it "hides the form", ->
            expect($scope.testForm.$visible).to.be.false

      describe "`cancel` button", ->
        cancelButtonEl = null
        beforeEach -> cancelButtonEl = element.find("button:nth-child(2)")

        it "is visible", ->
          expect(cancelButtonEl.text()).to.contain "Cancel"

        it "is enabled", ->
          expect(cancelButtonEl.attr("disabled")).to.be.undefined

        describe "when request is in progress", ->
          beforeEach ->
            $scope.testForm.$waiting = true
            $scope.$digest()

          it "is disabled", ->
            expect(cancelButtonEl.attr("disabled")).to.eq "disabled"

        describe "on click", ->
          beforeEach -> cancelButtonEl.click()

          it "hides the form", ->
            expect($scope.testForm.$visible).to.be.false
