describe "module: exampleApp", ->
  beforeEach module "exampleApp"

  describe "service: random", ->
    describe "#range", ->
      it "is defined", inject (random) ->
        expect(random.range).to.not.be.undefined

      it "generates random number from the given range", inject (random) ->
        number = random.range(1, 2)
        expect(number >= 1).to.be.true
        expect(number <= 2).to.be.true

        for _ in [0...10]
          number = random.range(10, 100)
          expect(number >= 10).to.be.true
          expect(number <= 100).to.be.true

    describe "#date", ->
      it "is defined", inject (random) ->
        expect(random.date).to.not.be.undefined

      it "generates a ramdom date", inject (random) ->
        sinon.stub(random, "range").returns(1372677018884)

        minDate = new Date(2001, 1, 1)
        expect(random.date(minDate)).to.equal("2013-07-01")
        expect(random.range).to.have.been.called

  describe "service: sampleData", ->
    it "is defined", inject (sampleData) ->
      expect(sampleData).to.not.be.undefined
      expect(sampleData.generate).to.not.be.undefined

    describe "#generate", ->

      it "generates a valid numver of rows", inject (sampleData) ->
        expect(sampleData.generate(10).length).to.equal(10)
        expect(sampleData.generate().length).to.equal(50)

      it "contains valid fields", inject (sampleData) ->
        firstRow = sampleData.generate(1)[0]

        expect(firstRow.id).to.not.be.undefined
        expect(firstRow.id).to.equal(1)
        expect(firstRow.invoiceDate).to.not.be.undefined
        expect(firstRow.name).to.not.be.undefined
        expect(firstRow.note).to.not.be.undefined
        expect(firstRow.tax).to.not.be.undefined
        expect(firstRow.total).to.not.be.undefined
