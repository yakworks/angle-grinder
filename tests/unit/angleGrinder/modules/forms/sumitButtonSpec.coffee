describe "module: angleGrinder.forms directive: agSubmitButton", ->
  beforeEach module "angleGrinder.forms"

  $scope = null
  element = null
  $http = null

  beforeEach inject ($rootScope, $injector, _$http_) ->
    $http = _$http_

    $scope = $rootScope.$new()
    {element, $scope} = compileTemplate """
      <form name="theForm">
        <ng-form name="nestedForm">
          <ng-form name="evenDeeperNested"></ng-form>
        </ng-form>

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
    beforeEach -> $scope.theForm.$invalid = false

    itIsEnabled()

    describe "on click", ->

      it "marks the form as submitted", ->
        expect($scope.theForm.$submitted?).to.be.false

        element.click()

        expect($scope.theForm.$submitted).to.be.true

      it "marks nested forms as submitted", ->
        expect($scope.theForm.nestedForm.$submitted?).to.be.false
        expect($scope.theForm.nestedForm.evenDeeperNested.$submitted?).to.be.false

        element.click()

        expect($scope.theForm.nestedForm.$submitted).to.be.true
        expect($scope.theForm.nestedForm.evenDeeperNested.$submitted).to.be.true

  describe "disabling / enabling", ->
    requestInProgress = (val) ->
      beforeEach inject (pendingRequests) ->
        sinon.stub(pendingRequests, "for").returns(val)
        $scope.$digest()
        expect(pendingRequests.for.called).to.be.true
        expect(pendingRequests.for.calledWith("POST", "PUT", "PATCH")).to.be.true

    describe "when the request is in progress", ->
      requestInProgress true

      it "is disabled", ->
        expect(element.prop("disabled")).to.be.true

      it "changes the button label", ->
        expect(element.text()).to.contain "Save..."

    describe "when the request is not in progress", ->
      requestInProgress false
      itIsEnabled()
