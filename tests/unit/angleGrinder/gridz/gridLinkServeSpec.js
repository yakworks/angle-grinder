/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.gridz", () => describe("service: GridLinkServ", function() {

  beforeEach(module("angleGrinder.gridz", function($provide) {
    $provide.value("pathWithContext", path => `/ctx${path}`);
  })
  );

  it("is defined", inject(GridLinkServ => expect(GridLinkServ).to.be.a("function"))
  );

  describe("static link", () => it("is valid", inject(function(GridLinkServ) {
    const linkEl = $(GridLinkServ("/foo#/123", "This is the link"));
    expect(linkEl.text()).to.eq("This is the link");
    return expect(linkEl.attr("href")).to.eq("/ctx/foo#/123");
  })
  ));

  describe("dynamic link", function() {

    describe("when the id for the entity is given", function() {

      it("is valid", inject(function(GridLinkServ) {
        const linkEl = $(GridLinkServ("/customer", "Test Customer", "id", { id: 123 }));
        expect(linkEl.text()).to.eq("Test Customer");
        return expect(linkEl.attr("href")).to.eq("/ctx/customer#/123");
      })
      );

      return it("is valid", inject(function(GridLinkServ) {
        const linkEl = $(GridLinkServ("/customer", "Test Customer", "customer.id", { customer: { id: 123 } }));
        expect(linkEl.text()).to.eq("Test Customer");
        return expect(linkEl.attr("href")).to.eq("/ctx/customer#/123");
      })
      );
    });

    return describe("when the id for the entity is not given", () => it("does not generate a link", inject(function(GridLinkServ) {
      const linkEl = $(GridLinkServ("/customer", "Test Customer", "customer.id", { customer: undefined }));
      return expect(linkEl.html()).to.be.undefined;
    })
    ));
  });

  return describe("when name is not given", () => it("does not generate a link", inject(GridLinkServ => (() => {
    const result = [];
    for (let name of [undefined, null, ""]) {
      const linkEl = $(GridLinkServ("/customer", name));
      result.push(expect(linkEl.html()).to.be.undefined);
    }
    return result;
  })())
  ));
}));
