import docResMod from '#/docs/src/main'
import _ from 'lodash'

describe("module: exampleApp.grids", function() {

  beforeEach(angular.mock.module(docResMod));

  return describe("service: usersDialogGrid", function() {

    it("is defined", inject(usersDialogGrid => expect(usersDialogGrid).to.not.be.undefined)
    );

    it("has valid options", inject(function(usersDialogGrid) {
      const options = usersDialogGrid();

      expect(options).to.have.property("path", "/api/users");
      expect(options).to.have.property("rowNum", 10);
      expect(options).to.have.property("sortname", "id");
      return expect(options).to.have.property("colModel");
    })
    );

    it("can be overridden", inject(function(usersDialogGrid) {
      const options = usersDialogGrid({sortname: "name"});
      return expect(options).to.have.property("sortname", "name");
    })
    );

    it("handles `loadError` event", inject(function($log, usersDialogGrid) {
      const {
        loadError
      } = usersDialogGrid();
      expect(loadError).to.not.be.undefined;

      sinon.spy($log, "error");
      loadError("foo");
      return expect($log.error).to.have.been.called;
    })
    );

    return describe("colModel", function() {

      it("has valid number of columns", inject(function(usersDialogGrid) {
        const {
          colModel
        } = usersDialogGrid();
        return expect(colModel).to.have.length(7);
      })
      );

      return it("has valid `birthday` date formatter", inject(function(usersDialogGrid) {
        const {
          colModel
        } = usersDialogGrid();
        const birthdayCol = _.find(colModel, {name: "birthday"});

        expect(birthdayCol).to.not.be.undefined;
        return expect(birthdayCol.formatter).to.eq("date");
      })
      );
    });
  });
});
