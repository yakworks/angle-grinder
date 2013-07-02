describe "services", ->
  beforeEach module("ui.bootstrap")
  beforeEach module("angleGrinder.services")

  describe "editDialog", ->
    it "is defined", inject (editDialog) ->
      expect(editDialog).toBeDefined()
