import select2Mod from '~/scripts/select2'

describe("elect2OptionsSpec", function() {

  beforeEach(angular.mock.module(select2Mod));

  it("is defined", inject(Select2Options => expect(Select2Options).to.not.be.undefined)
  );

  let options = null;
  beforeEach(inject(Select2Options => options = Select2Options()));


  it("builds default options", function() {
    expect(options).to.have.deep.property("width", "element");
    expect(options).to.have.deep.property("initSelection", angular.noop);
    //console.log("************** options", options)
    return expect(options.ajax.dataType).to.eq("json");
  });

  it("can override default options", inject(function(Select2Options) {
    expect(Select2Options({width: "100px"})).to.have.property("width", "100px");
    expect(Select2Options()).to.have.property("width", "element");

    expect(Select2Options({initSelection: false})).to.have.property("initSelection", false);
    return expect(Select2Options()).to.have.property("initSelection", angular.noop);
  })
  );

  describe("#formatResult", () => it("returns name", () => expect(options.formatResult({name: "foo"})).to.eq("foo")));

  describe("#formatSelection", () => it("returns name", () => expect(options.formatSelection({name: "foo"})).to.eq("foo")));

  return describe("ajax", function() {

    let ajax = null;
    beforeEach(() => ajax = options.ajax);

    it("has dummy url", () => expect(ajax.url).to.eq(angular.noop));

    describe("#data", function() {

      it("generates default params for the search box and pager", function() {
        const data = ajax.data("foo");

        expect(data.q).to.eq("foo");
        expect(data.max).to.eq(20);
        expect(data.page).to.eq(1);
        expect(data.sort).to.eq("id");
        return expect(data.order).to.eq("asc");
      });

      it("can switch the `page`" , function() {
        const dataForPage = n => ajax.data("foo", n);

        expect(dataForPage(1).page).to.eq(1);
        expect(dataForPage(2).page).to.eq(2);
        expect(dataForPage(3).page).to.eq(3);
        return expect(dataForPage(1).page).to.eq(1);
      });

      return describe("when `dataOptions` is given", () => it("overrides default options for `ajax.data`", inject(function(Select2Options) {
        const dataOptions = { sort: "name", order: "desc", foo: "bar" };
        const data = Select2Options({}, dataOptions).ajax.data("foo", 2);

        expect(data).to.have.property("sort", "name");
        expect(data).to.have.property("order", "desc");
        expect(data).to.have.property("foo", "bar");
        return expect(data).to.have.property("page", 2);
      })
      ));
    });

    return describe("#results", () => it("formats the results", function() {
      const {
        results
      } = options.ajax;
      expect(results).to.be.a("function");

      let opts = results({ rows: [], total: 2 }, 1);
      expect(opts.results).to.deep.eq([]);
      expect(opts.more).to.be.true;

      opts = results({ rows: [], total: 2 }, 2);
      return expect(opts.more).to.be.false;
    }));
  });
});
