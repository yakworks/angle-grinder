/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.gridz", function() {
  beforeEach(angular.mock.module("angleGrinder.gridz"));

  describe("service: hasSearchFilters", function() {
    let hasSearchFilters = null;
    beforeEach(inject(_hasSearchFilters_ => hasSearchFilters = _hasSearchFilters_));

    describe("if filters contain at least one non-empty field", function() {
      const filters = {foo: "  ", bar: "test", biz: null};

      return it("returns true", () => expect(hasSearchFilters(filters)).to.be.true);
    });

    describe("if filters contain an array", function() {
      const filters = {select2Stuff: [{foo: "bar"}], bar: null};

      return it("returns true", () => expect(hasSearchFilters(filters)).to.be.true);
    });

    describe("if filters contain other complex object", function() {
      const filters = {date: new Date()};

      return it("returns true", () => expect(hasSearchFilters(filters)).to.be.true);
    });

    return describe("if all filters are empty", function() {
      const filters = {foo: "  ", bar: "", biz: null, baz: undefined};

      return it("returns false", () => expect(hasSearchFilters(filters)).to.be.false);
    });
  });

  describe("directive: agSearchButton", function() {
    let $scope = null;
    let element = null;

    beforeEach(inject($injector => ({element, $scope} = compileTemplate(`\
<ag-search-button></ag-search-button>\
`, $injector)))
    );

    it("renders the button", function() {
      expect(element.is("button[type=submit]")).to.be.true;
      expect(element.hasClass("btn")).to.be.true;
      return expect(element.text()).to.contain("Search");
    });

    it("is enabled", () => expect(element.hasClass("disabled")).to.be.false);

    describe("when the search request is in progress", function() {
      beforeEach(() => $scope.$apply(() => $scope.searching = true));

      it("is disabled", () => expect(element.is(":disabled")).to.be.true);

      return it("changes the button label", () => expect(element.text()).to.contain("Search..."));
    });

    return describe("on click", function() {
      beforeEach(function() {
        $scope.filters = {name: "find it"};
        return $scope.advancedSearch = sinon.spy();
      });

      return it("calls #advancedSearch with valid params", function() {
        // When
        element.click();

        // Then
        expect($scope.advancedSearch).to.have.been.called;
        return expect($scope.advancedSearch).to.have.been.calledWith({name: "find it"});
      });
    });
  });

  describe("directive: agResetSearchButton", function() {
    let $scope = null;
    let element = null;

    beforeEach(inject($injector => ({element, $scope} = compileTemplate(`\
<ag-reset-search-button></ag-reset-search-button>\
`, $injector)))
    );

    it("renders the button", function() {
      expect(element.is("button[type=button]")).to.be.true;
      expect(element.hasClass("btn")).to.be.true;
      return expect(element.text()).to.contain("Reset");
    });

    it("is enabled", () => expect(element.hasClass("disabled")).to.be.false);

    describe("when the search request is in progress", function() {
      beforeEach(() => $scope.$apply(() => $scope.searching = true));

      it("is disabled", () => expect(element.is(":disabled")).to.be.true);

      return it("changes the button label", () => expect(element.text()).to.contain("Reset..."));
    });

    return describe("on click", function() {
      beforeEach(() => $scope.resetSearch = function() {});

      return it("calls #resetSearch", function() {
        // Given
        sinon.spy($scope, "resetSearch");

        // When
        element.click();

        // Then
        return expect($scope.resetSearch).to.have.been.called;
      });
    });
  });

  return describe("directive: agSearchForm", function() {
    let $scope = null;
    let element = null;

    beforeEach(inject(function($rootScope, $injector) {
      $scope = $rootScope.$new();

      // stub the grid controller
      const gridCtrl = {search: sinon.stub()};
      gridCtrl.search.returns({finally() {}});

      $scope.grid = {users: gridCtrl};

      return ({element} = compileTemplate(`\
<form name="searchForm" ag-search-form="grid.users">
  <input type="text" name="name" ng-model="filters.name" />

  <ag-search-button id="search"></ag-search-button>
  <ag-reset-search-button id="reset"></ag-reset-search-button>
</form>\
`, $injector, $scope));
    })
    );

    describe("on submit button click", function() {
      let searchButtonEl = null;

      beforeEach(function() {
        const directiveScope = element.scope();
        searchButtonEl = element.find("button[type=submit]");

        return $scope.$apply(() => directiveScope.searchForm.name.$setViewValue("find me"));
      });

      it("calls #advancedSearch", function() {
        // When
        searchButtonEl.click();

        // Then
        expect($scope.grid.users.search).to.have.been.called;
        return expect($scope.grid.users.search).to.have.been.calledWith({name: "find me"});
      });

      return it("disables the submit button", function() {
        // When
        searchButtonEl.click();

        // Then
        return expect(searchButtonEl.is(":disabled")).to.be.true;
      });
    });

    return describe("on reset button click", function() {
      let resetButtonEl = null;

      beforeEach(() => resetButtonEl = element.find("button#reset"));

      it("calls #resetSearch", function() {
        // When
        resetButtonEl.click();

        // Then
        expect($scope.grid.users.search).to.have.been.called;
        return expect($scope.grid.users.search).to.have.been.calledWith({});
      });

      it("disables the reset button", function() {
        // When
        resetButtonEl.click();

        // Then
        return expect(resetButtonEl.is(":disabled")).to.be.true;
      });

      return describe("when default filters are given", function() {

        beforeEach(function() {
          const scope = element.scope();
          return scope.defaultFilters = { foo: "bar" };});

        return it("calls #resetSearch with default filters", function() {
          // When
          resetButtonEl.click();

          // Then
          expect($scope.grid.users.search).to.have.been.called;
          return expect($scope.grid.users.search).to.have.been.calledWith({foo: "bar"});
        });
      });
    });
  });
});
