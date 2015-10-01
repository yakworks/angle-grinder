describe "module: angleGrinder.common", ->

  describe "directive: agTrimTime", ->

    provide = null

    beforeEach module "angleGrinder.common", ($provide) ->
      provide = $provide
      return

    $scope = null
    element = null

    beforeEach inject ($rootScope) ->
      $scope = $rootScope.$new()
      $scope.user = {}

    describe "put on input element", ->

      beforeEach inject ($compile) ->
        template = """
            <input ag-trim-time="user.birthday" type="text"
                   ng-model="user.birthday"
                   name="birthday" />
        """
        element = $compile(template)($scope)
        $scope.$apply()

      it "assigns to scope date without time if input value is string", ->
        element.val("2015-05-22")
        element.trigger('input')
        $scope.$digest()
        expect($scope.user.birthday).to.equal('2015-05-22')

      ###it "assigns to scope date without time if input value is Date", ->
        element.val(new Date(2015, 5, 23, 23, 0))
        element.trigger('input')
        $scope.$digest()
        expect($scope.user.birthday).to.equal('2015-06-23')###

    describe "put on parent element", ->

      timeout = null

      beforeEach inject ($compile, $timeout) ->
        timeout = $timeout
        template = """
          <div ag-datepicker ag-trim-time="user.birthday">
            <input type="text"
                   ng-model="user.birthday"
                   name="birthday" />
          </div>
        """
        element = $compile(template)($scope)
        $scope.$apply()

      it "assigns to scope date without time if input value is string", ->
        element.find("input").val("2015-05-22")
        element.find("input").trigger('input')
        $scope.$digest()
        timeout.flush()
        expect($scope.user.birthday).to.equal('2015-05-22')

      ###it "assigns to scope date without time if input value is Date", ->
        element.find("input").val(new Date(2015, 5, 23, 0, 0))
        element.find("input").trigger('input')
        $scope.$digest()
        timeout.flush()
        expect($scope.user.birthday).to.equal('2015-06-23')###

    describe "set custom date format", ->

      beforeEach inject ($compile) ->
        template = """
            <input ag-trim-time="user.birthday" ag-trim-time-format="MMM DD, YYYY"
                   type="text"
                   ng-model="user.birthday"
                   name="birthday" />
        """
        element = $compile(template)($scope)
        $scope.$apply()

      it "assigns to scope date without time if input value is string", ->
        element.val("2015-05-22T23:00:00+0200")
        element.trigger('input')
        $scope.$digest()
        expect($scope.user.birthday).to.equal('May 22, 2015')

    describe "override default date format", ->

      beforeEach inject ($compile) ->
        provide.value "agTrimTimeFormat", "YYYY/MM/DD"
        template = """
            <input ag-trim-time="user.birthday"
                   type="text"
                   ng-model="user.birthday"
                   name="birthday" />
        """
        element = $compile(template)($scope)
        $scope.$apply()

      it "assigns to scope date without time if input value is string", ->
        element.val("2015-05-22T23:00:00+0200")
        element.trigger('input')
        $scope.$digest()
        expect($scope.user.birthday).to.equal('2015/05/22')
