import formsModule from 'angle-grinder/src/ng/forms'
import compileTemplate from '../../helpers/compileTemplate'

describe("module: angleGrinder.forms directive: agDeleteButton", function() {

  beforeEach(angular.mock.module(formsModule));

  let element = null;
  let $scope = null;

  beforeEach(inject(function($injector) {
    ({element, $scope} = compileTemplate(`\
<ag-delete-button when-confirmed="delete(123)" deleting="deleting"></ag-delete-button>\
`, $injector));

    return $scope.delete = sinon.stub();
  })
  );

  it("is visible", () => expect(element.css("display")).not.to.equal("none"));

  it("is not disabled", () => expect(element.prop("disabled")).to.be.false);

  it("has a valid label", () => expect(element.text()).to.include("Delete"));

  describe("when the button is clicked", function() {
    beforeEach(() => element.click());

    it("displays the confirmation", () => expect(element.text()).to.include("Are you sure?"));

    return it("changes button class", () => expect(element.hasClass("btn-warning")).to.be.true);
  });

  describe("when the button is double clicked", function() {
    beforeEach(function() {
      element.click();
      return element.click();
    });

    it("performs the delete action", function() {
      expect($scope.delete).to.have.been.called;
      return expect($scope.delete).to.have.been.calledWith(123);
    });

    return it("disables the button", () => expect(element.prop("disabled")).to.be.true);
  });

  return describe("disabling / enabling the button", function() {
    let deferred = null;

    beforeEach(inject(function($q) {
      deferred = $q.defer();
      $scope.delete.returns(deferred.promise);

      return element.click();
    })
    );

    describe("when the request is in progress", function() {
      beforeEach(() => element.click());

      it("disables the button", () => expect(element.prop("disabled")).to.be.true);

      return it("changes the button label", function() {
        expect(element.text()).to.include("Delete");
        return expect(element.text()).to.include("...");
      });
    });

    return describe("when the request in not in progress", function() {
      beforeEach(inject(function($rootScope) {
        element.click();
        return $rootScope.$apply(() => deferred.resolve(true));
      })
      );

      it("is enabled", () => expect(element.prop("disabled")).to.be.false);

      return it("does not change the button label", function() {
        expect(element.text()).to.include("Delete");
        return expect(element.text()).to.not.include("...");
      });
    });
  });
});
