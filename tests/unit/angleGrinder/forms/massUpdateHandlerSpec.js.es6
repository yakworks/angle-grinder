/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.forms", function() {

  beforeEach(module("angleGrinder.forms", function($provide) {
    $provide.decorator("alerts", function($delegate) {
      $delegate.error = sinon.stub();
      return $delegate;
    });
  })
  );

  let grid = null;
  beforeEach(() => grid = {
    updateRow: sinon.stub(),
    flashOnError: sinon.stub()
  });

  return describe("service: MassUpdateHandler", function() {

    it("is defined", inject(function(MassUpdateHandler) {
      expect(MassUpdateHandler).to.not.be.undefined;
      return expect(MassUpdateHandler).to.be.a("function");
    })
    );

    context("when the result contains rows data", () => it("updates the given rows", inject(function(MassUpdateHandler) {
      MassUpdateHandler(grid, {data: [{id: 1, foo: "bar"}, {id: 2, foo: "baz"}]});

      let {
        args
      } = grid.updateRow.getCall(0);
      expect(args[0]).to.eq(1);
      expect(args[1]).to.deep.eq({id: 1, foo: "bar"});

      ({
        args
      } = grid.updateRow.getCall(1));
      expect(args[0]).to.eq(2);
      return expect(args[1]).to.deep.eq({id: 2, foo: "baz"});
    })
    ));

    context("when the result contains errors", () => it("flashes errored rows", inject(function(MassUpdateHandler, alerts) {
      const column1Msg = "error in column1";
      const column2Msg = "error in column2";
      const errorObj = {
        code: 422,
        message: "error message",
        messageCode: "default.not.saved.message",
        errors: {
          className: {
            column1: column1Msg,
            column2: column2Msg
          }
        }
      };
      const errors = [];
      errors.push(errorObj);
      MassUpdateHandler(grid, {errors});

      expect(alerts.error.called).to.be.true;
      const {
        args
      } = alerts.error.getCall(0);
      return expect(args[0]).to.eq(`: ${column1Msg}\n${column2Msg}`);
    })
    ));

    return context("when errors variable contains something different from array", () => it("flashes errored rows", inject(function(MassUpdateHandler, alerts) {
      // errors variable is a string
      const errors = "string with error message";
      MassUpdateHandler(grid, {errors});

      return expect(alerts.error.called).to.be.false;
    })
    ));
  });
});

