describe "module: angleGrinder.gridz", ->

  # stubs `pathWithContext` service
  beforeEach module "angleGrinder.common", ($provide) ->
    $provide.value "pathWithContext", sinon.stub()
    # this is important, see: https://groups.google.com/forum/#!msg/angular/gCGF_B4eQkc/XjkvbgE9iMcJ
    return

  beforeEach module("angleGrinder.gridz")

  describe "directive: agSelect2", ->

    $scope = null
    $directiveScope = null
    element = null

    beforeEach inject ($rootScope) ->
      $scope = $rootScope.$new()
      $scope.selectOptions = foo: "bar"

    prepareDirective = (template) ->
      beforeEach inject ($injector) ->
        {element, $scope} = compileTemplate(template, $injector, $scope)
        $directiveScope = element.scope()

    describe "basic example", ->
      prepareDirective """
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
        beforeEach ->
          $scope.$apply -> $scope.foo = "bar"

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
          expect($directiveScope.options.foo).toBeDefined()
          expect($directiveScope.options.foo).toEqual "bar"

        it "takes a model from the parent scope", ->
          $scope.$apply -> $scope.search = organization: "the org name"

          expect($directiveScope.ngModel).toBeDefined()
          expect($directiveScope.ngModel).toEqual "the org name"

    describe "when `selectAjaxUrl` option is provided", ->
      beforeEach inject (pathWithContext) ->
        pathWithContext.returns("/context/api/orgs.json")

      prepareDirective """
        <ag-select2 select-ajax-url="/api/orgs.json" ng-model="search.org" />
      """

      directiveAjaxOptions = null
      beforeEach -> directiveAjaxOptions = $directiveScope.options.ajax

      it "defines ajax options for handling server side lookup", ->
        expect(directiveAjaxOptions).toBeDefined()

      it "uses `pathWithContext` to generate a valid path", inject (pathWithContext) ->
        expect(pathWithContext.calledWith("/api/orgs.json")).toBeTruthy()

      it "assigns a valid server side lookup path", ->
        expect(directiveAjaxOptions.url).toBeDefined()
        expect(directiveAjaxOptions.url).toEqual "/context/api/orgs.json"

      it "assigns default `ajax.quietMillis` option", ->
        expect(directiveAjaxOptions.quietMillis).toEqual 500

    describe "when `selectAjaxUrl` options is provided along with `selectAjaxQuietMillis`", ->
      prepareDirective """
        <ag-select2 select-ajax-url="/api/orgs.json"
                    select-ajax-quiet-millis="666"
                    ng-model="search.org" />
      """

      it "ignores default value for `ajax.quietMillis` option", ->
        expect($directiveScope.options.ajax.quietMillis).not.toEqual 500

      it "assigns default `ajax.quietMillis` option", ->
        expect($directiveScope.options.ajax.quietMillis).toEqual 666

    describe "when `minimumInputLength` option is provided", ->
      beforeEach -> $scope.selectOptions = minimumInputLength: 123

      prepareDirective """
        <ag-select2 select-options="selectOptions" ng-model="search.org" />
      """

      it "assings a valid option", ->
        expect($directiveScope.options.minimumInputLength).toEqual 123

    describe "when `minimumInputLength` option is not provided", ->
      beforeEach -> $scope.selectOptions = {}

      prepareDirective """
        <ag-select2 select-options="selectOptions" ng-model="search.org" />
      """

      it "assings the default value", ->
        expect($directiveScope.options.minimumInputLength).toEqual 1

    describe "when `minimumInputLength` option in provided via the attribute", ->
      beforeEach -> $scope.selectOptions = minimumInputLength: 123

      prepareDirective """
        <ag-select2 select-options="selectOptions"
                    select-minimum-input-length="234"
                    ng-model="search.org" />
      """

      it "ignores value from the scope", ->
        expect($directiveScope.options.minimumInputLength).not.toEqual 123

      it "assings value from the attribute", ->
        expect($directiveScope.options.minimumInputLength).toEqual 234

  describe "directive: agSelect2Open", ->
    element = null
    $scope = null

    beforeEach inject ($injector, $rootScope) ->
      $scope = $rootScope.$new()

      {element} = compileTemplate """
        <div>
          <select ui-select2 ng-model="filters.dummy">
            <option value=""></option>
            <option value="one">First</option>
            <option value="two">Second</option>
          </select>
          <ag-select2-open></ag-select2-open>
        </div>
      """, $injector, $scope

    describe "on click", ->
      button = null
      beforeEach -> button = element.find("button.open-select2")

      it "opens the select2 component", ->
        # Given
        spy = sinon.spy($.fn, "select2")

        # When
        button.click()

        # Then
        expect(spy.called).toBeTruthy()
        expect(spy.calledWith("open")).toBeTruthy()
