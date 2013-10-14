describe "module: angleGrinder.forms directive: agSubmitButton", ->
  beforeEach module("angleGrinder.forms")

  $scope = null
  element = null
  $http = null

  beforeEach inject ($rootScope, $injector, _$http_) ->
    $http = _$http_

    $scope = $rootScope.$new()
    {element, $scope} = compileTemplate """
      <form name="form">
        <ag-submit-button></ag-submit-button>
      </form>
    """, $injector

    element = element.find("button[type=submit]")

  itIsEnabled = ->
    it "is enabled", ->
      expect(element.prop("disabled")).to.be.false

  it "has valid label", ->
    expect(element.text()).to.contain "Save"

  itIsEnabled()

  describe "when the form is valid", ->
    beforeEach ->
      $scope.$apply -> $scope.editForm = $invalid: false

    itIsEnabled()

  describe "disabling / enabling", ->
    requestInProgress = (val) ->
      beforeEach inject (pendingRequests) ->
        stub = sinon.stub(pendingRequests, "for").returns(val)
        $scope.$digest()
        expect(stub.called).to.be.true
        expect(stub.calledWith("POST", "PUT", "PATCH")).to.be.true

    describe "when the request is in progress", ->
      requestInProgress true

      it "is disabled", ->
        expect(element.prop("disabled")).to.be.true

      it "changes the button label", ->
        expect(element.text()).to.contain "Save..."

    describe "when the request is not in progress", ->
      requestInProgress false

      itIsEnabled()
