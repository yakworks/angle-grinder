describe "module: angleGrinder.gridz", ->

  describe "service: GridLinkServ", ->

    beforeEach module "angleGrinder.gridz", ($provide) ->
      $provide.value "pathWithContext", (path) -> "/ctx#{path}"
      return

    it "is defined", inject (GridLinkServ) ->
      expect(GridLinkServ).to.be.a "function"

    describe "static link", ->

      it "is valid", inject (GridLinkServ) ->
        linkEl = $(GridLinkServ("/foo#/123", "This is the link"))
        expect(linkEl.text()).to.eq "This is the link"
        expect(linkEl.attr("href")).to.eq "/ctx/foo#/123"

    describe "dynamic link", ->

      describe "when the id for the entity is given", ->

        it "is valid", inject (GridLinkServ) ->
          linkEl = $(GridLinkServ("/customer", "Test Customer", "id", { id: 123 }))
          expect(linkEl.text()).to.eq "Test Customer"
          expect(linkEl.attr("href")).to.eq "/ctx/customer#/123"

        it "is valid", inject (GridLinkServ) ->
          linkEl = $(GridLinkServ("/customer", "Test Customer", "customer.id", { customer: { id: 123 } }))
          expect(linkEl.text()).to.eq "Test Customer"
          expect(linkEl.attr("href")).to.eq "/ctx/customer#/123"

      describe "when the id for the entity is not given", ->

        it "does not generate a link", inject (GridLinkServ) ->
          linkEl = $(GridLinkServ("/customer", "Test Customer", "customer.id", { customer: undefined }))
          expect(linkEl.html()).to.be.undefined

    describe "when name is not given", ->

      it "does not generate a link", inject (GridLinkServ) ->
        for name in [undefined, null, ""]
          linkEl = $(GridLinkServ("/customer", name))
          expect(linkEl.html()).to.be.undefined
