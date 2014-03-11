describe "module: angleGrinder.gridz", ->

  describe.only "xls export", ->

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

      it "generates xls data uri", inject (xlsData) ->
        grid = getGridId: -> 123
        data = xlsData(grid)
        expect(data).to.match /^\bdata:application\/vnd\.ms-excel;base64\b/
