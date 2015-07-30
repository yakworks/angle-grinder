describe "module: angleGrinder.forms, service: select2Options", ->

  beforeEach module "angleGrinder.forms"

  it "is defined", inject (select2Options) ->
    expect(select2Options).to.not.be.undefined

  options = null
  beforeEach inject (select2Options) -> options = select2Options()

  it "builds default options", ->
    expect(options).to.have.deep.property "width", "element"
    expect(options).to.have.deep.property "initSelection", angular.noop
    expect(options).to.have.deep.property "ajax.dataType", "json"

  it "can override default options", inject (select2Options) ->
    expect(select2Options(width: "100px")).to.have.property "width", "100px"
    expect(select2Options()).to.have.property "width", "element"

    expect(select2Options(initSelection: false)).to.have.property "initSelection", false
    expect(select2Options()).to.have.property "initSelection", angular.noop

  describe "#formatResult", ->

    it "returns name", ->
      expect(options.formatResult(name: "foo")).to.eq "foo"

  describe "#formatSelection", ->

    it "returns name", ->
      expect(options.formatSelection(name: "foo")).to.eq "foo"

  describe "ajax", ->

    ajax = null
    beforeEach -> ajax = options.ajax

    it "has dummy url", ->
      expect(ajax.url).to.eq angular.noop

    describe "#data", ->

      it "generates default params for the search box and pager", ->
        data = ajax.data("foo")

        expect(data.q).to.eq "foo"
        expect(data.max).to.eq 20
        expect(data.page).to.eq 1
        expect(data.sort).to.eq "id"
        expect(data.order).to.eq "asc"

      it "can switch the `page`" , ->
        dataForPage = (n) -> ajax.data("foo", n)

        expect(dataForPage(1).page).to.eq 1
        expect(dataForPage(2).page).to.eq 2
        expect(dataForPage(3).page).to.eq 3
        expect(dataForPage(1).page).to.eq 1

      describe "when `dataOptions` is given", ->

        it "overrides default options for `ajax.data`", inject (select2Options) ->
          dataOptions = { sort: "name", order: "desc", foo: "bar" }
          data = select2Options({}, dataOptions).ajax.data("foo", 2)

          expect(data).to.have.property "sort", "name"
          expect(data).to.have.property "order", "desc"
          expect(data).to.have.property "foo", "bar"
          expect(data).to.have.property "page", 2

    describe "#results", ->

      it "formats the results", ->
        results = options.ajax.results
        expect(results).to.be.a "function"

        opts = results({ rows: [], total: 2 }, 1)
        expect(opts.results).to.deep.eq []
        expect(opts.more).to.be.true

        opts = results({ rows: [], total: 2 }, 2)
        expect(opts.more).to.be.false
