describe "module: angleGrinder.forms tabs", ->

  beforeEach module "ng", ($provide) ->
    $provide.decorator "$location", ($delegate) ->
      $delegate.search = sinon.stub()
      $delegate
    return

  beforeEach module "angleGrinder.common", ($provide) ->
    $provide.value "pathWithContext", (path) -> "/ag-demo#{path}"
    return

  beforeEach module "angleGrinder.forms"

  describe "directive: agTabset", ->

    scope = null
    element = null

    beforeEach inject ($injector) ->
      {element, $scope} = compileTemplate """
        <ag-tabset></ag-tabset>
      """, $injector

      scope = element.scope()

    it "renders tabs container", ->
      expect(element.hasClass("container")).to.be.true
      expect(element.find(".nav.nav-tabs")).to.have.length 1
      expect(element.find(".container")).to.have.length 1

    describe "$scope", ->

      it "by default it has no tabs", ->
        expect(scope.tabs).to.be.instanceof Array
        expect(scope.tabs).to.be.empty

    describe "controller", ->
      ctrl = null
      beforeEach -> ctrl = element.controller("agTabset")

      it "is defined", ->
        expect(ctrl).to.not.be.undefined

      describe "#openTab", ->
        firstTab = null
        secondTab = null

        beforeEach inject ($rootScope) ->
          firstTab = $rootScope.$new()
          firstTab.name = "first"
          ctrl._addTab(firstTab)

          secondTab = $rootScope.$new()
          secondTab.name = "second"
          ctrl._addTab(secondTab)

        describe "when the tab is not selected", ->

          it "opens a tab with the given name", (done) ->
            expect(firstTab.selected).to.be.true

            inject ($rootScope) ->
              promise = ctrl.openTab("second")

              promise.then (tab) ->
                expect(tab).to.eq secondTab
                done()

              secondTab.loading = false
              $rootScope.$apply()

            expect(firstTab.selected).to.be.false
            expect(secondTab.selected).to.be.true

        describe "when the tab is already selected", ->

          it "returns resolved promise", (done) ->
            inject ($rootScope) ->
              promise = ctrl.openTab("first")

              promise.then (tab) ->
                expect(tab).to.eq firstTab
                done()

              firstTab.loading = false
              $rootScope.$apply()

        describe "when the tab cannot be found", ->

          it "does nothing", (done) ->
            promise = ctrl.openTab("none")

            inject ($rootScope) ->
              promise.finally -> throw new Error("should be called")
              $rootScope.$apply()
              done()

      describe "#_addTab", ->
        newTab = null
        beforeEach inject ($rootScope) ->
          newTab = $rootScope.$new()

        it "add a new tab to the stack", ->
          ctrl._addTab(newTab)
          expect(scope.tabs.length).to.eq 1
          expect(_.last(scope.tabs)).to.eq

        context "when the tab stack is empty", ->

          it "selects the first tab", ->
            sinon.spy(ctrl, "_selectTab")
            ctrl._addTab(newTab)

            expect(ctrl._selectTab).to.have.been.calledWith(newTab)
            expect(scope.tabs[0].selected).to.be.true

        context "when the tab stack is not empty", ->
          beforeEach inject ($rootScope) ->
            ctrl._addTab($rootScope.$new())

          it "does not select the new tab", ->
            sinon.spy(ctrl, "_selectTab")
            ctrl._addTab(newTab)

            expect(ctrl._selectTab).to.not.have.been.called

      describe "#_selectTab", ->
        tabOne = null
        tabTwo = null

        beforeEach inject ($rootScope) ->
          tabOne = $rootScope.$new()
          ctrl._addTab(tabOne)

          tabTwo = $rootScope.$new()
          tabTwo.loading = true
          ctrl._addTab(tabTwo, true)

        it "marks the tab as selected", ->
          expect(tabOne.selected).to.be.false
          expect(tabTwo.selected).to.be.true

          ctrl._selectTab(tabOne)

          expect(tabOne.selected).to.be.true
          expect(tabTwo.selected).to.be.false

        it "disables loading spinners for the other tabs", ->
          expect(tabTwo.loading).to.be.true

          ctrl._selectTab(tabOne)

          expect(tabOne.loading).to.be.true
          expect(tabTwo.loading).to.be.false

  describe "directive: agTab", ->
    element = null

    beforeEach inject ($location) ->
      $location.search.returns(tab: undefined)

    findTabByTitle = (title) ->
      for tab in element.find(".nav.nav-tabs li")
        return $(tab) if $(tab).find("a").text() is title

    describe "basics", ->

      $scope = null

      # mock templates for the tab panel
      beforeEach inject ($httpBackend) ->
        $httpBackend.whenGET("/ag-demo/tabs/first").respond "First"

      beforeEach inject ($httpBackend, $injector) ->
        {element, $scope} = compileTemplate """
          <ag-tabset name="testTabset">
            <ag-tab name="first" template-url="/tabs/first">First</ag-tab>
            <ag-tab name="second" template-url="/tabs/second">Second</ag-tab>
            <ag-tab name="third" template-url="/tabs/third">Third</ag-tab>
          </ag-tabset>
        """, $injector

        $httpBackend.flush()

      it "renders the tabs", ->
        firstTabEl = findTabByTitle("First")
        expect(firstTabEl.isolateScope().selected).to.be.true
        expect(firstTabEl.hasClass("active")).to.be.true

        secondTabEl = findTabByTitle("Second")
        expect(secondTabEl.isolateScope().selected).to.be.false
        expect(secondTabEl.hasClass("active")).to.be.false

      it "creates clickable titles", ->
        titlesEl = element.find(".nav.nav-tabs li")
        expect(titlesEl).to.have.length(3)

        expect(titlesEl.find("a").eq(0).text()).to.eq "First"
        expect(titlesEl.find("a").eq(1).text()).to.eq "Second"
        expect(titlesEl.find("a").eq(2).text()).to.eq "Third"

      it "by default displays the first tab content", ->
        expect(element.find(".tab.container").text()).to.include "First"

      it "exposes API to the scope", ->
        expect($scope.testTabset).to.not.be.undefined

      describe "on click on the nav tab", ->
        tabEl = null

        context "when the tab is not selected", ->

          beforeEach inject ($httpBackend) ->
            $httpBackend.whenGET("/ag-demo/tabs/second").respond "Second"

            tabEl = findTabByTitle("Second")
            tabEl.find("a").click()

          it "displays loading spinners", inject ($httpBackend) ->
            # ...should show the spinner when the template loading is in progress
            expect(tabEl.isolateScope().loading).to.be.true
            expect(element.scope().contentLoading).to.be.true

            # ...loading is finished
            $httpBackend.flush()

            # ...should hide the spinners
            expect(tabEl.isolateScope().loading).to.be.false
            expect(element.scope().contentLoading).to.be.false

          it "changes the active tab", inject ($httpBackend) ->
            $httpBackend.flush()
            expect(tabEl.isolateScope().selected).to.be.true
            expect(tabEl.hasClass("active")).to.be.true

          it "loads the content for the activated tab", inject ($httpBackend) ->
            $httpBackend.flush()
            expect(element.find(".tab.container").text()).to.include "Second"

          it "changes the url", inject ($httpBackend, $location) ->
            $httpBackend.flush()

            expect($location.search.called).to.be.true
            expect($location.search.calledWith("tab", "second")).to.be.true

        context "when the tab is already selected", ->
          beforeEach ->
            tabEl = findTabByTitle("First")
            tabEl.find("a").click()

          it "does nothing", inject ($httpBackend) ->
            $httpBackend.verifyNoOutstandingRequest()

        describe "On $location tab change", ->

          it "sets tab as active", inject ($rootScope, $location, $httpBackend) ->
            $location.search.returns(tab: "third")
            $httpBackend.whenGET("/ag-demo/tabs/third").respond "Second"
            $rootScope.$apply()
            $httpBackend.flush()

            thirdTabEl = findTabByTitle("Third")
            expect(thirdTabEl.isolateScope().name).to.be.eq "third"
            expect(thirdTabEl.isolateScope().selected).to.be.true
            expect(thirdTabEl.hasClass("active")).to.be.true

          it "does nothing if wrong tab name", inject ($rootScope, $location) ->
            $location.search.returns(tab: "xxx")
            $rootScope.$apply()

            thirdTabEl = findTabByTitle("First")
            expect(thirdTabEl.isolateScope().name).to.be.eq "first"
            expect(thirdTabEl.isolateScope().selected).to.be.true
            expect(thirdTabEl.hasClass("active")).to.be.true


    describe "with initial active tab", ->

      beforeEach inject ($location) ->
        $location.search.returns(tab: "second")

      beforeEach inject ($httpBackend, $injector) ->
        $httpBackend.whenGET("/ag-demo/tabs/second").respond "Second"

        {element, $scope} = compileTemplate """
          <ag-tabset>
            <ag-tab name="first" template-url="/tabs/first">First</ag-tab>
            <ag-tab name="second" template-url="/tabs/second">Second</ag-tab>
            <ag-tab name="third" template-url="/tabs/third">Third</ag-tab>
          </ag-tabset>
        """, $injector

        $httpBackend.flush()

      it "sets the tab as active", ->
        tabEl = findTabByTitle("Second")
        expect(tabEl.isolateScope().selected).to.be.true
        expect(tabEl.hasClass("active")).to.be.true

      it "loads the content for the activated tab", ->
        expect(element.find(".tab.container").text()).to.include "Second"
