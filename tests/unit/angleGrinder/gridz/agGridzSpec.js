/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("agGridzSpec", function() {

  beforeEach(module("angleGrinder.gridz", function($provide) {
    $provide.value("ActionPopupHandler", sinon.stub());
  })
  );

  return describe("directive: agGrid", function() {
    let $scope = null;
    let element = null;

    let gridzSpy = null;
    let isVisibleStub = null;

    const sampleGridOptions = {
      data: [],
      datatype: "json",
      colModel: [{
        name: "id",
        label: "Inv No",
        search: true
      }
      ]
    };

    beforeEach(inject(function($rootScope) {
      // create a spy on the gridz plugin
      gridzSpy = sinon.spy($.fn, "gridz");

      //FIXME this was causing the "Cannot read property 'hDiv' of null" error on jqgrid
      // create a stub for jQuery.is(":visible") method
      isVisibleStub = sinon.stub(jQuery.prototype, "is");
      isVisibleStub.withArgs(":visible").returns(true);

      $scope = $rootScope.$new();
      return $scope.gridOptions = sampleGridOptions;
    })
    );

    afterEach(function() {
      // restore stubs
      gridzSpy.restore();
      //FIXME see hdiv above
      isVisibleStub.restore();
    });

    const itPassesValidOptionsToTheGrid = () => it("passes valid options to the gridz plugin", function() {
      expect(gridzSpy).to.have.been.called;
      return expect(gridzSpy).to.have.been.calledWith(sampleGridOptions);
    });

    const itRendersTheGrid = () => it("renders the grid", function() {
      expect(element.find("div.ui-jqgrid").length).to.equal(1);
      expect(element.find("table.gridz").length).to.equal(1);
      return expect(element.find("div.gridz-pager").length).to.equal(1);
    });

    const itInitializesActionPopupHandler = () => it("initializes action popup handler", inject(ActionPopupHandler => expect(ActionPopupHandler).to.have.been.called)
    );

    //FIXME this is causing the hdi
    xdescribe("when `ag-grid-name` is not provided", function() {
      beforeEach(inject($injector => ({element} = compileTemplate(`\
<div ag-grid="gridOptions"></div>\
`, $injector, $scope)))
      );


      itPassesValidOptionsToTheGrid();
      itRendersTheGrid();
      itInitializesActionPopupHandler();

      it("assigns default `id` for the grid element", () => expect(element.find("table.gridz").attr("id")).to.equal("gridz"));

      return it("assigns default `id` for the pager", () => expect(element.find("div.gridz-pager").attr("id")).to.equal("gridz-pager"));
    });

    /*describe "when `ag-grid-name` is provided", ->
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
          expect($scope.$grid).to.not.be.undefined

        it "is initialized with the grid element", ->
          expect($scope.projectsGrid.getGridEl()).to.not.be.undefined
          expect($scope.$grid.getGridEl()).to.not.be.undefined

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
            expect($scope.grid.projects).to.not.be.undefined*/

    xdescribe("when `ag-grid-col-model` is provided", function() {

      beforeEach(inject(function($injector) {
        const colModel = [{name: "dynamicFoo", label: "Foo"}, {name: "dynamicBar", label: "Bar", search: true}];

        return ({element} = compileTemplate(`\
<div ag-grid="gridOptions"
     ag-grid-col-model='${angular.toJson(colModel)}'></div>\
`, $injector, $scope));
      })
      );

      return it("overrides grid `colModel`", function() {
        const {
          colModel
        } = gridzSpy.getCall(0).args[0];

        const fooCol = _.find(colModel, {name: "dynamicFoo"});
        expect(fooCol).to.not.be.undefined;
        expect(fooCol).to.have.property("label", "Foo");

        const barCol = _.find(colModel, {name: "dynamicBar"});
        expect(barCol).to.not.be.undefined;
        expect(barCol).to.have.property("label", "Bar");
        return expect(barCol).to.have.property("search", true);
      });
    });

    xdescribe("grid without the pager", function() {

      beforeEach(inject(function($injector) {
        $scope.gridOptions.pager = false;

        return ({element} = compileTemplate(`\
<div ag-grid="gridOptions"
     ag-grid-name="projectsGrid"></div>\
`, $injector, $scope));
      })
      );

      itRendersTheGrid();
      itInitializesActionPopupHandler();

      it("generates `id` for the grid element", () => expect(element.find("table.gridz").attr("id")).to.equal("projectsGrid"));

      return it("passes valid options to the gridz plugin", function() {
        expect(gridzSpy).to.have.been.called;
        return expect(gridzSpy.getCall(0).args[0].pager).to.be.false;
      });
    });
  });
});
