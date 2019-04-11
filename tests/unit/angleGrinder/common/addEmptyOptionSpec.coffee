describe "module:angleGrinder.common directive: addEmptyOption", ->

  element = null
  scope = null

  beforeEach module "angleGrinder.common", ->

  beforeEach inject ($rootScope, $compile) ->
    element = angular.element('<select add-empty-option><option value="test">Test</option></select>')
    scope = $rootScope
    $compile(element)(scope)
    scope.$digest()

  it "check that empty option is added", ->
    options = element.find("option")
    expect(options[0].value).eq ""


