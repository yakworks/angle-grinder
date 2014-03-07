describe "module: angleGrinder.forms directive: agDeleteButton", ->
  beforeEach module "angleGrinder.forms"

  element = null
  $scope = null

  beforeEach inject ($injector) ->
    {element, $scope} = compileTemplate """
      <ag-delete-button when-confirmed="delete(123)" deleting="deleting"></ag-delete-button>
    """, $injector

    $scope.delete = sinon.stub()

  it "is visible", ->
    expect(element.css("display")).not.to.equal "none"

  it "is not disabled", ->
    expect(element.prop("disabled")).to.be.false

  it "has a valid label", ->
    expect(element.text()).to.include "Delete"

  describe "when the button is clicked", ->
    beforeEach -> element.click()

    it "displays the confirmation", ->
      expect(element.text()).to.include "Are you sure?"

    it "changes button class", ->
      expect(element.hasClass("btn-warning")).to.be.true

  describe "when the button is double clicked", ->
    beforeEach ->
      element.click()
      element.click()

    it "performs the delete action", ->
      expect($scope.delete).to.have.been.called
      expect($scope.delete).to.have.been.calledWith(123)

    it "disables the button", ->
      expect(element.prop("disabled")).to.be.true

  describe "disabling / enabling the button", ->
    deferred = null

    beforeEach inject ($q) ->
      deferred = $q.defer()
      $scope.delete.returns(deferred.promise)

      element.click()

    describe "when the request is in progress", ->
      beforeEach -> element.click()

      it "disables the button", ->
        expect(element.prop("disabled")).to.be.true

      it "changes the button label", ->
        expect(element.text()).to.include "Delete"
        expect(element.text()).to.include "..."

    describe "when the request in not in progress", ->
      beforeEach inject ($rootScope) ->
        element.click()
        $rootScope.$apply -> deferred.resolve(true)

      it "is enabled", ->
        expect(element.prop("disabled")).to.be.false

      it "does not change the button label", ->
        expect(element.text()).to.include "Delete"
        expect(element.text()).to.not.include "..."
