describe "module: angleGrinder.forms", ->

  beforeEach module "angleGrinder.forms"

  grid = null
  beforeEach ->
    grid =
      updateRow: sinon.stub()
      flashOnError: sinon.stub()

  describe "service: massUpdateHandler", ->

    it "is defined", inject (massUpdateHandler) ->
      expect(massUpdateHandler).to.not.be.undefined
      expect(massUpdateHandler).to.be.a "function"

    context "when the result contains rows data", ->

      it "updates the given rows", inject (massUpdateHandler) ->
        massUpdateHandler(grid, data: [{id: 1, foo: "bar"}, {id: 2, foo: "baz"}])

        args = grid.updateRow.getCall(0).args
        expect(args[0]).to.eq 1
        expect(args[1]).to.deep.eq id: 1, foo: "bar"

        args = grid.updateRow.getCall(1).args
        expect(args[0]).to.eq 2
        expect(args[1]).to.deep.eq id: 2, foo: "baz"

    context "when the result contains errors", ->

      it "flashes errored rows", inject (massUpdateHandler) ->
        massUpdateHandler(grid, errors: { "3": {}, "4": {} })

        args = grid.flashOnError.getCall(0).args
        expect(args[0]).to.eq "3"

        args = grid.flashOnError.getCall(1).args
        expect(args[0]).to.eq "4"
