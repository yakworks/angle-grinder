describe "module: angleGrinder.gridz, conroller: AgGridCtrl", ->
  beforeEach module("angleGrinder.gridz")

  controller = null
  jqGridStub = null

  beforeEach inject ($rootScope, $controller) ->
    jqGridStub = sinon.stub($().jqGrid())
    elementStub = sinon.stub(find: angular.noop)
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

  describe "#search", ->
    it "sets search filters and triggers grid reload", ->
      # When
      controller.search(login: "foo")

      # Then
      expect(jqGridStub.setGridParam.called).toBeTruthy()
      expect(jqGridStub.setGridParam.calledWith(search: true, postData: filters: '{"login":"foo"}')).toBeTruthy()

      expect(jqGridStub.trigger.called).toBeTruthy()
      expect(jqGridStub.trigger.calledWith("reloadGrid")).toBeTruthy()

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
