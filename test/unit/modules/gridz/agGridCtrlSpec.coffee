describe "module: angleGrinder.gridz, conroller: AgGridCtrl", ->
  # dummy elements
  $element =
    find: jasmine.createSpy("find")

  gridElement =
    jqGrid: jasmine.createSpy("jqGrid")
    trigger: jasmine.createSpy("trigger")

  controller = null

  beforeEach module("angleGrinder.gridz")

  beforeEach inject ($rootScope, $controller) ->
    $element.find.andReturn(gridElement)

    controller = $controller "AgGridCtrl" ,
      $scope: $rootScope.$new(),
      $element: $element

    expect($element.find).toHaveBeenCalledWith("#grid")

    fakeColModel = [{ name: "foo", hidden: true }, { name: "bar", hidden: false }]
    gridElement.jqGrid.andCallFake (method, arg) ->
      return fakeColModel if method is "getGridParam" and arg is "colModel"

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
        expect(gridElement.jqGrid).toHaveBeenCalledWith("showCol", "foo")

      it "resizes the grid", ->
        expect(gridElement.trigger).toHaveBeenCalledWith("resize")

    describe "when the column is not hidden", ->
      beforeEach -> controller.toggleColumn("bar")

      it "hides the column", ->
        expect(gridElement.jqGrid).toHaveBeenCalledWith("hideCol", "bar")

      it "resizes the grid", ->
        expect(gridElement.trigger).toHaveBeenCalledWith("resize")
