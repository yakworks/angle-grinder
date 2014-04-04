describe "module: angleGrinder.gridz", ->

  describe "xls export", ->

    beforeEach module "ngSanitize"

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

      grid = null
      beforeEach -> grid = getGridId: -> "usersGrid"

      beforeEach module "tests/unit/fixtures/usersGrid.html"

      beforeEach module "ng", ($provide) ->
        $provide.decorator "$document", ($delegate, $templateCache) ->
          stub = sinon.stub($delegate, "find")

          # stub the grid html
          fixture = $templateCache.get("tests/unit/fixtures/usersGrid.html")
          stub.withArgs("div#gbox_usersGrid").returns(angular.element(fixture))

          $delegate

      it "gerarates valid xls file content", inject ($window, xlsData) ->
        data = xlsData(grid)

        expect(data).to.match /^\bdata:application\/vnd\.ms-excel;base64\b/
        decoded = $window.atob(data.match(/^data:application\/vnd\.ms-excel;base64,(.*)/)[1])
        tableEl = angular.element($(decoded)[3])

        expect(tableEl.find("thead th:nth-child(1)").text()).to.contain "id"
        expect(tableEl.find("thead th:nth-child(2)").text()).to.contain "Login"
        expect(tableEl.find("thead th:nth-child(3)").text()).to.contain "Email"
        expect(tableEl.find("thead th:nth-child(4)").text()).to.contain "Name"
        expect(tableEl.find("thead th:nth-child(5)").text()).to.contain "Birthday"
        expect(tableEl.find("thead th:nth-child(6)").text()).to.contain "Allowance"
        expect(tableEl.find("thead th:nth-child(7)").text()).to.contain "Paid"

        firstRow = tableEl.find("tbody tr:first")
        expect(firstRow.find("td:nth-child(1)").text()).to.contain "1"
        expect(firstRow.find("td:nth-child(2)").text()).to.contain "login-1"
        expect(firstRow.find("td:nth-child(3)").text()).to.contain "login-1@Bradtke.biz"
        expect(firstRow.find("td:nth-child(4)").text()).to.contain "Moroni"
        expect(firstRow.find("td:nth-child(5)").text()).to.contain "Jul 17"
        expect(firstRow.find("td:nth-child(5)").text()).to.contain "1973"
        expect(firstRow.find("td:nth-child(6)").text()).to.contain "7747"
        expect(firstRow.find("td:nth-child(7)").text()).to.contain "true"

      it "generates valid data uri", inject (xlsData) ->
        data = xlsData(grid)
        expect(data).to.match /^\bdata:application\/vnd\.ms-excel;base64\b/
