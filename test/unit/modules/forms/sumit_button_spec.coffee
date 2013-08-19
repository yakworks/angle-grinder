describe "module: angleGrinder.forms directive: agSubmitButton", ->
  beforeEach module("angleGrinder.forms")

  $scope = null
  element = null
  $http = null

  beforeEach inject ($rootScope, $injector, _$http_) ->
    $http = _$http_

    $scope = $rootScope.$new()
    {element, $scope} = compileTemplate """
      <ag-submit-button></ag-submit-button>
    """, $injector

  itIsEnabled = ->
    it "is enabled", ->
      expect(element.prop("disabled")).toBeFalsy()

  it "has valid label", ->
    expect(element).toHaveText /Save/

  itIsEnabled()

  describe "when the form is valid", ->
    beforeEach ->
      $scope.$apply -> $scope.editForm = $invalid: false

    itIsEnabled()

  describe "when the request is in progress", ->
    beforeEach ->
      $scope.$apply -> $http.pendingRequests = [{}]

    it "is disabled", ->
      expect(element.prop("disabled")).toBeTruthy()

    it "changes the button label", ->
      expect(element).toHaveText "Save..."

  describe "when the request is not in progress", ->
    beforeEach ->
      $scope.$apply -> $http.pendingRequests = []

    itIsEnabled()
