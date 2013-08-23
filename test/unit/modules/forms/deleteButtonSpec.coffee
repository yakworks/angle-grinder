describe "module: angleGrinder.forms directive: agDeleteButton", ->
  beforeEach module("angleGrinder.forms")

  element = null
  $scope = null
  $http = null

  beforeEach inject ($injector, _$http_) ->
    $http = _$http_

    {element, $scope} = compileTemplate """
      <ag-delete-button when-confirmed="delete(123)" deleting="deleting"></ag-delete-button>
    """, $injector

  it "is visible", ->
    expect(element.css("display")).not.toBe "none"

  it "is not disabled", ->
    expect(element.prop("disabled")).toBeFalsy()

  it "has a valid label", ->
    expect(element).toHaveText /Delete/

  describe "when the button is clicked", ->
    beforeEach -> element.click()

    it "displays the confirmation", ->
      expect(element).toHaveText(/Are you sure?/)

    it "changes button class", ->
      expect(element).toHaveClass "btn-warning"

  describe "when the button is double clicked", ->
    beforeEach ->
      element.click()
      $scope.delete = ->
      spyOn($scope, "delete")

    it "performs delete action", ->
      element.click()
      expect($scope.delete).toHaveBeenCalledWith(123)

  describe "disabling / enabling", ->
    requestInProgress = (val) ->
      beforeEach inject (pendingRequests) ->
        spyOn(pendingRequests, "for").andReturn(val)
        $scope.$digest()
        expect(pendingRequests.for).toHaveBeenCalledWith("POST", "DELETE")

    describe "when the request is in progress", ->
      requestInProgress true

      it "disables the button", ->
        expect(element.prop("disabled")).toBeTruthy()

      it "changes the button label", ->
        expect(element).toHaveText "Delete..."

    describe "when the request in not in progress", ->
      requestInProgress false

      it "is enabled", ->
        expect(element.prop("disabled")).toBeFalsy()
