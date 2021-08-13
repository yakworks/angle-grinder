import commonModule from 'angle-grinder/src/ng/common'
import compileTemplate from '../../../helpers/compileTemplate'

describe("module: angleGrinder.forms", function() {

  beforeEach(angular.mock.module(commonModule));

  describe("service: focus", function() {

    it("is defined", inject(function(focus) {
      expect(focus).to.not.be.undefined;
      return expect(focus).to.be.a("function");
    })
    );

    return it("broadcasts `focusOn` event with the field name", inject(function($rootScope, $timeout, focus) {
      // Given
      sinon.spy($rootScope, "$broadcast");

      // When
      focus("theField");
      $timeout.flush();

      // Then
      return expect($rootScope.$broadcast).to.have.been.calledWith("focusOn", "theField");
    })
    );
  });

  return describe("directive: agFocus", function() {

    let element = null;

    beforeEach(inject(function($injector) {
      let $scope;
      return ({element, $scope} = compileTemplate(`\
<form name="theForm">
  <input type="text" ag-focus="theInput" />
</form>\
`, $injector));
    })
    );

    return describe("when the focus was requested", function() {

      let input = null;
      beforeEach(() => input = element.find("input"));

      const focus = name => beforeEach(inject($rootScope => $rootScope.$broadcast("focusOn", name)));

      context("on the same field", function() {
        focus("theInput");

        return it("sets the focus on the element", () => expect(input.hasClass("ag-focused")).to.be.true);
      });

      return context("when the focus was requested on the other field", function() {
        focus("theOtherField");

        return it("does not set the focus", () => expect(input.hasClass("ag-focused")).to.be.false);
      });
    });
  });
});
