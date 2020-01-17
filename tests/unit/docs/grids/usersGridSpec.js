import docResMod from '#/docs/src/main'
import _ from 'lodash'

describe("module: exampleApp.grids", function() {

  beforeEach(angular.mock.module(docResMod, function($provide) {
    // mock date filter
    $provide.service("dateFilter", () => val => "the date");
  })
  );

  return describe("service: usersGrid", function() {

    it("is defined", inject(usersGrid => expect(usersGrid).to.not.be.undefined)
    );

    it("has valid options", inject(function(usersGrid) {
      const options = usersGrid();

      expect(options).to.have.property("path", "/api/users");
      expect(options).to.have.property("rowNum", 10);
      expect(options).to.have.property("sortname", "id");
      expect(options).to.have.property("multiselect", true);
      return expect(options).to.have.property("colModel");
    })
    );

    it("can be overridden", inject(function(usersGrid) {
      const options = usersGrid({sortname: "name"});
      return expect(options).to.have.property("sortname", "name");
    })
    );

    return describe("colModel", function() {

      it("has valid `showActionLink` formatter", inject(function(usersGrid) {
        const {
          colModel
        } = usersGrid();
        const idCol = _.find(colModel, {name: "id"});

        expect(idCol).to.not.be.undefined;

        const linkEl = $(idCol.formatter("Foo", {}, {id: 123}));
        expect(linkEl.text()).to.eq("Foo");
        return expect(linkEl.attr("href")).to.eq("#/examples/users/123");
      })
      );

      return it("has valid `birthday` date formatter", inject(function(usersGrid) {
        const {
          colModel
        } = usersGrid();
        const birthdayCol = _.find(colModel, {name: "birthday"});

        expect(birthdayCol).to.not.be.undefined;
        return expect(birthdayCol.formatter).to.eq("date");
      })
      );
    });
  });
});
