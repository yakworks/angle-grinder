/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.common", function() {

  beforeEach(module("angleGrinder.common", function($provide) {
    // dummy filter witch always returns falsy values
    $provide.service("dummyFilter", () => () => null);
  })
  );

  return describe("directive: agSelectBind", function() {

    let $scope = null;
    let element = null;

    const setValue = function(id) {
      const objects = [{
        id: 1,
        name:"first"
      }
      , {
        id: 2,
        name: "second"
      }
      ];
      $scope.test = {objects};
      $scope.selected ={id};
      return $scope.$digest();
    };

    const getValue = () => element.text();

    const compileTemplate = function(tpl) {
      element = angular.element(tpl);
      inject($compile => $compile(element)($scope));
      return $scope.$digest();
    };

    beforeEach(inject(function($rootScope) {
      $scope = $rootScope.$new();

      return compileTemplate(`\
<span  ag-select-bind="selected.id"
       ag-select-bind-for="test.objects"
       ag-select-bind-field="name">-- none --</span>\
`
      );
    })
    );

    describe("when the value is defined", function() {

      beforeEach(() => setValue(1));

      return it("displays the name of the selected value", () => expect(getValue()).to.eq("first"));
    });

    return describe("when the value is not defined", function() {

      beforeEach(() => setValue(undefined));

      it("displays the default value", () => expect(getValue()).to.eq("-- none --"));

      return describe("when the default value is not given", function() {

        beforeEach(() => compileTemplate(`\
<span  ag-select-bind="id"
  ag-select-bind-for="objects"
  ag-select-bind-field="name"></span>\
`
        ));

        return it("uses default placeholder", () => expect(getValue()).to.match(/\s*/));
      });
    });
  });
});