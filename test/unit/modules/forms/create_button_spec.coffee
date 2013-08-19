describe "module: angleGrinder.forms directive: agCreateButton", ->
  beforeEach module("angleGrinder.forms")

  element = null
  $scope = null

  beforeEach inject ($rootScope) ->
    $scope = $rootScope.$new()
    $scope.foo = jasmine.createSpy()

  itHasTheFollowingHref = (href) ->
    it "generates a link with valid `href`", ->
      expect(element.attr("href")).toEqual href

  itHasValidCssClass = ->
    it "has valid css class", ->
      expect(element).toHaveClass "btn"

  itHasANiceIcon = ->
    it "has a nice icon", ->
      expect(element.find("i")).toHaveClass "icon-edit"

  itOnClickCallsTheScopeMethod = ->
    describe "on click", ->
      it "calls the given scope method", ->
        # When
        element.click()
        # Then
        expect($scope.foo).toHaveBeenCalled()

  describe "without a custom label", ->
    beforeEach inject ($injector) ->
      {element} = compileTemplate """
        <ag-create-button href="#/users/create" ng-click="foo()" />
      """, $injector, $scope

    itHasTheFollowingHref "#/users/create"
    itHasValidCssClass()
    itHasANiceIcon()
    itOnClickCallsTheScopeMethod()

    it "has the default label", ->
      expect($.trim element.text()).toEqual "Create"

  describe "with the custom label", ->
    beforeEach inject ($injector) ->
      {element} = compileTemplate """
        <ag-create-button href="#/projects/create" ng-click="foo()">Create user</ag-create-button>
      """, $injector, $scope

    itHasTheFollowingHref "#/projects/create"
    itHasValidCssClass()
    itHasANiceIcon()
    itOnClickCallsTheScopeMethod()

    it "has the custom label", ->
      expect($.trim element.text()).toEqual "Create user"
