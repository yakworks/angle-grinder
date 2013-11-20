describe "module: angleGrinder.gridz, conroller: AgGridCtrl", ->

  beforeEach module "angleGrinder.gridz", ($provide) ->
    # substitute `flatten` service with a spy
    fakeFlatten = (data) -> data
    $provide.value "flatten", sinon.spy(fakeFlatten)

    return

  controller = null
  jqGridStub = null

  beforeEach inject ($controller) ->
    jqGridStub = sinon.stub($().jqGrid())

    controller = $controller "AgGridCtrl"
    controller.registerGridElement(jqGridStub)
    sinon.stub(controller, "flashOnSuccess")

    fakeColModel = [{ name: "foo", hidden: true }, { name: "bar", hidden: false }]
    jqGridStub.jqGrid.withArgs("getGridParam", "colModel").returns(fakeColModel)

  describe "#reload", ->
    it "reloads the grid", ->
      # When
      controller.reload()

      # Then
      expect(jqGridStub.trigger.called).to.be.true
      expect(jqGridStub.trigger.calledWith("reloadGrid")).to.be.true

  describe "#getParam", ->
    it "retrieves a particular grid parameter", ->
      # When
      controller.getParam("foo")

      # Then
      expect(jqGridStub.getGridParam.called).to.be.true
      expect(jqGridStub.getGridParam.calledWith("foo")).to.be.true

  describe "#setParam", ->
    it "sets a particular grid parameter", ->
      # When
      controller.setParam(foo: "bar")

      # Then
      expect(jqGridStub.setGridParam.called).to.be.true
      expect(jqGridStub.setGridParam.calledWith(foo: "bar")).to.be.true

  describe "#updateRow", ->
    it "updates a row with the given id", ->
      # When
      controller.updateRow(123, foo: "bar")

      # Then
      expect(jqGridStub.setRowData.called).to.be.true
      expect(jqGridStub.setRowData.calledWith(123, foo: "bar")).to.be.true

    it "flattens data before inserting it to the grid", inject (flatten) ->
      # When
      controller.updateRow(123, foo: bar: "biz")

      # Then
      expect(flatten.called).to.be.true
      expect(flatten.calledWith(foo: bar: "biz")).to.be.true

    it "flashes the updated row", ->
      # Given
      controller.updateRow(123, foo: "bar")

      # Then
      expect(controller.flashOnSuccess.called).to.be.true
      expect(controller.flashOnSuccess.calledWith(123)).to.be.true

  describe "#addRow", ->
    describe "when the position is not specified", ->
      it "adds a row at the first position", ->
        # When
        controller.addRow(234, foo: "biz")

        # Then
        expect(jqGridStub.addRowData.called).to.be.true
        expect(jqGridStub.addRowData.calledWith(234, foo: "biz", "first")).to.be.true

    describe "when the position is specified", ->
      it "adds a row at the specified position", ->
        # When
        controller.addRow(234, foo: "biz", "last")

        # Then
        expect(jqGridStub.addRowData.called).to.be.true
        expect(jqGridStub.addRowData.calledWith(234, foo: "biz", "last")).to.be.true

    it "flattens data before inserting it to the grid", inject (flatten) ->
      # When
      controller.addRow(234, foo: bar: "baz")

      # Then
      expect(flatten.called).to.be.true
      expect(flatten.calledWith(foo: bar: "baz")).to.be.true

    it "flashes the inserted row", ->
      # Given
      controller.addRow(234, foo: "bar")

      # Then
      expect(controller.flashOnSuccess.called).to.be.true
      expect(controller.flashOnSuccess.calledWith(234)).to.be.true

  describe "#saveRow", ->
    describe "when a row exists in the grid", ->
      beforeEach -> jqGridStub.getInd.returns(true)

      it "updates a row with the given id", ->
        # Given
        stub = jqGridStub.setRowData

        # When
        controller.saveRow(123, foo: "bar")

        # Then
        expect(stub.called).to.be.true
        expect(stub.calledWith(123, foo: "bar")).to.be.true

        expect(jqGridStub.addRowData.called).to.be.false

    describe "otherwise", ->
      beforeEach -> jqGridStub.getInd.returns(false)

      it "inserts a new row at the beginning", ->
        # Given
        stub = jqGridStub.addRowData

        # When
        controller.saveRow(234, foo: "biz")

        # Then
        expect(stub.called).to.be.true
        expect(stub.calledWith(234, foo: "biz", "first")).to.be.true

        expect(jqGridStub.setRowData.called).to.be.false

  describe "#hasRow", ->
    describe "if a row with the given id exists", ->
      it "returns true", ->
        # Given
        stub = jqGridStub.getInd.returns(id: 123, foo: "bar")

        # When
        expect(controller.hasRow(123)).to.be.true

        # Then
        expect(stub.called).to.be.true
        expect(stub.calledWith(123)).to.be.true

    describe "otherwise", ->
      it "returns false", ->
        # Given
        stub = jqGridStub.getInd.returns(false)

        # When
        expect(controller.hasRow(234)).to.be.false

        # Then
        expect(stub.called).to.be.true
        expect(stub.calledWith(234)).to.be.true

  describe "#removeRow", ->
    it "removea a row with the given id", ->
      # Given
      stub = jqGridStub.delRowData

      # stub with callback
      controller.flashOnSuccess.restore()
      sinon.stub(controller, "flashOnSuccess", (id, callback) -> callback())

      # When
      controller.removeRow(123)

      # Then
      expect(stub.called).to.be.true
      expect(stub.calledWith(123)).to.be.true

    it "flashes the removed row", ->
      # Given
      controller.removeRow(345)

      # Then
      expect(controller.flashOnSuccess.called).to.be.true
      expect(controller.flashOnSuccess.calledWith(345)).to.be.true

  describe "#search", ->
    it "sets search filters and triggers grid reload", ->
      # When
      controller.search(login: "foo")

      # Then
      expect(jqGridStub.setGridParam.called).to.be.true
      expect(jqGridStub.setGridParam.calledWith(search: true, postData: filters: '{"login":"foo"}')).to.be.true

      expect(jqGridStub.trigger.called).to.be.true
      expect(jqGridStub.trigger.calledWith("reloadGrid")).to.be.true

    it "returns a promise", inject ($timeout) ->
      # Given
      sinon.stub(controller, "reload", (callback) -> $timeout -> callback())
      promise = controller.search(login: "foo")

      resolvedValue = null
      promise.then (data) -> resolvedValue = data

      # When
      expect(resolvedValue).to.be.null
      $timeout.flush()

      # Then
      expect(resolvedValue).to.deep.equal login: "foo"

  describe "#getSelectedRowIds", ->
    it "returns a list of selected row ids", ->
      # When
      controller.getSelectedRowIds()

      # Then
      expect(jqGridStub.getGridParam.called).to.be.true
      expect(jqGridStub.getGridParam.calledWith("selarrrow")).to.be.true

  describe "#isColumnHidden", ->
    it "is defined", ->
      expect(controller.isColumnHidden).to.not.be.undefined

    describe "when a column with the given id is hidden", ->
      it "returns true", ->
        expect(controller.isColumnHidden("foo")).to.be.true

    describe "when a column with the given id is not hidden", ->
      it "returns true", ->
        expect(controller.isColumnHidden("bar")).to.be.false

    describe "when a column with is missing", ->
      it "returns undefined", ->
        expect(controller.isColumnHidden("fooBar")).to.be.undefined

  describe "#toggleColumn", ->
    it "is defined", ->
      expect(controller.toggleColumn).to.not.be.undefined

    describe "when the column is hidden", ->
      beforeEach -> controller.toggleColumn("foo")

      it "shows the column", ->
        expect(jqGridStub.jqGrid.called).to.be.true
        expect(jqGridStub.jqGrid.calledWith("showCol", "foo")).to.be.true

      it "resizes the grid", ->
        expect(jqGridStub.trigger.called).to.be.true
        expect(jqGridStub.trigger.calledWith("resize")).to.be.true

    describe "when the column is not hidden", ->
      beforeEach -> controller.toggleColumn("bar")

      it "hides the column", ->
        expect(jqGridStub.jqGrid.called).to.be.true
        expect(jqGridStub.jqGrid.calledWith("hideCol", "bar")).to.be.true

      it "resizes the grid", ->
        expect(jqGridStub.trigger.called).to.be.true
        expect(jqGridStub.trigger.calledWith("resize")).to.be.true

  describe "#columnChooser", ->
    it "is defined", ->
      expect(controller.columnChooser).to.not.be.undefined

    it "calls `columnChooser` method on the jqGrid", ->
      # When
      controller.columnChooser()

      # Then
      expect(jqGridStub.jqGrid.called).to.be.true
      expect(jqGridStub.jqGrid.calledWith("columnChooser")).to.be.true
