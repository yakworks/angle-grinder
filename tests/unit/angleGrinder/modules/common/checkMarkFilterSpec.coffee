describe "module: angleGrinder.common", ->

  beforeEach module "angleGrinder.common"

  describe "filter: checkMark", ->

    checkMarkFilter = null
    beforeEach inject ($filter) ->
      checkMarkFilter = $filter("checkMark")

    it "is defined", ->
      expect(checkMarkFilter).to.be.a "function"

    context "when the input evaluated to `true`", ->

      it "presents ✓", ->
        expect(checkMarkFilter(true)).to.eq "✓"
        expect(checkMarkFilter("this is true")).to.eq "✓"

      context "and `hideTruth` is set to true", ->

        it "presents nothing", ->
          expect(checkMarkFilter(true, hideTruth: true)).to.be.eq ""
          expect(checkMarkFilter("this is true", hideTruth: true)).to.be.eq ""

    context "when the input evaluated to `false`", ->

      it "presents ✘", ->
        expect(checkMarkFilter(false)).to.eq "✘"
        expect(checkMarkFilter(null)).to.eq "✘"
        expect(checkMarkFilter(undefined)).to.eq "✘"
        expect(checkMarkFilter(0)).to.eq "✘"

      context "and `hideFalse` is set to true", ->

        it "presents nothing", ->
          expect(checkMarkFilter(false, hideFalse: true)).to.be.eq ""
          expect(checkMarkFilter(null, hideFalse: true)).to.be.eq ""

    describe "usage in html templates", ->

      active = null

      $scope = null
      element = null

      template = null
      before -> template = "<div>active: {{user.active | checkMark}}</div>"

      beforeEach inject ($rootScope, $compile) ->
        $scope = $rootScope.$new()
        $scope.user = active: active

        element = $compile(template)($scope)
        $scope.$apply()

      context "on `true`", ->
        before -> active = true

        it "displays tick", ->
          expect(element.text()).to.eq "active: ✓"

        context "when hide truth is requested", ->
          before -> template = "<div>active: {{ user.active | checkMark:{ hideTruth: true } }}</div>"

          it "displays nothing", ->
            expect(element.text()).to.eq "active: "

      context "on `false`", ->
        before -> active = false

        it "displays cross", ->
          expect(element.text()).to.eq "active: ✘"

        context "when hide false is requested", ->
          before -> template = "<div>active: {{ user.active | checkMark:{ hideFalse: true } }}</div>"

          it "displays nothing", ->
            expect(element.text()).to.eq "active: "
