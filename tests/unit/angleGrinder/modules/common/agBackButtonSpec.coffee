describe "module: angleGrinder.common", ->

  # mock `$window.history.back` method
  beforeEach module "ng", ($provide) ->
    $provide.decorator "$window", ($delegate) ->
      $delegate.history.back = sinon.mock()
      $delegate

    return

  beforeEach module "angleGrinder.common"

  describe "directive: agBackButton", ->

    $scope = null
    element = null

    beforeEach inject ($rootScope, $compile) ->
      $scope = $rootScope.$new()

      # compilete the directive
      element = angular.element """
        <a href="/foo/bar" ag-back-button>back</a>
      """
      $scope.$apply -> $compile(element)($scope)

    describe "on `click`", ->

      it "loads the previous page from the history", inject ($window) ->
        # When
        element.click()

        # Then
        expect($window.history.back.called).to.be.true
