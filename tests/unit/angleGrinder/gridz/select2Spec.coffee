describe "module: angleGrinder.gridz", ->

  # stubs `pathWithContext` service
  beforeEach module "angleGrinder.common", ($provide) ->
    $provide.value "pathWithContext", sinon.stub()
    # this is important, see: https://groups.google.com/forum/#!msg/angular/gCGF_B4eQkc/XjkvbgE9iMcJ
    return

  beforeEach module "angleGrinder.gridz"

  describe "directive: agSelect2", ->

    $scope = null
    isolatedScope = null
    element = null

    beforeEach inject ($rootScope) ->
      $scope = $rootScope.$new()
      $scope.selectOptions = foo: "bar"

    prepareDirective = (template) ->
      beforeEach inject ($injector) ->
        {element, $scope} = compileTemplate(template, $injector, $scope)
        isolatedScope = element.isolateScope()

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
        expect(element.find("input").length).to.equal 1
        expect(element.find("button[type=button]").length).to.equal 1

      describe "isolated scope", ->
        beforeEach ->
          $scope.$apply -> $scope.foo = "bar"

        it "has default options for select2", ->
          options = isolatedScope.options

          expect(options).to.not.be.undefined
          expect(options).to.have.property "minimumInputLength", 1
          expect(options).to.have.property "width", "resolve"

        describe "default `formatResult` method", ->
          formatResult = null
          beforeEach -> formatResult = isolatedScope.options.formatResult

          it "is defined", ->
            expect(formatResult).to.not.be.undefined

          it "generates html code for the result", ->
            result = formatResult(num: 123, name: "Test")
            isolatedScope.$apply()

            expect(result.hasClass("table")).to.be.true
            expect(result.hasClass("table-condensed")).to.be.true
            expect(result.find("td:nth-child(1)").text()).to.contain "123"
            expect(result.find("td:nth-child(2)").text()).to.contain "Test"

        describe "describe `formatSelection` method", ->
          formatSelection = null
          beforeEach -> formatSelection = isolatedScope.options.formatSelection

          it "is defined", ->
            expect(formatSelection).to.not.be.undefined

          it "formats the selection", ->
            expect(formatSelection(name: "foo")).to.equal "foo"

        it "isolates the scope", ->
          expect(isolatedScope.$id).not.to.equal $scope.$id
          expect(isolatedScope.foo).not.to.equal "bar"

        it "takes the select2 options from the parent scope", ->
          options = isolatedScope.options

          expect(options).to.not.be.undefined
          expect(options).to.have.property "foo", "bar"

        it "takes a model from the parent scope", ->
          $scope.$apply -> $scope.search = organization: "the org name"

          expect(isolatedScope.ngModel).to.not.be.undefined
          expect(isolatedScope.ngModel).to.equal "the org name"

    describe "when `selectAjaxUrl` option is provided", ->
      beforeEach inject (pathWithContext) ->
        pathWithContext.returns("/context/api/orgs.json")

      prepareDirective """
        <ag-select2 select-ajax-url="/api/orgs.json" ng-model="search.org" />
      """

      directiveAjaxOptions = null
      beforeEach -> directiveAjaxOptions = isolatedScope.options.ajax

      it "defines ajax options for handling server side lookup", ->
        expect(directiveAjaxOptions).to.not.be.undefined

      it "uses `pathWithContext` to generate a valid path", inject (pathWithContext) ->
        expect(pathWithContext).to.have.been.calledWith("/api/orgs.json")

      it "assigns a valid server side lookup path", ->
        expect(directiveAjaxOptions.url).to.not.be.undefined
        expect(directiveAjaxOptions.url).to.equal "/context/api/orgs.json"

      it "assigns default `ajax.quietMillis` option", ->
        expect(directiveAjaxOptions.quietMillis).to.equal 500

    describe "when `selectAjaxUrl` options is provided along with `selectAjaxQuietMillis`", ->
      prepareDirective """
        <ag-select2 select-ajax-url="/api/orgs.json"
                    select-ajax-quiet-millis="666"
                    ng-model="search.org" />
      """

      it "ignores default value for `ajax.quietMillis` option", ->
        expect(isolatedScope.options.ajax.quietMillis).not.to.equal 500

      it "assigns default `ajax.quietMillis` option", ->
        expect(isolatedScope.options.ajax.quietMillis).to.equal 666

    describe "when `minimumInputLength` option is provided", ->
      beforeEach -> $scope.selectOptions = minimumInputLength: 123

      prepareDirective """
        <ag-select2 select-options="selectOptions" ng-model="search.org" />
      """

      it "assigns a valid option", ->
        expect(isolatedScope.options.minimumInputLength).to.equal 123

    describe "when `minimumInputLength` option is not provided", ->
      beforeEach -> $scope.selectOptions = {}

      prepareDirective """
        <ag-select2 select-options="selectOptions" ng-model="search.org" />
      """

      it "assigns the default value", ->
        expect(isolatedScope.options.minimumInputLength).to.equal 1

    describe "when `minimumInputLength` option in provided via the attribute", ->
      beforeEach -> $scope.selectOptions = minimumInputLength: 123

      prepareDirective """
        <ag-select2 select-options="selectOptions"
                    select-minimum-input-length="234"
                    ng-model="search.org" />
      """

      it "ignores value from the scope", ->
        expect(isolatedScope.options.minimumInputLength).not.to.equal 123

      it "assigns value from the attribute", ->
        expect(isolatedScope.options.minimumInputLength).to.equal 234

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
        expect(spy).to.have.been.called
        expect(spy).to.have.been.calledWith("open")
