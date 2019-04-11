describe "module: angleGrinder.forms mixin: PanelFormMixin", ->

  beforeEach module "angleGrinder.forms"

  describe "service: PanelFormMixin", ->

    it "is defined", inject (PanelFormMixin) ->
      expect(PanelFormMixin).not.to.be.undefined
      expect(PanelFormMixin).to.be.a("function")

    $scope = null

    beforeEach inject ($rootScope, PanelFormMixin) ->
      $scope = $rootScope.$new()

      PanelFormMixin $scope,
        formName: "theForm"

    itIsMixedToTheScope = (name) ->
      it "is mixed to the $scope", ->
        expect($scope[name]).to.not.be.undefined
        expect($scope[name]).to.be.a("function")

    describe "#showForm", ->

      it "initially is set to `false`", ->
        expect($scope.showForm).to.be.false

    describe "#toggle()", ->
      itIsMixedToTheScope "toggle"

      it "toggles form visibility", ->
        $scope.toggle()
        expect($scope.showForm).to.be.true

        $scope.toggle()
        expect($scope.showForm).to.be.false

    describe "#update()", ->
      itIsMixedToTheScope "update"

      beforeEach -> $scope.showForm = true

      describe "when the form is valid", ->
        beforeEach inject (formMock) ->
          $scope.theForm = formMock().$setValidity(true)
          $scope.update()

        it "closes the form", ->
          expect($scope.showForm).to.be.false

      describe "when the form is not valid", ->
        beforeEach inject (formMock) ->
          $scope.theForm = formMock().$setValidity(false)
          $scope.update()

        it "does not close the form", ->
          expect($scope.showForm).to.be.true
