beforeEach(function() {
  let mocks = angular.module("mocks", []);

  mocks.factory("formMock", function() {
    class FormMock {
      constructor() { this.$setValidity(false); }

      $setValidity(valid) {
        this.$valid = valid;
        this.$invalid = !valid;
        return this;
      }
    }

    return () => new FormMock();
  });

  return angular.mock.module("angleGrinder.forms", "mocks");
});
