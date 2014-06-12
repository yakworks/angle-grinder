describe "module: angleGrinder.common", ->

  provider = null

  beforeEach ->

    # load module and obtain reference to the filter provider
    module "angleGrinder.common", (agDateFilterProvider) ->
      provider = agDateFilterProvider
      return

  describe "filter: agDateFilter", ->

    filter = null

    beforeEach  inject ($filter) ->
      filter = $filter("agDate")

    it "by default uses `short` date format", ->
      date = new Date(2014, 5, 12)

      expect(filter(date)).to.eq "Jun 12, 2014"

    it "can access other date formats", ->
      date = new Date(2014, 5, 13)

      expect(filter(date, "medium")).to.eq "Jun 13, 2014 12:00:00 AM"
      expect(filter(date, "short")).to.eq "6/13/14 12:00 AM"
      expect(filter(date, "fullDate")).to.eq "Friday, June 13, 2014"
      expect(filter(date, "longDate")).to.eq "June 13, 2014"
      expect(filter(date, "mediumDate")).to.eq "Jun 13, 2014"
      expect(filter(date, "shortDate")).to.eq "6/13/14"
      expect(filter(date, "mediumTime")).to.eq "12:00:00 AM"
      expect(filter(date, "shortTime")).to.eq "12:00 AM"

    it "can format dates form strings", ->
      expect(filter("2010-06-26T22:00:00Z")).to.eq "Jun 27, 2010"
      expect(filter("2010-07-26T22:00:00Z")).to.eq "Jul 27, 2010"

    it "does nothing for empty values", ->
      expect(filter("")).to.eq ""
      expect(filter(null)).to.eq ""
      expect(filter(undefined)).to.eq ""
      expect(filter(false)).to.eq ""

    describe "filter config provider", ->

      it "can set the default date format", ->
        date = new Date(2014, 5, 14)

        provider.setDefaultFormat("shortTime")
        expect(filter(date)).to.eq "12:00 AM"

        provider.setDefaultFormat("fullDate")
        expect(filter(date)).to.eq "Saturday, June 14, 2014"
