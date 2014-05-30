describe "module: angleGrinder.forms", ->

  describe "directive: agDatepicker", ->

    beforeEach module "angleGrinder.forms"

    $scope = null
    element = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()
      $scope.user = birthday: new Date(1983, 2, 4)

      template = """
        <div ag-datepicker>
          <input type="text"
                 ng-model="user.birthday"
                 name="birthday" />
        </div>
      """
      element = $compile(template)($scope)
      $rootScope.$apply()

    it "displays the current value", ->
      expect(element.find("input").val()).to.eq("03/04/1983")

    describe "clear a date", ->

      it "clears the date", ->
        openButton = element.find("button")
        openButton.click()

        clearButton = element.find("ul").find("button:contains('Clear')")
        clearButton.click()

        expect(element.find("input").val()).to.eq("")
