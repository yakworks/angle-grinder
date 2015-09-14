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

      expect(filter(date, false, "MMM DD, YYYY")).to.eq "Jun 13, 2014"
      expect(filter(date, false, "M/DD/YY")).to.eq "6/13/14"
      expect(filter(date, false, "dddd, MMMM DD, YYYY")).to.eq "Friday, June 13, 2014"
      expect(filter(date, false, "MMMM DD, YYYY")).to.eq "June 13, 2014"

    it "can format dates form strings", ->
      expect(filter("2010-06-26T22:00:00Z")).to.eq "Jun 26, 2010"
      expect(filter("2010-07-26T22:00:00Z")).to.eq "Jul 26, 2010"
      expect(filter("#{new Date(2015, 5, 12, 22, 0)}")).to.eq "Jun 12, 2015"
      expect(filter("#{new Date(2015, 5, 12, 22, 0)}")).to.eq "Jun 12, 2015"

    it "ignore time zones if `useTimeZone` flag omitted", ->
      provider.setDefaultFormat("MMM DD, YYYY, HH:mm:ss")
      expect(filter("2010-06-26T22:00:00Z")).to.eq "Jun 26, 2010, 22:00:00"
      expect(filter("2010-06-26T22:00:00+00:00")).to.eq "Jun 26, 2010, 22:00:00"
      expect(filter("2010-06-26T22:00:00+03:00")).to.eq "Jun 26, 2010, 22:00:00"
      expect(filter("2010-06-26T22:00:00-08:00")).to.eq "Jun 26, 2010, 22:00:00"
      expect(filter(new Date(2015, 5, 12, 22, 0))).to.eq "Jun 12, 2015, 22:00:00"
      expect(filter("#{new Date(2015, 5, 12, 22, 0)}")).to.eq "Jun 12, 2015, 22:00:00"
      expect(filter("2015-05-22T23:00:00")).to.eq "May 22, 2015, 23:00:00"
      expect(filter("2015-05-22")).to.eq "May 22, 2015, 00:00:00"

    # Tests work only with TZ UTC+00:00, otherwise - fail.
    # In these tests checks how output date changes if incoming date has different time zone.
    # It can fail if environment specified not as `UTC`.
    it "use time zones if `useTimeZone` flag true", ->
      provider.setDefaultFormat("MMM DD, YYYY, HH:mm:ss")
      expect(filter("2010-06-26T22:00:00Z", true)).to.eq "Jun 26, 2010, 22:00:00"
      expect(filter("2010-06-26T22:00:00+00:00", true)).to.eq "Jun 26, 2010, 22:00:00"
      expect(filter("2010-06-26T22:00:00+03:00", true)).to.eq "Jun 26, 2010, 19:00:00"
      expect(filter("2010-06-26T01:00:00+03:00", true)).to.eq "Jun 25, 2010, 22:00:00"
      expect(filter("2010-06-26T22:00:00-08:00", true)).to.eq "Jun 27, 2010, 06:00:00"
      expect(filter(new Date(2015, 5, 12, 0, 0), true)).to.eq "Jun 12, 2015, 00:00:00"
      expect(filter("Fri Jun 12 2015 00:00:00 GMT+0300 (EEST)", true)).to.eq "Jun 11, 2015, 21:00:00"
      expect(filter("2015-05-22T23:00:00", true)).to.eq "May 22, 2015, 23:00:00"
      expect(filter("2015-05-22", true)).to.eq "May 22, 2015, 00:00:00"

    it "does nothing for empty values", ->
      expect(filter("")).to.eq ""
      expect(filter(null)).to.eq ""
      expect(filter(undefined)).to.eq ""
      expect(filter(false)).to.eq ""

    describe "filter config provider", ->

      it "can set the default date format", ->
        date = new Date(2014, 5, 14)

        provider.setDefaultFormat("dddd, MMMM DD, YYYY")
        expect(filter(date, true)).to.eq "Saturday, June 14, 2014"
