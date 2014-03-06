describe "module: angleGrinder.spinner", ->

  beforeEach module "angleGrinder.spinner", ($provide) ->
    $provide.decorator "pendingRequests", ($delegate) ->
      sinon.stub($delegate, "any")
      $delegate

  describe "directive: agSpinner", ->
    element = null
    $scope = null

    beforeEach inject ($injector) ->
      {element, $scope} = compileTemplate """
        <ul><ag-spinner></ag-spinner></ul>
      """, $injector

    spinnerEl = null
    beforeEach -> spinnerEl = element.find("li.spinner")

    it "renders the spinner", ->
      expect(spinnerEl.length).to.equal 1

    describe "when no requests", ->
      beforeEach inject (pendingRequests) -> pendingRequests.any.returns(false)

      it "does not display the animation", ->
        $scope.$apply()
        expect(spinnerEl.find("i").hasClass("spin")).to.be.false

    describe "when a request is in progress", ->
      beforeEach inject (pendingRequests) -> pendingRequests.any.returns(true)

      it "displays the animation", ->
        $scope.$apply()
        expect(spinnerEl.find("i").hasClass("spin")).to.be.true
