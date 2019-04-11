describe "module: angleGrinder.gridz", ->

  beforeEach module "angleGrinder.gridz"

  describe "value: applyFormaters", ->

    it "flattens an object", inject (ApplyFormattersServ) ->
      colModel=[
        id: 1
        name: "test"
        formatter: "testFormater"
      ,
        id: 2
        name: "test2"
        formatter: "test2Formater"
      ]
      formatters =
        testFormater: (cellVal, options, rowData) ->
          "First formated value"
        test2Formater: (cellVal, options, rowData) ->
          "Second formated value"

      ApplyFormattersServ(colModel, formatters)

      expect(colModel[0].formatter).to.be.a "function"
      expect(colModel[0].formatter()).to.eq "First formated value"
      expect(colModel[1].formatter).to.be.a "function"
      expect(colModel[1].formatter()).to.eq "Second formated value"
