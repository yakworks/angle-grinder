describe "module: angleGrinder.dataGenerator", ->
  beforeEach module("angleGrinder.dataGenerator")

  describe "service: random", ->
    describe "#range", ->
      it "is defined", inject (random) ->
        expect(random.range).toBeDefined()

      it "generates random number from the given range", inject (random) ->
        number = random.range(1, 2)
        expect(number >= 1).toBeTruthy()
        expect(number <= 2).toBeTruthy()

        for _ in [0...10]
          number = random.range(10, 100)
          expect(number >= 10).toBeTruthy()
          expect(number <= 100).toBeTruthy()

    describe "#date", ->
      it "is defined", inject (random) ->
        expect(random.date).toBeDefined()

      it "generates a ramdom date", inject (random) ->
        spyOn(random, "range").andReturn(1372677018884)

        minDate = new Date(2001, 1, 1)
        expect(random.date(minDate)).toEqual("2013-07-01")
        expect(random.range).toHaveBeenCalled()

  describe "service: sampleData", ->
    it "is defined", inject (sampleData) ->
      expect(sampleData).toBeDefined()
      expect(sampleData.generate).toBeDefined()

    describe "#generate", ->

      it "generates a valid numver of rows", inject (sampleData) ->
        expect(sampleData.generate(10).length).toEqual(10)
        expect(sampleData.generate().length).toEqual(50)

      it "contains valid fields", inject (sampleData) ->
        firstRow = sampleData.generate(1)[0]

        expect(firstRow.id).toBeDefined()
        expect(firstRow.id).toEqual(1)
        expect(firstRow.invoiceDate).toBeDefined()
        expect(firstRow.name).toBeDefined()
        expect(firstRow.note).toBeDefined()
        expect(firstRow.tax).toBeDefined()
        expect(firstRow.total).toBeDefined()
