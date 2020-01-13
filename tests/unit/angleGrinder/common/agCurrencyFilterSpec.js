import agCommon from '~/scripts/common'

describe("agCurrencyFilterSpec", function() {

  let provider = null;

  beforeEach(() => // load module and obtain reference to the filter provider
    angular.mock.module(agCommon, function(agCurrencyFilterProvider) {
      provider = agCurrencyFilterProvider;
    }
  ));

  return describe("filter: agCurrencyFilter", function() {

    let filter = null;

    beforeEach(inject($filter => filter = $filter("agCurrency"))
    );

    it("by default uses `$` as currency symbol", function() {
      const amount = 9.99;

      return expect(filter(amount)).to.eq("$9.99");
    });

    it("can format negative currencies", function() {
      const amount = -29.99;

      provider.setDefaultFormat("<%= amount %>");
      return expect(filter(amount)).to.eq("-29.99");
    });

    it("can use other currency symbols", function() {
      const amount = 99.8;

      expect(filter(amount, "$")).to.eq("$99.80");
      expect(filter(amount, "euro")).to.eq("euro99.80");
      return expect(filter(amount, "zł")).to.eq("zł99.80");
    });

    it("can format strings", () => expect(filter("9.95")).to.eq("$9.95"));

    it("does nothing for empty values", function() {
      expect(filter(0)).to.eq("$0.00");
      expect(filter(0/0)).to.deep.eq("");
      expect(filter("")).to.eq("");
      expect(filter(null)).to.eq("");
      expect(filter(undefined)).to.eq("");
      return expect(filter(false)).to.eq("");
    });

    return describe("filter config provider", function() {

      it("can set the default symbol", function() {
        const amount = 1.25;

        provider.setDefaultSymbol("zł");
        expect(filter(amount)).to.eq("zł1.25");

        provider.setDefaultSymbol("euro");
        return expect(filter(amount)).to.eq("euro1.25");
      });

      return it("can set the default format", function() {
        const amount = 2.56;

        provider.setDefaultSymbol("zł");
        provider.setDefaultFormat("<%= amount %> <%= symbol %>");
        expect(filter(amount)).to.eq("2.56 zł");

        provider.setDefaultFormat("foo <%= amount %> asdf <%= symbol %>");
        return expect(filter(amount)).to.eq("foo 2.56 asdf zł");
      });
    });
  });
});
