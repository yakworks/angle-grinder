describe "module: angleGrinder.common", ->

  beforeEach module "angleGrinder.common"

  describe "service: ResourceTemplateServ", ->

    it "is defined", inject (ResourceTemplateServ) ->
      expect(ResourceTemplateServ).to.not.be.undefined
      expect(ResourceTemplateServ).to.be.a "function"

    it "generates a helper method for buliding a template path", inject (ResourceTemplateServ) ->
      customerTpl = (path) -> ResourceTemplateServ("/customer", path)

      expect(customerTpl("foo.html")).to.equal "/customer/foo.html"
      expect(customerTpl("bar.html")).to.equal "/customer/bar.html"
