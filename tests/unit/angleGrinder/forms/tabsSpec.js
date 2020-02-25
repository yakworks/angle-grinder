import formsModule from 'angle-grinder/src/ng/forms'
import compileTemplate from '../../helpers/compileTemplate'
import _ from 'lodash'

describe("module: angleGrinder.forms tabs", function() {

  beforeEach(angular.mock.module("ng", function($provide) {
    $provide.decorator("$location", function($delegate) {
      $delegate.search = sinon.stub();
      return $delegate;
    });
  })
  );
  beforeEach(angular.mock.module(formsModule))

  beforeEach(angular.mock.module(formsModule, function($provide) {
    $provide.value("pathWithContext", path => `/ag-demo${path}`);
  }));

  describe("directive: agTabset", function() {

    let scope = null;
    let element = null;

    beforeEach(inject(function($injector) {
      let $scope;
      ({element, $scope} = compileTemplate(`\
<ag-tabset></ag-tabset>\
`, $injector));

      return scope = element.scope();
    })
    );

    it("renders tabs container", () => expect(element.find(".nav.nav-tabs")).to.have.length(1));

    describe("$scope", () => it("by default it has no tabs", function() {
      expect(scope.tabs).to.be.instanceof(Array);
      return expect(scope.tabs).to.be.empty;
    }));

    return describe("controller", function() {
      let ctrl = null;
      beforeEach(() => ctrl = element.controller("agTabset"));

      it("is defined", () => expect(ctrl).to.not.be.undefined);

      describe("#openTab", function() {
        let firstTab = null;
        let secondTab = null;

        beforeEach(inject(function($rootScope) {
          firstTab = $rootScope.$new();
          firstTab.name = "first";
          ctrl._addTab(firstTab);

          secondTab = $rootScope.$new();
          secondTab.name = "second";
          return ctrl._addTab(secondTab);
        })
        );

        describe("when the tab is not selected", () => it("opens a tab with the given name", function(done) {
          expect(firstTab.selected).to.be.true;

          inject(function($rootScope) {
            const promise = ctrl.openTab("second");

            promise.then(function(tab) {
              expect(tab).to.eq(secondTab);
              return done();
            });

            secondTab.loading = false;
            return $rootScope.$apply();
          });

          expect(firstTab.selected).to.be.false;
          return expect(secondTab.selected).to.be.true;
        }));

        describe("when the tab is already selected", () => it("returns resolved promise", done => inject(function($rootScope) {
          const promise = ctrl.openTab("first");

          promise.then(function(tab) {
            expect(tab).to.eq(firstTab);
            return done();
          });

          firstTab.loading = false;
          return $rootScope.$apply();
        })));

        return describe("when the tab cannot be found", () => it("does nothing", function(done) {
          const promise = ctrl.openTab("none");

          return inject(function($rootScope) {
            promise.finally(function() { throw new Error("should be called"); });
            $rootScope.$apply();
            return done();
          });
        }));
      });

      describe("#_addTab", function() {
        let newTab = null;
        beforeEach(inject($rootScope => newTab = $rootScope.$new())
        );

        it("add a new tab to the stack", function() {
          ctrl._addTab(newTab);
          expect(scope.tabs.length).to.eq(1);
          return expect(_.last(scope.tabs)).to.eq;
        });

        context("when the tab stack is empty", () => it("selects the first tab", function() {
          sinon.spy(ctrl, "_selectTab");
          ctrl._addTab(newTab);

          expect(ctrl._selectTab).to.have.been.calledWith(newTab);
          return expect(scope.tabs[0].selected).to.be.true;
        }));

        return context("when the tab stack is not empty", function() {
          beforeEach(inject($rootScope => ctrl._addTab($rootScope.$new()))
          );

          return it("does not select the new tab", function() {
            sinon.spy(ctrl, "_selectTab");
            ctrl._addTab(newTab);

            return expect(ctrl._selectTab).to.not.have.been.called;
          });
        });
      });

      return describe("#_selectTab", function() {
        let tabOne = null;
        let tabTwo = null;

        beforeEach(inject(function($rootScope) {
          tabOne = $rootScope.$new();
          ctrl._addTab(tabOne);

          tabTwo = $rootScope.$new();
          tabTwo.loading = true;
          return ctrl._addTab(tabTwo, true);
        })
        );

        it("marks the tab as selected", function() {
          expect(tabOne.selected).to.be.false;
          expect(tabTwo.selected).to.be.true;

          ctrl._selectTab(tabOne);

          expect(tabOne.selected).to.be.true;
          return expect(tabTwo.selected).to.be.false;
        });

        return it("disables loading spinners for the other tabs", function() {
          expect(tabTwo.loading).to.be.true;

          ctrl._selectTab(tabOne);

          expect(tabOne.loading).to.be.true;
          return expect(tabTwo.loading).to.be.false;
        });
      });
    });
  });

  return describe("directive: agTab", function() {
    let element = null;

    beforeEach(inject($location => $location.search.returns({tab: undefined}))
    );

    const findTabByTitle = function(title) {
      for (let tab of Array.from(element.find(".nav.nav-tabs li"))) {
        if ($(tab).find("a").text() === title) { return $(tab); }
      }
    };

    describe("basics", function() {

      let $scope = null;

      // mock templates for the tab panel
      beforeEach(inject($httpBackend => $httpBackend.whenGET("/ag-demo/tabs/first").respond("First"))
      );

      beforeEach(inject(function($httpBackend, $injector) {
        ({element, $scope} = compileTemplate(`\
<ag-tabset name="testTabset">
  <ag-tab name="first" template-url="/tabs/first">First</ag-tab>
  <ag-tab name="second" template-url="/tabs/second">Second</ag-tab>
  <ag-tab name="third" template-url="/tabs/third">Third</ag-tab>
</ag-tabset>\
`, $injector));

        return $httpBackend.flush();
      })
      );

      it("renders the tabs", function() {
        const firstTabEl = findTabByTitle("First");
        expect(firstTabEl.isolateScope().selected).to.be.true;
        expect(firstTabEl.hasClass("active")).to.be.true;

        const secondTabEl = findTabByTitle("Second");
        expect(secondTabEl.isolateScope().selected).to.be.false;
        return expect(secondTabEl.hasClass("active")).to.be.false;
      });

      it("creates clickable titles", function() {
        const titlesEl = element.find(".nav.nav-tabs li");
        expect(titlesEl).to.have.length(3);

        expect(titlesEl.find("a").eq(0).text()).to.eq("First");
        expect(titlesEl.find("a").eq(1).text()).to.eq("Second");
        return expect(titlesEl.find("a").eq(2).text()).to.eq("Third");
      });

      it("by default displays the first tab content", () => expect(element.find(".tab").text()).to.include("First"));

      it("exposes API to the scope", () => expect($scope.testTabset).to.not.be.undefined);

      return describe("on click on the nav tab", function() {
        let tabEl = null;

        context("when the tab is not selected", function() {

          beforeEach(inject(function($httpBackend) {
            $httpBackend.whenGET("/ag-demo/tabs/second").respond("Second");

            tabEl = findTabByTitle("Second");
            return tabEl.find("a").click();
          })
          );

          it("displays loading spinners", inject(function($httpBackend) {
            // ...should show the spinner when the template loading is in progress
            expect(tabEl.isolateScope().loading).to.be.true;
            expect(element.scope().contentLoading).to.be.true;

            // ...loading is finished
            $httpBackend.flush();

            // ...should hide the spinners
            expect(tabEl.isolateScope().loading).to.be.false;
            return expect(element.scope().contentLoading).to.be.false;
          })
          );

          it("changes the active tab", inject(function($httpBackend) {
            $httpBackend.flush();
            expect(tabEl.isolateScope().selected).to.be.true;
            return expect(tabEl.hasClass("active")).to.be.true;
          })
          );

          it("loads the content for the activated tab", inject(function($httpBackend) {
            $httpBackend.flush();
            return expect(element.find(".tab").text()).to.include("Second");
          })
          );

          return it("changes the url", inject(function($httpBackend, $location) {
            $httpBackend.flush();

            expect($location.search.called).to.be.true;
            return expect($location.search.calledWith("tab", "second")).to.be.true;
          })
          );
        });

        context("when the tab is already selected", function() {
          beforeEach(function() {
            tabEl = findTabByTitle("First");
            return tabEl.find("a").click();
          });

          return it("does nothing", inject($httpBackend => $httpBackend.verifyNoOutstandingRequest())
          );
        });

        return describe("On $location tab change", function() {

          it("sets tab as active", inject(function($rootScope, $location, $httpBackend) {
            $location.search.returns({tab: "third"});
            $httpBackend.whenGET("/ag-demo/tabs/third").respond("Second");
            $rootScope.$apply();
            $httpBackend.flush();

            const thirdTabEl = findTabByTitle("Third");
            expect(thirdTabEl.isolateScope().name).to.be.eq("third");
            expect(thirdTabEl.isolateScope().selected).to.be.true;
            return expect(thirdTabEl.hasClass("active")).to.be.true;
          })
          );

          return it("does nothing if wrong tab name", inject(function($rootScope, $location) {
            $location.search.returns({tab: "xxx"});
            $rootScope.$apply();

            const thirdTabEl = findTabByTitle("First");
            expect(thirdTabEl.isolateScope().name).to.be.eq("first");
            expect(thirdTabEl.isolateScope().selected).to.be.true;
            return expect(thirdTabEl.hasClass("active")).to.be.true;
          })
          );
        });
      });
    });


    return describe("with initial active tab", function() {

      beforeEach(inject($location => $location.search.returns({tab: "second"}))
      );

      beforeEach(inject(function($httpBackend, $injector) {
        let $scope;
        $httpBackend.whenGET("/ag-demo/tabs/second").respond("Second");

        ({element, $scope} = compileTemplate(`\
<ag-tabset>
  <ag-tab name="first" template-url="/tabs/first">First</ag-tab>
  <ag-tab name="second" template-url="/tabs/second">Second</ag-tab>
  <ag-tab name="third" template-url="/tabs/third">Third</ag-tab>
</ag-tabset>\
`, $injector));

        return $httpBackend.flush();
      })
      );

      it("sets the tab as active", function() {
        const tabEl = findTabByTitle("Second");
        expect(tabEl.isolateScope().selected).to.be.true;
        return expect(tabEl.hasClass("active")).to.be.true;
      });

      return it("loads the content for the activated tab", () => expect(element.find(".tab").text()).to.include("Second"));
    });
  });
});
