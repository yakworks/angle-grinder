describe "module: angleGrinder.forms", ->

  beforeEach module "angleGrinder.forms"

  describe "directive: editablePanelHeading", ->
    $scope = null
    element = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()

      $scope.form =
        $show: sinon.spy()
        $visible: false

      element = angular.element """
        <div editable-panel-heading="form">Foo bar</div>
      """
      $compile(element)($scope)
      $scope.$digest()

    it "has the heading", ->
      expect(element.hasClass("panel-heading")).to.be.true

    it "has the title", ->
      expect(element.find("h4.panel-title").text()).to.contain "Foo bar"

    describe "edit button", ->

      it "is visible", ->
        expect(element.find("a.pull-right").length).to.eq 1

      describe "on click", ->
        beforeEach -> element.find("a.pull-right").click()

        it "shows the form", ->
          expect($scope.form.$show).to.have.been.called

      describe "when the form is visible", ->
        beforeEach -> $scope.$apply "form.$visible = true"

        it "is hidden", ->
          expect(element.find("a.pull-right").length).to.eq 0
