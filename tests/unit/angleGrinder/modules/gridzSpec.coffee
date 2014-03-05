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
      datatype: "json"
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

      context "when the name is an expression", ->
        beforeEach inject ($injector) ->
          {element} = compileTemplate """
            <div ag-grid="gridOptions"
                 ag-grid-name="grid.projects"></div>
          """, $injector, $scope

        it "generates `id` for the grid element", ->
          expect(element.find("table.gridz").attr("id")).to.equal "gridProjects"

        it "generates `id` for the pager", ->
          expect(element.find("div.gridz-pager").attr("id")).to.equal "gridProjects-pager"

        describe "the grid controller", ->

          it "is assigned to the scope", ->
            expect($scope.grid.projects).to.not.be.undefined

    describe "when `ag-grid-col-model` is provided", ->

      beforeEach inject ($injector) ->
        colModel = [{name: "dynamicFoo", label: "Foo"}, {name: "dynamicBar", label: "Bar", search: true}]

        {element} = compileTemplate """
          <div ag-grid="gridOptions"
               ag-grid-col-model='#{angular.toJson(colModel)}'></div>
        """, $injector, $scope

      it "overrides grid `colModel`", ->
        colModel = gridzSpy.getCall(0).args[0].colModel

        fooCol = _.findWhere(colModel, name: "dynamicFoo")
        expect(fooCol).to.not.be.undefined
        expect(fooCol).to.have.property "label", "Foo"

        barCol = _.findWhere(colModel, name: "dynamicBar")
        expect(barCol).to.not.be.undefined
        expect(barCol).to.have.property "label", "Bar"
        expect(barCol).to.have.property "search", true

    describe "grid without the pager", ->

      beforeEach inject ($injector) ->
        $scope.gridOptions.pager = false

        {element} = compileTemplate """
          <div ag-grid="gridOptions"
               ag-grid-name="projectsGrid"></div>
        """, $injector, $scope

      itRendersTheGrid()
      itInitializesActionPopupHandler()

      it "generates `id` for the grid element", ->
        expect(element.find("table.gridz").attr("id")).to.equal "projectsGrid"

      it "passes valid options to the gridz plugin", ->
        expect(gridzSpy.called).to.be.true
        expect(gridzSpy.getCall(0).args[0].pager).to.be.false
