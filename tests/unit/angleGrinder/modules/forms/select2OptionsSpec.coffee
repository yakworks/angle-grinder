describe "module: angleGrinder.forms, service: select2Options", ->

  beforeEach module "angleGrinder.forms"

  it "is defined", inject (select2Options) ->
    expect(select2Options).to.not.be.undefined

  options = null
  beforeEach inject (select2Options) -> options = select2Options()

  it "builds default options", ->
    expect(options).to.have.deep.property "width", "element"
    expect(options).to.have.deep.property "initSelection", true
    expect(options).to.have.deep.property "ajax.dataType", "json"

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

      it "generates params for the search box and pager", ->
        data = ajax.data("foo", 2)

        expect(data.q).to.eq "foo"
        expect(data.max).to.eq 20
        expect(data.page).to.eq 2
        expect(data.sort).to.eq "id"
        expect(data.order).to.eq "asc"

      describe "when `dataOptions` is given", ->

        it "decorates `ajax.data.sort`", inject (select2Options) ->
          data = select2Options(null, { sort: "name", foo: "bar" }).ajax.data("foo", 2)

          expect(data).to.have.property "sort", "name"
          expect(data).to.have.property "foo", "bar"

    describe "#results", ->

      it "formats the results", ->
        results = options.ajax.results
        expect(results).to.be.a "function"

        opts = results({ rows: [], total: 2 }, 1)
        expect(opts.results).to.deep.eq []
        expect(opts.more).to.be.true

        opts = results({ rows: [], total: 2 }, 2)
        expect(opts.more).to.be.false
