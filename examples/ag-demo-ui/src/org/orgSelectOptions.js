/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const app = angular.module("admin.org");
app.service("orgSelectOptions", [ "Select2Options", "pathWithContext", (select2Options, pathWithContext) => () => select2Options({
  width: 190,
  ajax: {
    url: pathWithContext("/org/pickList")
  },

// formatters for result and selection
  formatResult(org) {  return org.name; },
  formatSelection(org) { return org.name; }
})
]);
