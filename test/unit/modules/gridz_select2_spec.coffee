describe "module: angleGrinder.gridz, directive: agSelect2", ->
  beforeEach module("angleGrinder.gridz")

  $scope = null
  element = null

  compileTemplate = (template) ->
    beforeEach inject ($rootScope, $compile, $timeout) ->
      $scope = $rootScope.$new()
      $scope.selectOptions = { foo: "bar" }
      element = angular.element(template)

      $compile(element)($scope)
      $scope.$apply()

  describe "basic example", ->
    compileTemplate """
      <ag-select2 select-options="selectOptions" ng-model="search.organization">
        <table ag-select2-result class="table table-condensed">
          <tr>
            <td>{{item.num}}</td>
            <td>{{item.name}}</td>
          </tr>
        </table>
      </ag-select2>
    """

    it "generates select2 component along with the show button", ->
      expect(element).toContain "input[type=text]"
      expect(element).toContain "button[type=button]"

    describe "scope", ->
      $directiveScope = null

      beforeEach ->
        $scope.$apply -> $scope.foo = "bar"
        $directiveScope = element.scope()

      it "has default options for select2", ->
        options = $directiveScope.options

        expect(options.minimumInputLength).toBeDefined()
        expect(options.minimumInputLength).toEqual 1

        expect(options.width).toBeDefined()
        expect(options.width).toEqual "resolve"

      describe "default `formatResult` method", ->
        formatResult = null
        beforeEach -> formatResult = $directiveScope.options.formatResult

        it "is defined", ->
          expect(formatResult).toBeDefined()

        it "generates html code fro the result", ->
          result = formatResult(num: 123, name: "Test")
          $directiveScope.$apply()

          expect(result).toHaveClass "table"
          expect(result).toHaveClass "table-condensed"
          expect(result.find("td:nth-child(1)")).toHaveText "123"
          expect(result.find("td:nth-child(2)")).toHaveText "Test"

      describe "describe `formatSelection` method", ->
        formatSelection = null
        beforeEach -> formatSelection = $directiveScope.options.formatSelection

        it "is defined", ->
          expect(formatSelection).toBeDefined()

        it "formats the selection", ->
          expect(formatSelection(name: "foo")).toEqual "foo"

      it "isolates the scope", ->
        expect($directiveScope).not.toBe $scope
        expect($directiveScope.foo).not.toBeEqualToObject "bar"

      it "takes the select2 options from the parent scope", ->
        expect($directiveScope.options).toBeDefined()
        expect($directiveScope.options["foo"]).toEqual "bar"

      it "takes a model from the parent scope", ->
        $scope.$apply -> $scope.search = organization: "the org name"

        expect($directiveScope.ngModel).toBeDefined()
        expect($directiveScope.ngModel).toEqual "the org name"

    describe "the open select button", ->
      it "opens the select component", ->
        spy = spyOn($.fn, "select2")
        element.find("button.open").click()
        expect(spy).toHaveBeenCalledWith "open"

  describe "when `selectAjaxUrl` is provided", ->
    describe "without context path", ->
      compileTemplate """
        <ag-select2 select-ajax-url="/api/orgs.json" ng-model="search.org" />
      """

      $directiveScope = null
      ajaxOptions = null

      beforeEach ->
        $directiveScope = element.scope()
        ajaxOptions = $directiveScope.options.ajax

      it "defines ajax options for handling server side lookup", ->
        expect(ajaxOptions).toBeDefined()

      it "has valid server side lookup path", ->
        expect(ajaxOptions.url).toBeDefined()
        expect(ajaxOptions.url).toEqual "/api/orgs.json"

    describe "with context path", ->
      beforeEach module (pathWithContextProvider) ->
        pathWithContextProvider.setContextPath "/foo/bar"

      compileTemplate """
        <ag-select2 select-ajax-url="/api/users.json" ng-model="search.org" />
      """

      $directiveScope = null
      beforeEach -> $directiveScope = element.scope()

      it "has lookup path with the valid context", ->
        ajaxOptions = $directiveScope.options.ajax
        expect(ajaxOptions.url).toEqual "/foo/bar/api/users.json"
