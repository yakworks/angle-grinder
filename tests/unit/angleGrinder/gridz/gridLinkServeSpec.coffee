describe "module: angleGrinder.gridz", ->

  describe "service: gridLinkServ", ->

    beforeEach module "angleGrinder.gridz", ($provide) ->
      $provide.value "pathWithContext", (path) -> "/ctx#{path}"
      return

    it "is defined", inject (gridLinkServ) ->
      expect(gridLinkServ).to.be.a "function"

    describe "static link", ->

      it "is valid", inject (gridLinkServ) ->
        linkEl = $(gridLinkServ("/foo#/123", "This is the link"))
        expect(linkEl.text()).to.eq "This is the link"
        expect(linkEl.attr("href")).to.eq "/ctx/foo#/123"

    describe "dynamic link", ->

      describe "when the id for the entity is given", ->

        it "is valid", inject (gridLinkServ) ->
          linkEl = $(gridLinkServ("/customer", "Test Customer", "id", { id: 123 }))
          expect(linkEl.text()).to.eq "Test Customer"
          expect(linkEl.attr("href")).to.eq "/ctx/customer#/123"

        it "is valid", inject (gridLinkServ) ->
          linkEl = $(gridLinkServ("/customer", "Test Customer", "customer.id", { customer: { id: 123 } }))
          expect(linkEl.text()).to.eq "Test Customer"
          expect(linkEl.attr("href")).to.eq "/ctx/customer#/123"

      describe "when the id for the entity is not given", ->

        it "does not generate a link", inject (gridLinkServ) ->
          linkEl = $(gridLinkServ("/customer", "Test Customer", "customer.id", { customer: undefined }))
          expect(linkEl.html()).to.be.undefined

    describe "when name is not given", ->

      it "does not generate a link", inject (gridLinkServ) ->
        for name in [undefined, null, ""]
          linkEl = $(gridLinkServ("/customer", name))
          expect(linkEl.html()).to.be.undefined
