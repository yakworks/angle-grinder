describe "module: angleGrinder.forms directive: agCancelButton", ->
  beforeEach module "angleGrinder.forms"

  element = null
  $scope = null

  beforeEach inject ($injector) ->
    {element} = compileTemplate """
      <ag-cancel-button></ag-cancel-button>
    """, $injector, $scope

  it "has valid markup", ->
    expect(element.text()).to.contain "Cancel"
    expect(element.find("i").hasClass("icon-remove")).to.be.true
