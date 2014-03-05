describe "module: exampleApp.grids", ->

  beforeEach module "exampleApp.grids", ($provide) ->
    # mock date filter
    $provide.service "dateFilter", -> (val) -> "the date"
    return

  describe "service: usersDialogGrid", ->

    it "is defined", inject (usersDialogGrid) ->
      expect(usersDialogGrid).to.not.be.undefined

    it "has valid options", inject (usersDialogGrid) ->
      options = usersDialogGrid()

      expect(options).to.have.property "path", "/api/users"
      expect(options).to.have.property "rowNum", 10
      expect(options).to.have.property "sortname", "id"
      expect(options).to.have.property "colModel"

    it "can be overridden", inject (usersDialogGrid) ->
      options = usersDialogGrid(sortname: "name")
      expect(options).to.have.property "sortname", "name"

    it "handles `loadError` event", inject ($log, usersDialogGrid) ->
      loadError = usersDialogGrid().loadError
      expect(loadError).to.not.be.undefined

      sinon.spy($log, "error")
      loadError("foo")
      expect($log.error.called).to.be.true

    describe "colModel", ->

      it "has valid number of columns", inject (exampleGrid) ->
        colModel = exampleGrid().colModel
        expect(colModel).to.have.length 5

      it "has valid `birthday` date formatter", inject (usersDialogGrid) ->
        colModel = usersDialogGrid().colModel
        birthdayCol = _.findWhere(colModel, name: "birthday")

        expect(birthdayCol).to.not.be.undefined
        expect(birthdayCol.formatter(1392127095158)).to.eq "the date"
