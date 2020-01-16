/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const forms = angular.module("angleGrinder.forms");

//Just an example for configuring dates formats
forms.config([
  "agDateProvider", function(provider) {
    provider.setViewFormat("MM/DD/YY");
    return provider.setLocalDateFormat("YYYY-MM-DD");
  }
]);
