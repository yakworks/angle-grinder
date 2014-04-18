describe "module: angleGrinder.gridz", ->

  describe "xls export", ->

    beforeEach module "angleGrinder.gridz", ($provide) ->
      $provide.decorator "xlsData", ($delegate) ->
        sinon.spy($delegate)
        $delegate

    describe "service: xlsTemplate", ->

      it "generates valid xml with the worksheet", inject ($window, xlsTemplate) ->
        data = xlsTemplate(table: "the table")
        expect(data).to.be.a "string"

        xml = $window.atob(data)
        expect(xml).to.be.a "string"

    describe "service: xlsData", ->

      before ->
        @gridId = "usersGrid"
        @selectedRows = ["4", "5", "6"]

      beforeEach module "tests/unit/fixtures/usersGrid.html"

      beforeEach module "ng", ($provide) ->
        $provide.decorator "$document", ($delegate, $templateCache) ->
          stub = sinon.stub($delegate, "find")

          # stub the grid html
          fixture = $templateCache.get("tests/unit/fixtures/usersGrid.html")
          stub.withArgs("div#gbox_usersGrid").returns(angular.element(fixture))

          $delegate

      decodeXls = (data) ->
        el = null
        inject ($window) ->
          decoded = $window.atob(data.match(/^data:application\/vnd\.ms-excel;base64,(.*)/)[1])
          el = angular.element($(decoded)[3])
        el

      it "generats valid xls file heading", inject (xlsData) ->
        el = decodeXls(xlsData(@gridId, @selectedRows))

        expect(el.find("thead th:nth-child(1)").text()).to.contain "id"
        expect(el.find("thead th:nth-child(2)").text()).to.contain "Login"
        expect(el.find("thead th:nth-child(3)").text()).to.contain "Email"
        expect(el.find("thead th:nth-child(4)").text()).to.contain "Name"
        expect(el.find("thead th:nth-child(5)").text()).to.contain "Birthday"
        expect(el.find("thead th:nth-child(6)").text()).to.contain "Allowance"
        expect(el.find("thead th:nth-child(7)").text()).to.contain "Paid"

      it "generats valid xls file contend", inject (xlsData) ->
        el = decodeXls(xlsData(@gridId, @selectedRows))

        rowEl = el.find("tbody tr:first")
        expect(rowEl.find("td:nth-child(1)").text()).to.contain "4"
        expect(rowEl.find("td:nth-child(2)").text()).to.contain "login-4"
        expect(rowEl.find("td:nth-child(3)").text()).to.contain "login-4@Mayer.name"
        expect(rowEl.find("td:nth-child(4)").text()).to.contain "Ether"
        expect(rowEl.find("td:nth-child(5)").text()).to.contain "Oct 30"
        expect(rowEl.find("td:nth-child(5)").text()).to.contain "2010"
        expect(rowEl.find("td:nth-child(6)").text()).to.contain "42"
        expect(rowEl.find("td:nth-child(7)").text()).to.contain "true"

      it "generates valid data uri", inject (xlsData) ->
        data = xlsData(@gridId, @selectedRows)
        expect(data).to.match /^\bdata:application\/vnd\.ms-excel;base64\b/

      context "when some rows are selected", ->
        before -> @selectedRows = ["5", "2", "4"]

        it "exports only selected rows", inject (xlsData) ->
          el = decodeXls(xlsData(@gridId, @selectedRows))
          expect(el.find("tbody tr")).to.have.length(3)

          rowEl = el.find("tbody tr:first")
          expect(rowEl.find("td:nth-child(1)").text()).to.contain "2"

      context "when none is selected", ->
        before -> @selectedRows = []

        it "exports all rows", inject (xlsData) ->
          el = decodeXls(xlsData(@gridId, @selectedRows))
          expect(el.find("tbody tr")).to.have.length(10)

          rowEl = el.find("tbody tr:first")
          expect(rowEl.find("td:nth-child(1)").text()).to.contain "1"

  describe "directive: agGridXlsExport", ->

    # mock `$window.location.href` in order to avoid
    # "Some of your tests did a full page reload!"
    beforeEach module "ng", ($provide) ->
      $provide.value "$window", location: {}
      return

    beforeEach module "angleGrinder.gridz"

    element = null

    beforeEach inject ($injector, $rootScope) ->
      $scope = $rootScope.$new()

      # stub the grid instance
      $scope.grid = users: getXlsDataUri: -> "foo"

      {element, $scope} = compileTemplate """
        <a href="" ag-grid-xls-export="grid.users">
        <i class="icon-download-alt"></i> Export to XLS
      </a>
      """, $injector, $scope

    describe "on click", ->

      it "does the magic", inject ($window) ->
        # When
        element.click()

        # Then
        expect($window.location.href).to.eq "foo"
