describe "module: angleGrinder.forms", ->

  beforeEach module "angleGrinder.forms"

  describe "service: focus", ->

    it "is defined", inject (focus) ->
      expect(focus).to.not.be.undefined
      expect(focus).to.be.a "function"

    it "broadcasts `focusOn` event with the field name", inject ($rootScope, $timeout, focus) ->
      # Given
      sinon.spy($rootScope, "$broadcast")

      # When
      focus("theField")
      $timeout.flush()

      # Then
      expect($rootScope.$broadcast).to.have.been.calledWith("focusOn", "theField")

  describe "directive: agFocus", ->

    element = null

    beforeEach inject ($injector) ->
      {element, $scope} = compileTemplate """
        <form name="theForm">
          <input type="text" ag-focus="theInput" />
        </form>
      """, $injector

    describe "when the focus was requested", ->

      input = null
      beforeEach -> input = element.find("input")

      focus = (name) ->
        beforeEach inject ($rootScope) -> $rootScope.$broadcast "focusOn", name

      context "on the same field", ->
        focus "theInput"

        it "sets the focus on the element", ->
          expect(input.hasClass("ag-focused")).to.be.true

      context "when the focus was requested on the other field", ->
        focus "theOtherField"

        it "does not set the focus", ->
          expect(input.hasClass("ag-focused")).to.be.false
