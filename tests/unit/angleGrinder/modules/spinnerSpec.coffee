describe "module: angleGrinder.spinner", ->
  beforeEach module "angleGrinder.spinner"

  describe "service: httpRequestTracker", ->
    httpRequestTracker = null

    # stubs `pendingRequests` service
    beforeEach module "angleGrinder.common", ($provide) ->
      $provide.value "pendingRequests", sinon.stub()
      return

    beforeEach inject (_httpRequestTracker_) ->
      httpRequestTracker = _httpRequestTracker_

    describe "when no requests is progress", ->
      beforeEach inject (pendingRequests) -> pendingRequests.returns(false)

      it "does not report pending requests", ->
        expect(httpRequestTracker.hasPendingRequests()).to.be.false

    describe "when some requests are in progress", ->
      beforeEach inject (pendingRequests) -> pendingRequests.returns(true)

      it "reports pending requests", ->
        expect(httpRequestTracker.hasPendingRequests()).to.be.true

  describe "controller", ->
    httpRequestTracker = null
    controller = null
    $scope = null

    beforeEach inject ($injector, $rootScope, $controller) ->
      httpRequestTracker = $injector.get("httpRequestTracker")
      $scope = $rootScope.$new()
      controller = $controller "spinner",
        $scope: $scope

    describe "#showSpinner", ->
      describe "when there is a pending request", ->
        beforeEach ->
          sinon.stub(httpRequestTracker, "hasPendingRequests").returns(true)

        it "returns true", ->
          expect($scope.showSpinner()).to.be.true

      describe "otherwise", ->
        beforeEach ->
          sinon.stub(httpRequestTracker, "hasPendingRequests").returns(false)

        it "returns false", ->
          expect($scope.showSpinner()).to.be.false

  describe "directive: agSpinner", ->
    element = null
    $scope = null

    beforeEach inject ($injector) ->
      {element, $scope} = compileTemplate """
        <ul><ag-spinner></ag-spinner></ul>
      """, $injector

    showSpinner = (show) ->
      beforeEach -> $scope.$apply -> $scope.showSpinner = -> show

    $spinner = null
    beforeEach -> $spinner = element.find("li.spinner")

    it "renders the spinner", ->
      expect($spinner.length).to.equal 1

    describe "when no requests", ->
      showSpinner false

      it "does not display the animation", ->
        expect($spinner.find("i").hasClass("spin")).to.be.false

    describe "when a request is in progress", ->
      showSpinner true

      it "displays the animation", ->
        expect($spinner.find("i").hasClass("spin")).to.be.true
