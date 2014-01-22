describe "module: angleGrinder.forms directive: agCancelButton", ->
  beforeEach module "angleGrinder.forms"

  element = null
  $scope = null

  beforeEach inject ($injector) ->
    {element, $scope} = compileTemplate """
      <ag-cancel-button></ag-cancel-button>
    """, $injector

  it "create a cancel button", ->
    expect(element.text()).to.contain "Cancel"
    expect(element.hasClass("btn")).to.be.true
