describe "services", ->
  beforeEach module("angleGrinder.services")

  describe "random", ->
    describe "#range", ->
      it "is defined", inject (random) ->
        expect(random.range).toBeDefined()

      it "generates random number from the given range", inject (random) ->
        number = random.range(1, 2)
        expect(number >= 1).toBeTruthy()
        expect(number <= 2).toBeTruthy()

        for n in [0...10]
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

  describe "#sampleData", ->
    it "is defined", inject (sampleData) ->
      expect(sampleData).toBeDefined()

    it "generates a valid numver of rows", inject (sampleData) ->
      expect(sampleData(10).length).toEqual(10)
      expect(sampleData().length).toEqual(50)

    it "contains valid fields", inject (sampleData) ->
      firstRow = sampleData(1)[0]

      expect(firstRow.id).toBeDefined()
      expect(firstRow.id).toEqual(1)
      expect(firstRow.invdate).toBeDefined()
      expect(firstRow.name).toBeDefined()
      expect(firstRow.note).toBeDefined()
      expect(firstRow.tax).toBeDefined()
      expect(firstRow.total).toBeDefined()
