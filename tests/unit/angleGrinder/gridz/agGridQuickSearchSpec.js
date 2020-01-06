/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.gridz", function() {

  beforeEach(module("angleGrinder.gridz"));

  return describe("directive: agGridQuickSearch", function() {

    let $scope = null;
    let element = null;

    beforeEach(inject(function($rootScope) {
      $scope = $rootScope.$new();

      $scope.grid = {customers: {search: sinon.stub()}};
      return $scope.filters = {foo: "bar"};
    })
    );

    describe("when external `filters` are given", function() {

      beforeEach(inject(function($compile) {
        element = angular.element(`\
<ag-grid-quick-search for="grid.customers" filters="filters"></ag-grid-quick-search>\
`
        );

        $compile(element)($scope);
        return $scope.$digest();
      })
      );

      it("initially has empty `quickSearch` filter", function() {
        expect($scope.filters.quickSearch).to.eq("");
        return expect($scope.filters.foo).to.eq("bar");
      });

      return it("tigers search", function() {
        // Given
        const quickSearch = function(value) {
          $scope.filters.quickSearch = value;

          const inputEl = element.find("form[name=quickSearch]").find("input");
          return inputEl.triggerHandler({
            type: 'keydown',
            which: 13
          });
        };

        // When
        quickSearch("name");

        // Then
        expect($scope.grid.customers.search.called).to.be.true;
        expect($scope.grid.customers.search.calledWith({foo: "bar", quickSearch: "name"})).to.be.true;

        quickSearch("");
        return expect($scope.grid.customers.search.calledWith({foo: "bar", quickSearch: ""})).to.be.true;
      });
    });

    return describe("when external `filters` are not given", function() {

      beforeEach(inject(function($compile) {
        element = angular.element(`\
<ag-grid-quick-search for="grid.customers"></ag-grid-quick-search>\
`
        );

        $compile(element)($scope);
        return $scope.$digest();
      })
      );

      it("initially has empty `quickSearch` filter", function() {
        expect(element.isolateScope().filters.quickSearch).to.eq("");
        return expect($scope.filters.foo).to.eq("bar");
      });

      return it("trigers search", function() {
        // Given
        const quickSearch = function(value) {
          const scope = element.isolateScope();
          scope.filters.quickSearch = value;

          const inputEl = element.find("form[name=quickSearch]").find("input");
          return inputEl.triggerHandler({
            type: 'keydown',
            which: 13
          });
        };

        // When
        quickSearch("name");

        // Then
        expect($scope.grid.customers.search.called).to.be.true;
        expect($scope.grid.customers.search.calledWith({quickSearch: "name"})).to.be.true;

        quickSearch("");
        return expect($scope.grid.customers.search.calledWith({quickSearch: ""})).to.be.true;
      });
    });
  });
});
