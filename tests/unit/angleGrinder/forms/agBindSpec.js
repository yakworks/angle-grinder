import formsModule from '~/scripts/forms'

describe("agBindSpec", function() {

  beforeEach(angular.mock.module(formsModule, function ($provide) {
      // dummy filter witch always returns falsy values
      $provide.value("dummyFilter", () => {
        return null
      });
    })
  );

  return describe("directive: agBind", function() {

    let $scope = null;
    let element = null;

    const setValue = function(value) {
      $scope.item = { value };
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
<span ag-bind="item.value">-- none --</span>\
`
      );
    })
    );

    describe("when the value is defined", function() {

      beforeEach(() => setValue("luke"));

      return it("displays the value", () => expect(getValue()).to.eq("luke"));
    });

    describe("when the value is not defined", function() {

      beforeEach(() => setValue(undefined));

      it("displays the default value", () => expect(getValue()).to.eq("-- none --"));

      return describe("when the default value is not given", function() {

        beforeEach(() => compileTemplate(`\
<span ag-bind="item.value"></span>\
`
        ));

        return it("uses default placeholder", () => expect(getValue()).to.be.eq(' '));
      });
    });

    describe("when the value is a number", () => it("displays the value", function() {
      setValue(0);
      expect(getValue()).to.eq("0");

      setValue(0.1);
      expect(getValue()).to.eq("0.1");

      setValue(123);
      return expect(getValue()).to.eq("123");
    }));

    return describe("binding with filter", function() {

      beforeEach(() => compileTemplate(`\
<span ag-bind="item.value | number:2"></span>\
`
      ));

      it("uses the filter to format the value", function() {
        setValue(0);
        expect(getValue()).to.eq("0.00");

        setValue(1.1);
        expect(getValue()).to.eq("1.10");

        setValue(1.239);
        return expect(getValue()).to.eq("1.24");
      });

      describe("when filter returns falsy value", function() {

        beforeEach(() => compileTemplate(`\
<span ag-bind="item.value | dummy">default value</span>\
`
        ));

        return it("displays the default value", function() {
          setValue("this is the value");
          return expect(getValue()).to.eq("default value");
        });
      });

      return describe("with agDate filter", function() {

        beforeEach(() => compileTemplate(`\
<span ag-bind="item.value | agDate:false:'MM/DD/YY'">-- no date --</span>\
`
        ));

        it("displays the date", function() {
          setValue(new Date(2012, 9, 15));
          return expect(getValue()).to.eq("10/15/12");
        });

        return it("displays default value", function() {
          setValue(undefined);
          return expect(getValue()).to.eq("-- no date --");
        });
      });
    });
  });
});
