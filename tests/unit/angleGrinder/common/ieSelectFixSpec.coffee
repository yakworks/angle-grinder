describe "module:angleGrinder.common directive: ieSelectFix", ->

  element = null
  scope = null

  beforeEach module "angleGrinder.common", ($provide) ->
    $provide.value "$window",
      location: {}
      navigator: {userAgent: "test MSIE 10.0 test"}
    return


  beforeEach inject ($rootScope, $compile) ->
    element = angular.element('<select ie-select-fix><option value="test">Test</option></select>')
    scope = $rootScope
    $compile(element)(scope)
    scope.$digest()

  it "if user agent not IE9 nothing changed", ->
    element.trigger("change")
    option = element.find("option")
    expect(option[0].value).eq "test"



