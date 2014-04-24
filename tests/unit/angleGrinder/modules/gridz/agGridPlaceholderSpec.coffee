describe "module: angleGrinder.gridz", ->

  beforeEach module "angleGrinder.common", ($provide) ->
    $provide.value "pathWithContext", (path) -> "/foo/#{path}"
    return

  beforeEach module "angleGrinder.gridz"

  beforeEach inject ($templateCache) ->
    $templateCache.put "/foo/bar/biz.html", "<div id='the-grid'>grid</div>"

  describe "directive: agGridPlaceholder", ->

    $scope = null

    elementTemplate = null
    element = null
    elementScope = null

    before ->
      elementTemplate = """
        <ag-grid-placeholder src="bar/biz.html"></ag-grid-placeholder>
      """

    # compile the directive
    beforeEach inject ($compile, $rootScope) ->
      $scope = $rootScope.$new()

      element = $compile(elementTemplate, $scope)($scope)
      elementScope = element.scope()

      $rootScope.$digest()

    it "initially does not render the grid", ->
      expect(elementScope.renderGrid).to.be.false

    it "initially hides the grid", ->
      expect(elementScope.showGrid).to.be.false

    it "assings valid template url to the scope", ->
      expect(elementScope.templateSrc).to.eq "/foo/bar/biz.html"

    context "on route change", ->

      changeRouteTo = (path) ->
        inject ($rootScope) ->
          $rootScope.$apply ->
            $rootScope.$broadcast "$routeChangeSuccess", originalPath: path

      it "renders the grid only once", ->
        expect(elementScope.renderGrid).to.be.false

        changeRouteTo "/"
        expect(elementScope.renderGrid).to.be.true

        changeRouteTo "/show/123"
        expect(elementScope.renderGrid).to.be.true

      context "to the other page", ->

        it "hides the grid", ->
          changeRouteTo "/show/123"

          expect(elementScope.renderGrid).to.be.false
          expect(elementScope.showGrid).to.be.false

      context "to the root page", ->

        it "shows the grid", ->
          changeRouteTo "/"

          expect(elementScope.renderGrid).to.be.true
          expect(elementScope.showGrid).to.be.true

          expect(element.find("#the-grid").text()).to.eq "grid"

    context "when `forceRenderGrid` attribute is given", ->

      context "and it is set to `true`", ->
        before ->
          elementTemplate = """
            <ag-grid-placeholder src="bar/biz.html" force-render-grid="true"></ag-grid-placeholder>
          """

        it "initially forces to render the grid", ->
          expect(elementScope.renderGrid).to.be.true

      context "adn is is set to `false`", ->
        before ->
          elementTemplate = """
            <ag-grid-placeholder src="bar/biz.html" force-render-grid="false"></ag-grid-placeholder>
          """

        it "initially does not render the grid", ->
          expect(elementScope.renderGrid).to.be.false
