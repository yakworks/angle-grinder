describe "module: angleGrinder.gridz", ->

  beforeEach module "angleGrinder.common", ($provide) ->
    $provide.value "pathWithContext", (path) -> "/foo/#{path}"
    return

  beforeEach module "angleGrinder.gridz"

  beforeEach inject ($templateCache) ->
    $templateCache.put "/foo/bar/biz.html", "<div id='the-grid'>grid</div>"

  describe "directive: agGridPlaceholder", ->

    element = null
    $scope = null

    beforeEach inject ($compile, $rootScope) ->
      $scope = $rootScope.$new()

      link = $compile """
        <ag-grid-placeholder src="bar/biz.html"></ag-grid-placeholder>
      """, $scope
      element = link($scope)

      $rootScope.$digest()

    it "initially displays the grid", ->
      expect(element.scope().showGrid).to.be.true
      expect(element.find("#the-grid").text()).to.eq "grid"

    it "assings valid template url to the scope", ->
      expect(element.scope().templateSrc).to.eq "/foo/bar/biz.html"

    context "on route change", ->

      changeRouteTo = (path) ->
        beforeEach inject ($rootScope) ->
          $rootScope.$apply ->
            $rootScope.$broadcast "$routeChangeSuccess", originalPath: path

      context "to the other page", ->
        changeRouteTo "/show/123"

        it "hides the grid", ->
          expect(element.scope().showGrid).to.be.false

      context "to the root page", ->
        changeRouteTo "/"

        it "hides the grid", ->
          expect(element.scope().showGrid).to.be.true
