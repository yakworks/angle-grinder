describe "module:angleGrinder.common directive: addEmptyOption", ->

  element = null
  scope = null

  beforeEach module "angleGrinder.common", ->

  beforeEach inject ($rootScope, $compile) ->
    element = angular.element('<input ag-number ng-model="test.number">')
    scope = $rootScope
    scope.test = {}
    $compile(element)(scope)
    scope.$digest()

  it "set number value", ->
    angular.element(element).val('123').trigger('input')
    scope.$apply()
    expect(scope.test.number).eq 123

  it "set empty value", ->
    angular.element(element).val('').trigger('input')
    scope.$apply()
    expect(scope.test.number).eq undefined


