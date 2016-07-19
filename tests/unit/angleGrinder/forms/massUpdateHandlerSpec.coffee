describe "module: angleGrinder.forms", ->

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.decorator "alerts", ($delegate) ->
      $delegate.error = sinon.stub()
      $delegate
    return

  grid = null
  beforeEach ->
    grid =
      updateRow: sinon.stub()
      flashOnError: sinon.stub()

  describe "service: MassUpdateHandler", ->

    it "is defined", inject (MassUpdateHandler) ->
      expect(MassUpdateHandler).to.not.be.undefined
      expect(MassUpdateHandler).to.be.a "function"

    context "when the result contains rows data", ->

      it "updates the given rows", inject (MassUpdateHandler) ->
        MassUpdateHandler(grid, data: [{id: 1, foo: "bar"}, {id: 2, foo: "baz"}])

        args = grid.updateRow.getCall(0).args
        expect(args[0]).to.eq 1
        expect(args[1]).to.deep.eq id: 1, foo: "bar"

        args = grid.updateRow.getCall(1).args
        expect(args[0]).to.eq 2
        expect(args[1]).to.deep.eq id: 2, foo: "baz"

    context "when the result contains errors", ->

      it "flashes errored rows", inject (MassUpdateHandler, alerts) ->
        column1Msg = "error in column1"
        column2Msg = "error in column2"
        errorObj =
          code: 422
          message: "error message"
          messageCode: "default.not.saved.message"
          errors:
            className:
              column1: column1Msg
              column2: column2Msg
        errors = []
        errors.push errorObj
        MassUpdateHandler(grid, errors: errors)

        expect(alerts.error.called).to.be.true
        args = alerts.error.getCall(0).args
        expect(args[0]).to.eq ": #{column1Msg}\n#{column2Msg}"

    context "when errors variable contains something different from array", ->

      it "flashes errored rows", inject (MassUpdateHandler, alerts) ->
        # errors variable is a string
        errors = "string with error message"
        MassUpdateHandler(grid, errors: errors)

        expect(alerts.error.called).to.be.false

