describe "module: angleGrinder.forms", ->

  beforeEach module "angleGrinder.forms"

  $scope = null
  element = null
  ctrl = null

  beforeEach inject ($injector) ->
    {element, $scope} = compileTemplate """
      <div class="ag-panels-row">
        <div class="panel ag-panel">
          <div class="panel-heading">heading</div>
          <div class="panel-body">body</div>
          <div class="panel-footer">footer</div>
        </div>

        <div class="panel ag-panel">
          <div class="panel-heading">other heading</div>
        </div>
      </div>
    """, $injector

    ctrl = element.controller("agPanelsRow")

  # TODO extend this spec
  describe "directive: agPanel", ->

    it "adds the current element to the panels stack", ->
      expect(ctrl.panels.length).to.eq 2
