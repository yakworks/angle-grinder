describe "services", ->
  beforeEach module("ui.bootstrap")
  beforeEach module("angleGrinder.services")

  describe "editDialog", ->
    it "is defined", inject (editDialog) ->
      expect(editDialog).toBeDefined()

    describe "#open", ->
      beforeEach inject ($httpBackend) ->
        $httpBackend.whenGET("/views/some_template.html").respond({})

      it "opens the create dialog", inject (editDialog) ->
        item = name: "Foo"
        editDialog.open("/views/some_template.html", item)
