describe "module: exampleApp.grids", ->

  beforeEach module "exampleApp.grids"

  describe "service: exampleGrid", ->

    it "is defined", inject (exampleGrid) ->
      expect(exampleGrid).to.not.be.undefined

    it "has valid options", inject (exampleGrid) ->
      options = exampleGrid()

      expect(options).to.have.property "datatype", "local"
      expect(options).to.have.property "sortname", "id"
      expect(options).to.have.property "colModel"

    it "can be overridden", inject (exampleGrid) ->
      options = exampleGrid(sortname: "name")
      expect(options).to.have.property "sortname", "name"

    describe "colModel", ->

      it "has valid number of columns", inject (exampleGrid) ->
        colModel = exampleGrid().colModel
        expect(colModel).to.have.length 5
