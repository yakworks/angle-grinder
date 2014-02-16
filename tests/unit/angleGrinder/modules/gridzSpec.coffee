describe "module: angleGrinder.gridz", ->

  beforeEach module "angleGrinder.gridz", ($provide) ->
    $provide.value "actionPopupHandler", sinon.stub()
    return

  describe "directive: agGrid", ->
    $scope = null
    element = null

    gridzSpy = null
    isVisibleStub = null

    sampleGridOptions =
      data: []
      colModel: [
        name: "id"
        label: "Inv No"
        search: true
      ]

    beforeEach inject ($rootScope) ->
      # create a spy on the gridz plugin
      gridzSpy = sinon.spy($.fn, "gridz")

      # create a stub for jQuery.is(":visible") method
      isVisibleStub = sinon.stub(jQuery::, "is")
      isVisibleStub.withArgs(":visible").returns(true)

      $scope = $rootScope.$new()
      $scope.gridOptions = sampleGridOptions

    afterEach ->
      # restore stubs
      gridzSpy.restore()
      isVisibleStub.restore()

    itPassesValidOptionsToTheGrid = ->
      it "passes valid options to the gridz plugin", ->
        expect(gridzSpy.called).to.be.true
        expect(gridzSpy.calledWith(sampleGridOptions)).to.be.true

    itRendersTheGrid = ->
      it "renders the grid", ->
        expect(element.find("div.ui-jqgrid").length).to.equal 1
        expect(element.find("table.gridz").length).to.equal 1
        expect(element.find("div.gridz-pager").length).to.equal 1

    itInitializesActionPopupHandler = ->
      it "initializes action popup handler", inject (actionPopupHandler) ->
        expect(actionPopupHandler.called).to.be.true

    describe "when `ag-grid-name` is not provided", ->
      beforeEach inject ($injector) ->
        {element} = compileTemplate """
          <div ag-grid="gridOptions"></div>
        """, $injector, $scope

      itPassesValidOptionsToTheGrid()
      itRendersTheGrid()
      itInitializesActionPopupHandler()

      it "assigns default `id` for the grid element", ->
        expect(element.find("table.gridz").attr("id")).to.equal "gridz"

      it "assigns default `id` for the pager", ->
        expect(element.find("div.gridz-pager").attr("id")).to.equal "gridz-pager"

    describe "when `ag-grid-name` is provided", ->
      beforeEach inject ($injector) ->
        {element} = compileTemplate """
          <div ag-grid="gridOptions"
               ag-grid-name="projectsGrid"></div>
        """, $injector, $scope

      itPassesValidOptionsToTheGrid()
      itRendersTheGrid()
      itInitializesActionPopupHandler()

      it "generates `id` for the grid element", ->
        expect(element.find("table.gridz").attr("id")).to.equal "projectsGrid"

      it "generates `id` for the pager", ->
        expect(element.find("div.gridz-pager").attr("id")).to.equal "projectsGrid-pager"

      describe "the grid controller", ->

        it "is assigned to the scope", ->
          expect($scope.projectsGrid).to.not.be.undefined

        it "is initialized with the grid element", ->
          expect($scope.projectsGrid.$grid).to.not.be.undefined
