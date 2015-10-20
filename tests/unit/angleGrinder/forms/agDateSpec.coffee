describe "module: angleGrinder.forms", ->

  describe "directive: agDate", ->

    beforeEach module "angleGrinder.forms"

    $scope = null
    element = null

    describe "use localDate date type (that is used by default)", ->
      beforeEach inject ($rootScope, $compile) ->
        $scope = $rootScope.$new()
        $scope.user = birthday: "1990-03-01"

        template = """
          <input ag-date ng-model="user.birthday"
                   name="birthday" />
        """
        element = $compile(template)($scope)
        $rootScope.$apply()

      it "displays the current value", ->
        expect(element.val()).to.eq("03/01/1990")

      it "saves date to model", inject ($timeout)->
        expect($scope.user.birthday).to.eq("1990-03-01")

    describe "use `date` date type", ->
      beforeEach inject ($rootScope, $compile) ->
        $scope = $rootScope.$new()
        $scope.user = birthday: "1990-03-01"

        template = """
                   <input ag-date ng-model="user.birthday"
                   name="birthday"
                   date-type="date"/>
        """
        element = $compile(template)($scope)
        $rootScope.$apply()

      it "displays the current value", ->
        expect(element.val()).to.eq("03/01/1990")

    describe "use `localDateTime` type", ->
      beforeEach inject ($rootScope, $compile, $timeout) ->
        $scope = $rootScope.$new()
        $scope.user = birthday: "1990-03-01"

        template = """
                <input ag-date ng-model="user.birthday"
                   name="birthday" />
                   date-type="localDateTime"/>
        """
        element = $compile(template)($scope)
        $rootScope.$apply()

      it "displays the current value", ->
        expect(element.val()).to.eq("03/01/1990")

