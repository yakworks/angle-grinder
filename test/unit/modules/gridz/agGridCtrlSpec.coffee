describe "module: angleGrinder.gridz, conroller: AgGridCtrl", ->
  beforeEach module("angleGrinder.gridz")

  controller = null
  jqGridStub = null

  beforeEach inject ($rootScope, $controller) ->
    jqGridStub = sinon.stub($().jqGrid())
    elementStub = sinon.stub($())
    elementStub.find.withArgs("table.gridz").returns(jqGridStub)

    controller = $controller "AgGridCtrl" ,
      $scope: $rootScope.$new(),
      $element: elementStub

    expect(elementStub.find.calledWith("table.gridz")).toBeTruthy()

    fakeColModel = [{ name: "foo", hidden: true }, { name: "bar", hidden: false }]
    jqGridStub.jqGrid.withArgs("getGridParam", "colModel").returns(fakeColModel)

  describe "#reload", ->
    it "reloads the grid", ->
      # When
      controller.reload()

      # Then
      expect(jqGridStub.trigger.called).toBeTruthy()
      expect(jqGridStub.trigger.calledWith("reloadGrid")).toBeTruthy()

  describe "#getParam", ->
    it "retrieves a particular grid parameter", ->
      # When
      controller.getParam("foo")

      # Then
      expect(jqGridStub.getGridParam.called).toBeTruthy()
      expect(jqGridStub.getGridParam.calledWith("foo")).toBeTruthy()

  describe "#setParam", ->
    it "sets a particular grid parameter", ->
      # When
      controller.setParam(foo: "bar")

      # Then
      expect(jqGridStub.setGridParam.called).toBeTruthy()
      expect(jqGridStub.setGridParam.calledWith(foo: "bar")).toBeTruthy()

  describe "#updateRow", ->
    it "updates a row with the given id", ->
      # Given
      controller.updateRow(123, foo: "bar")

      # Then
      expect(jqGridStub.setRowData.called).toBeTruthy()
      expect(jqGridStub.setRowData.calledWith(123, foo: "bar")).toBeTruthy()

  describe "#addRow", ->
    describe "when the position is not specified", ->
      it "adds a row at the first position", ->
        # When
        controller.addRow(234, foo: "biz")

        # Then
        expect(jqGridStub.addRowData.called).toBeTruthy()
        expect(jqGridStub.addRowData.calledWith(234, foo: "biz", "first")).toBeTruthy()

    describe "when the position is specified", ->
      it "adds a row at the specified position", ->
        # When
        controller.addRow(234, foo: "biz", "last")

        # Then
        expect(jqGridStub.addRowData.called).toBeTruthy()
        expect(jqGridStub.addRowData.calledWith(234, foo: "biz", "last")).toBeTruthy()

  describe "#saveRow", ->
    describe "when a row exists in the grid", ->
      beforeEach -> jqGridStub.getInd.returns(true)

      it "updates a row with the given id", ->
        # Given
        stub = jqGridStub.setRowData

        # When
        controller.saveRow(123, foo: "bar")

        # Then
        expect(stub.called).toBeTruthy()
        expect(stub.calledWith(123, foo: "bar")).toBeTruthy()

        expect(jqGridStub.addRowData.called).toBeFalsy()

    describe "otherwise", ->
      beforeEach -> jqGridStub.getInd.returns(false)

      it "inserts a new row at the beginning", ->
        # Given
        stub = jqGridStub.addRowData

        # When
        controller.saveRow(234, foo: "biz")

        # Then
        expect(stub.called).toBeTruthy()
        expect(stub.calledWith(234, foo: "biz", "first")).toBeTruthy()

        expect(jqGridStub.setRowData.called).toBeFalsy()

  describe "#hasRow", ->
    describe "if a row with the given id exists", ->
      it "returns true", ->
        # Given
        stub = jqGridStub.getInd.returns(id: 123, foo: "bar")

        # When
        expect(controller.hasRow(123)).toBeTruthy()

        # Then
        expect(stub.called).toBeTruthy()
        expect(stub.calledWith(123)).toBeTruthy()

    describe "otherwise", ->
      it "returns false", ->
        # Given
        stub = jqGridStub.getInd.returns(false)

        # When
        expect(controller.hasRow(234)).toBeFalsy()

        # Then
        expect(stub.called).toBeTruthy()
        expect(stub.calledWith(234)).toBeTruthy()

  describe "#removeRow", ->
    it "removea a row with the given id", ->
      # Given
      stub = jqGridStub.delRowData

      # When
      controller.removeRow(123)

      # Then
      expect(stub.called).toBeTruthy()
      expect(stub.calledWith(123)).toBeTruthy()

  describe "#search", ->
    it "sets search filters and triggers grid reload", ->
      # When
      controller.search(login: "foo")

      # Then
      expect(jqGridStub.setGridParam.called).toBeTruthy()
      expect(jqGridStub.setGridParam.calledWith(search: true, postData: filters: '{"login":"foo"}')).toBeTruthy()

      expect(jqGridStub.trigger.called).toBeTruthy()
      expect(jqGridStub.trigger.calledWith("reloadGrid")).toBeTruthy()

    it "returns a promise", inject ($timeout) ->
      # Given
      sinon.stub(controller, "reload", (callback) -> $timeout -> callback())
      promise = controller.search(login: "foo")

      resolvedValue = null
      promise.then (data) -> resolvedValue = data

      # When
      expect(resolvedValue).toBeNull()
      $timeout.flush()

      # Then
      expect(resolvedValue).toEqual login: "foo"

  describe "#getSelectedRowIds", ->
    it "returns a list of selected row ids", ->
      # When
      controller.getSelectedRowIds()

      # Then
      expect(jqGridStub.getGridParam.called).toBeTruthy()
      expect(jqGridStub.getGridParam.calledWith("selarrrow")).toBeTruthy()

  describe "#isColumnHidden", ->
    it "is defined", ->
      expect(controller.isColumnHidden).toBeDefined()

    describe "when a column with the given id is hidden", ->
      it "returns true", ->
        expect(controller.isColumnHidden("foo")).toBeTruthy()

    describe "when a column with the given id is not hidden", ->
      it "returns true", ->
        expect(controller.isColumnHidden("bar")).toBeFalsy()

    describe "when a column with is missing", ->
      it "returns undefined", ->
        expect(controller.isColumnHidden("fooBar")).toBeUndefined()

  describe "#toggleColumn", ->
    it "is defined", ->
      expect(controller.toggleColumn).toBeDefined()

    describe "when the column is hidden", ->
      beforeEach -> controller.toggleColumn("foo")

      it "shows the column", ->
        expect(jqGridStub.jqGrid.called).toBeTruthy()
        expect(jqGridStub.jqGrid.calledWith("showCol", "foo")).toBeTruthy()

      it "resizes the grid", ->
        expect(jqGridStub.trigger.called).toBeTruthy()
        expect(jqGridStub.trigger.calledWith("resize")).toBeTruthy()

    describe "when the column is not hidden", ->
      beforeEach -> controller.toggleColumn("bar")

      it "hides the column", ->
        expect(jqGridStub.jqGrid.called).toBeTruthy()
        expect(jqGridStub.jqGrid.calledWith("hideCol", "bar")).toBeTruthy()

      it "resizes the grid", ->
        expect(jqGridStub.trigger.called).toBeTruthy()
        expect(jqGridStub.trigger.calledWith("resize")).toBeTruthy()

  describe "#columnChooser", ->
    it "is defined", ->
      expect(controller.columnChooser).toBeDefined()

    it "calls `columnChooser` method on the jqGrid", ->
      # When
      controller.columnChooser()

      # Then
      expect(jqGridStub.jqGrid.called).toBeTruthy()
      expect(jqGridStub.jqGrid.calledWith("columnChooser")).toBeTruthy()
