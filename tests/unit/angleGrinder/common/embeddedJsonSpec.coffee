describe "module:angleGrinder.common dervice: embeddedJsonServ", ->

  element = null
  scope = null

  beforeEach module "angleGrinder.common", ->

  beforeEach inject ($rootScope, $compile) ->
    element = angular.element('<script  type="application/embedded-json" name="testJson">{"name": "test", "id":2}</script>')
    angular.element(document.body).append(element)
    scope = $rootScope
    $compile(element)(scope)
    scope.$digest()

  it "check JSON validity", inject (EmbeddedJsonServ)->
    json = EmbeddedJsonServ("testJson")
    expect(json.name).to.eq "test"
    expect(json.id).to.eq 2


