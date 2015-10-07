describe "module: angleGrinder.common", ->

  describe "directive: agTrimTime", ->

    beforeEach module "angleGrinder.common"

    $scope = null
    element = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()
      $scope.user = {}
      template = """
          <input ag-trim-time="user.birthday" type="text"
                 ng-model="user.birthday"
                 name="birthday" />
      """
      element = $compile(template)($scope)
      $rootScope.$apply()

    it "assigns to scope date without time if input value is string", ->
      element.val("2015-05-22T23:00:00+0200")
      element.trigger('input')
      $scope.$digest()
      expect($scope.user.birthday).to.equal('2015-05-22')

    it "assigns to scope date without time if input value is Date", ->
      element.val(new Date(2015, 5, 23, 0, 0))
      element.trigger('input')
      $scope.$digest()
      expect($scope.user.birthday).to.equal('2015-06-23')
