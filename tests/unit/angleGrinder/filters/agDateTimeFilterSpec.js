import agCommon from 'angle-grinder/src/ng/common'

describe("agDateTimeFilter ", function() {

  let provider = null;

  beforeEach(() => // load module and obtain reference to the filter provider
    angular.mock.module(agCommon, function(agDateTimeFilterProvider) {
      provider = agDateTimeFilterProvider;
    }
  ));

  return describe("filter: agDateTimeFilter", function() {

    let filter = null;

    beforeEach(inject($filter => filter = $filter("agDateTime"))
    );

    it("uses date time format", function() {
      let date = new Date(2014, 5, 12, 12, 0);
      expect(filter(date)).to.eq("12 Jun 2014 12:00 PM");

      date = new Date(2014, 5, 12, 5, 29);
      return expect(filter(date)).to.eq("12 Jun 2014 05:29 AM");
    });

    return describe("filter config provider", () => it("can set the default date format", function() {
      const date = new Date(2014, 5, 12, 5, 29);

      provider.setDefaultFormat("DD MMM YYYY HH:mm");
      expect(filter(date)).to.eq("12 Jun 2014 05:29");

      provider.setDefaultFormat("HH:mm A");
      return expect(filter(date)).to.eq("05:29 AM");
    }));
  });
});
