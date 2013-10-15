describe "module: angleGrinder.forms service: massUpdateDialog", ->

  massUpdateDialog = null

  dialogMock = null
  gridMock = null

  beforeEach module "angleGrinder.forms", ($provide) ->
    # mock `$dialog` service
    dialogMock = sinon.mock(open: ->)
    $provide.value "$dialog", dialog: -> dialogMock.object

    return

  beforeEach inject (_massUpdateDialog_) ->
    massUpdateDialog = _massUpdateDialog_
    gridMock = sinon.mock(getSelectedRowIds: ->)

  it "is defined", ->
    expect(massUpdateDialog).to.not.be.undefined

  it "returns a function", ->
    expect(massUpdateDialog()).to.be.a "function"

  describe "when the grid is not provided", ->

    it "throws an error", ->

      options = grid: -> undefined
      expect(massUpdateDialog(options)).to.throw "grid is not defined"

  describe "when some rows are selected", ->
    options = {}

    beforeEach ->
      options =
        grid: -> gridMock.object
        templateUrl: -> "/path/to/template.html"

      gridMock.expects("getSelectedRowIds").once().returns [1, 2, 3]

    describe "when the controller is not specified", ->
      beforeEach ->
        dialogMock.expects("open").once().withArgs("/path/to/template.html", "MassUpdateFormCtrl")

      it "gets selected rows", ->
        massUpdateDialog(options)()
        gridMock.verify()

      it "opens the dialog", ->
        massUpdateDialog(options)()
        dialogMock.verify()

    describe "when the other controller is specified", ->
      beforeEach ->
        options.controller = -> "OtherCtrl"
        dialogMock.expects("open").once().withArgs("/path/to/template.html", "OtherCtrl")

      it "opens the dialog with the other controller", ->
        massUpdateDialog(options)()
        dialogMock.verify()

  describe "when nothing is selected", ->
    beforeEach ->
      gridMock.expects("getSelectedRowIds").once().returns []
      dialogMock.expects("open").never()

    it "does not open the dialog", ->
      dialogMock.verify()
