describe "module: angleGrinder.common", ->

  beforeEach module "angleGrinder.common"

  describe "directive: menuItem", ->

    element = null
    parentElement = null
    $scope = null

    beforeEach inject ($compile, $rootScope) ->
      $scope = $rootScope.$new()

      parentElement = angular.element """
        <div list-icon="test">
          <menu-item for="user">Show user</menu-item>
        </div>
      """
      $compile(parentElement)($scope)
      $scope.$digest()
      element = parentElement.children().first()

    it "has valid menu item title", ->
      expect(element.find("a").text()).to.include "Show user"

    it "has valid href", ->
      expect(element.find("a").attr("href")).to.eq "#/user"

    describe "activate link", ->

      describe "when the current path match the section", ->

        beforeEach inject ($route) ->
          $route.current = page: "user"
          $scope.$digest()

        it "activates the menu item", ->

          expect(element.hasClass("active")).to.be.true

      describe "otherwise", ->

        beforeEach inject ($route) ->
          $route.current = page: "transaction"
          $scope.$digest()

        it "activates the menu item", ->
          expect(element.hasClass("active")).to.be.false
