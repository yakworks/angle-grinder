/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.gridz", function() {

  describe("xls export", function() {

    beforeEach(module("angleGrinder.gridz", ($provide) => $provide.decorator("xlsData", function($delegate) {
      sinon.spy($delegate);
      return $delegate;
    }))
    );

    describe("service: xlsTemplate", () => it("generates valid xml with the worksheet", inject(function($window, xlsTemplate) {
      console.log("1111111111111111111111111111")
      const data = xlsTemplate({table: "the table"});
        console.log("21111111111111111111111111111")
      expect(data).to.be.a("string");
        console.log("31111111111111111111111111111")
      const xml = $window.atob(data);
        console.log("41111111111111111111111111111")
      return expect(xml).to.be.a("string");
    })
    ));

    return describe("service: xlsData", function() {

      before(function() {
        this.gridId = "usersGrid";
        return this.selectedRows = ["4", "5", "6"];});

      beforeEach(module("tests/unit/fixtures/usersGrid.html"));

      beforeEach(module("ng", ($provide) => $provide.decorator("$document", function($delegate, $templateCache) {
        const stub = sinon.stub($delegate, "find");

        // stub the grid html
        const fixture = $templateCache.get("tests/unit/fixtures/usersGrid.html");
        stub.withArgs("div#gbox_usersGrid").returns(angular.element(fixture));

        return $delegate;
      }))
      );

      const decodeXls = function(data) {
        let el = null;
        inject(function($window) {
          const decoded = $window.atob(data.match(/^data:application\/vnd\.ms-excel;base64,(.*)/)[1]);
          return el = angular.element($(decoded)[3]);
        });
        return el;
      };

      it("generates valid xls file heading", inject(function(xlsData) {
        const el = decodeXls(xlsData(this.gridId, this.selectedRows));

        expect(el.find("thead th:nth-child(1)").text()).to.contain("id");
        expect(el.find("thead th:nth-child(2)").text()).to.contain("Login");
        expect(el.find("thead th:nth-child(3)").text()).to.contain("Email");
        expect(el.find("thead th:nth-child(4)").text()).to.contain("Name");
        expect(el.find("thead th:nth-child(5)").text()).to.contain("Birthday");
        expect(el.find("thead th:nth-child(6)").text()).to.contain("Allowance");
        return expect(el.find("thead th:nth-child(7)").text()).to.contain("Paid");
      })
      );

      it("generates valid xls file contend", inject(function(xlsData) {
        const el = decodeXls(xlsData(this.gridId, this.selectedRows));

        const rowEl = el.find("tbody tr:first");
        expect(rowEl.find("td:nth-child(1)").text()).to.contain("4");
        expect(rowEl.find("td:nth-child(2)").text()).to.contain("login-4");
        expect(rowEl.find("td:nth-child(3)").text()).to.contain("login-4@Mayer.name");
        expect(rowEl.find("td:nth-child(4)").text()).to.contain("Ether");
        expect(rowEl.find("td:nth-child(5)").text()).to.contain("Oct 30");
        expect(rowEl.find("td:nth-child(5)").text()).to.contain("2010");
        expect(rowEl.find("td:nth-child(6)").text()).to.contain("42");
        return expect(rowEl.find("td:nth-child(7)").text()).to.contain("true");
      })
      );

      it("generates valid data uri", inject(function(xlsData) {
        const data = xlsData(this.gridId, this.selectedRows);
        return expect(data).to.match(/^\bdata:application\/vnd\.ms-excel;base64\b/);
      })
      );

      context("when some rows are selected", function() {
        before(function() { return this.selectedRows = ["5", "2", "4"]; });

        return it("exports only selected rows", inject(function(xlsData) {
          const el = decodeXls(xlsData(this.gridId, this.selectedRows));
          expect(el.find("tbody tr")).to.have.length(3);

          const rowEl = el.find("tbody tr:first");
          return expect(rowEl.find("td:nth-child(1)").text()).to.contain("2");
        })
        );
      });

      return context("when none is selected", function() {
        before(function() { return this.selectedRows = []; });

        return it("exports all rows", inject(function(xlsData) {
          const el = decodeXls(xlsData(this.gridId, this.selectedRows));
          expect(el.find("tbody tr")).to.have.length(10);

          const rowEl = el.find("tbody tr:first");
          return expect(rowEl.find("td:nth-child(1)").text()).to.contain("1");
        })
        );
      });
    });
  });

  return describe("directive: agGridXlsExport", function() {

// mock `$window.location.href` in order to avoid
// "Some of your tests did a full page reload!"
// mock `$window.navigator.userAgent` to avoid error
// "'undefined' is not an object (evaluating '$window.navigator.userAgent')"
    beforeEach(module("angleGrinder.gridz", function($provide) {
      $provide.value("$window", {
        location: {},
        navigator: {userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36'}
      });

      $provide.decorator("NotificationDialogServ", function($delegate) {
        sinon.spy($delegate, "open");
        return $delegate;
      });

    })
    );

    beforeEach(module("angleGrinder.gridz"));

    let selectedRowIds = null;
    let element = null;

    beforeEach(inject(function($injector, $rootScope) {
      let $scope = $rootScope.$new();

      // stub the grid instance
      $scope.$grid = {
        getXlsDataUri() { return "foo"; },
        getSelectedRowIds() { return selectedRowIds; }
      };

      return ({element, $scope} = compileTemplate(`\
  <a href="" ag-grid-xls-export>
  <i class="fa-download"></i> Export to XLS
</a>\
`, $injector, $scope));
    })
    );

    it("has $grid on scope");

    return describe("on click", () => describe("when no rows are selected", function() {
      before(() => selectedRowIds = []);

      return it("displays the notification", inject(function(NotificationDialogServ) {
// When
        element.click();

        // Then
        expect(NotificationDialogServ.open).to.be.called;
        return expect(NotificationDialogServ.open).to.be.calledWith("Please select at least one row.");
      })
      );
    }));
  });
});

/* describe "when at least one row is selected", ->
   before -> selectedRowIds = [1]

   it "does the magic", inject ($window) ->
     * When
     element.click()

     * Then
     expect(document.getElementsByTagName("a")[0].href).to.eq "foo"

   it "does not display notification", inject (NotificationDialogServ) ->
     * When
     element.click()

     * Then
     expect(NotificationDialogServ.open).to.not.be.called
*/
