describe "module: angleGrinder.common", ->

  provider = null

  beforeEach ->

    # load module and obtain reference to the filter provider
    module "angleGrinder.common", (agCurrencyFilterProvider) ->
      provider = agCurrencyFilterProvider
      return

  describe "filter: agCurrencyFilter", ->

    filter = null

    beforeEach  inject ($filter) ->
      filter = $filter("agCurrency")

    it "by default uses `$` as currency symbol", ->
      amount = 9.99

      expect(filter(amount)).to.eq "$9.99"

    it "can format negative currencies", ->
      amount = -29.99

      provider.setDefaultFormat("<%= amount %>")
      expect(filter(amount)).to.eq "-29.99"

    it "can use other currency symbols", ->
      amount = 99.8

      expect(filter(amount, "$")).to.eq "$99.80"
      expect(filter(amount, "euro")).to.eq "euro99.80"
      expect(filter(amount, "zł")).to.eq "zł99.80"

    it "can format strings", ->
      expect(filter("9.95")).to.eq "$9.95"

    it "does nothing for empty values", ->
      expect(filter(0)).to.eq "$0.00"
      expect(filter(0/0)).to.deep.eq ""
      expect(filter("")).to.eq ""
      expect(filter(null)).to.eq ""
      expect(filter(undefined)).to.eq ""
      expect(filter(false)).to.eq ""

    describe "filter config provider", ->

      it "can set the default symbol", ->
        amount = 1.25

        provider.setDefaultSymbol("zł")
        expect(filter(amount)).to.eq "zł1.25"

        provider.setDefaultSymbol("euro")
        expect(filter(amount)).to.eq "euro1.25"

      it "can set the default format", ->
        amount = 2.56

        provider.setDefaultSymbol("zł")
        provider.setDefaultFormat("<%= amount %> <%= symbol %>")
        expect(filter(amount)).to.eq "2.56 zł"

        provider.setDefaultFormat("foo <%= amount %> asdf <%= symbol %>")
        expect(filter(amount)).to.eq "foo 2.56 asdf zł"
