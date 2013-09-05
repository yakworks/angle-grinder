describe "module: angleGrinder.gridz, conroller: AgGridCtrl", ->
  beforeEach module("angleGrinder.gridz")

  controller = null
  jqGridStub = null

  beforeEach inject ($rootScope, $controller) ->
    jqGridStub = sinon.stub(jqGrid: angular.noop, trigger: angular.noop)
    elementStub = sinon.stub(find: angular.noop)
    elementStub.find.withArgs("table.gridz").returns(jqGridStub)

    controller = $controller "AgGridCtrl" ,
      $scope: $rootScope.$new(),
      $element: elementStub

    expect(elementStub.find.calledWith("table.gridz")).toBeTruthy()

    fakeColModel = [{ name: "foo", hidden: true }, { name: "bar", hidden: false }]
    jqGridStub.jqGrid.withArgs("getGridParam", "colModel").returns(fakeColModel)

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
