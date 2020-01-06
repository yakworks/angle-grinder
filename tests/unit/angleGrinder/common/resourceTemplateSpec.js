/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.common", function() {

  beforeEach(module("angleGrinder.common"));

  return describe("service: ResourceTemplateServ", function() {

    it("is defined", inject(function(ResourceTemplateServ) {
      expect(ResourceTemplateServ).to.not.be.undefined;
      return expect(ResourceTemplateServ).to.be.a("function");
    })
    );

    return it("generates a helper method for buliding a template path", inject(function(ResourceTemplateServ) {
      const customerTpl = path => ResourceTemplateServ("/customer", path);

      expect(customerTpl("foo.html")).to.equal("/customer/foo.html");
      return expect(customerTpl("bar.html")).to.equal("/customer/bar.html");
    })
    );
  });
});
