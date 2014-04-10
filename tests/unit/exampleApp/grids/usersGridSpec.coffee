describe "module: exampleApp.grids", ->

  beforeEach module "exampleApp.grids", ($provide) ->
    # mock date filter
    $provide.service "dateFilter", -> (val) -> "the date"
    return

  describe "service: usersGrid", ->

    it "is defined", inject (usersGrid) ->
      expect(usersGrid).to.not.be.undefined

    it "has valid options", inject (usersGrid) ->
      options = usersGrid()

      expect(options).to.have.property "path", "/api/users"
      expect(options).to.have.property "rowNum", 10
      expect(options).to.have.property "sortname", "id"
      expect(options).to.have.property "multiselect", true
      expect(options).to.have.property "colModel"

    it "can be overridden", inject (usersGrid) ->
      options = usersGrid(sortname: "name")
      expect(options).to.have.property "sortname", "name"

    describe "colModel", ->

      it "has valid `showActionLink` formatter", inject (usersGrid) ->
        colModel = usersGrid().colModel
        idCol = _.findWhere(colModel, name: "id")

        expect(idCol).to.not.be.undefined

        $link = $(idCol.formatter("Foo", {}, id: 123))
        expect($link.text()).to.eq "Foo"
        expect($link.attr("href")).to.eq "#/examples/users/123"

      it "has valid `birthday` date formatter", inject (usersGrid) ->
        colModel = usersGrid().colModel
        birthdayCol = _.findWhere(colModel, name: "birthday")

        expect(birthdayCol).to.not.be.undefined
        expect(birthdayCol.formatter(1392127095158)).to.eq "the date"
