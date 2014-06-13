describe "module: angleGrinder.common", ->

  provider = null

  beforeEach ->

    # load module and obtain reference to the filter provider
    module "angleGrinder.common", (agDateTimeFilterProvider) ->
      provider = agDateTimeFilterProvider
      return

  beforeEach module "angleGrinder.common"

  describe "filter: agDateTimeFilter", ->

    filter = null

    beforeEach  inject ($filter) ->
      filter = $filter("agDateTime")

    it "uses date time format", ->
      date = new Date(2014, 5, 12)
      expect(filter(date)).to.eq "12 Jun 2014 12:00 AM"

      date = new Date(2014, 5, 12, 5, 29)
      expect(filter(date)).to.eq "12 Jun 2014 05:29 AM"

    describe "filter config provider", ->

      it "can set the default date format", ->
        date = new Date(2014, 5, 12, 5, 29)

        provider.setDefaultFormat("dd MMM yyyy hh:mm")
        expect(filter(date)).to.eq "12 Jun 2014 05:29"

        provider.setDefaultFormat("hh:mm a")
        expect(filter(date)).to.eq "05:29 AM"
