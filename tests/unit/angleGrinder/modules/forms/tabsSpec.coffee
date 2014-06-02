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

      describe "#addTab", ->
        newTab = null
        beforeEach inject ($rootScope) ->
          newTab = $rootScope.$new()

        it "add a new tab to the stack", ->
          ctrl.addTab(newTab)
          expect(scope.tabs.length).to.eq 1
          expect(_.last(scope.tabs)).to.eq

        context "when the tab stack is empty", ->

          it "selects the first tab", ->
            sinon.spy(ctrl, "selectTab")
            ctrl.addTab(newTab)

            expect(ctrl.selectTab).to.have.been.calledWith(newTab)
            expect(scope.tabs[0].selected).to.be.true

        context "when the tab stack is not empty", ->
          beforeEach inject ($rootScope) ->
            ctrl.addTab($rootScope.$new())

          it "does not select the new tab", ->
            sinon.spy(ctrl, "selectTab")
            ctrl.addTab(newTab)

            expect(ctrl.selectTab).to.not.have.been.called

      describe "#selectTab", ->
        tabOne = null
        tabTwo = null

        beforeEach inject ($rootScope) ->
          tabOne = $rootScope.$new()
          ctrl.addTab(tabOne)

          tabTwo = $rootScope.$new()
          tabTwo.loading = true
          ctrl.addTab(tabTwo)

        it "marks the tab as selected", ->
          expect(tabOne.selected).to.be.true
          expect(tabTwo.selected).to.be.undefined

          ctrl.selectTab(tabTwo)

          expect(tabOne.selected).to.be.false
          expect(tabTwo.selected).to.be.true

        it "disables loading spinners for the other tabs", ->
          expect(tabTwo.loading).to.be.true

          ctrl.selectTab(tabOne)

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

      # mock templates for the tab panel
      beforeEach inject ($httpBackend) ->
        $httpBackend.whenGET("/ag-demo/tabs/first").respond "First"

      beforeEach inject ($httpBackend, $injector) ->
        {element, $scope} = compileTemplate """
          <ag-tabset>
            <ag-tab template-url="/tabs/first">First</ag-tab>
            <ag-tab name="second" template-url="/tabs/second">Second</ag-tab>
            <ag-tab template-url="/tabs/third">Third</ag-tab>
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

    describe "with initial active tab", ->

      beforeEach inject ($location) ->
        $location.search.returns(tab: "second")

      beforeEach inject ($httpBackend, $injector) ->
        $httpBackend.whenGET("/ag-demo/tabs/second").respond "Second"

        {element, $scope} = compileTemplate """
          <ag-tabset>
            <ag-tab name="first" template-url="/tabs/first">First</ag-tab>
            <ag-tab name="second" active="true" template-url="/tabs/second">Second</ag-tab>
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
