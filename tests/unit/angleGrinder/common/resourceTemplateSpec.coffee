describe "module: angleGrinder.common", ->

  beforeEach module "angleGrinder.common"

  describe "service: resourceTemplateServ", ->

    it "is defined", inject (resourceTemplateServ) ->
      expect(resourceTemplateServ).to.not.be.undefined
      expect(resourceTemplateServ).to.be.a "function"

    it "generates a helper method for buliding a template path", inject (resourceTemplateServ) ->
      customerTpl = (path) -> resourceTemplateServ("/customer", path)

      expect(customerTpl("foo.html")).to.equal "/customer/foo.html"
      expect(customerTpl("bar.html")).to.equal "/customer/bar.html"
