/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const app = angular.module("angleGrinder.common");

// Filter for boolean values, presents '✓' or '✘'
app.filter("checkMark", () => (function(input, options) {
  if (options == null) { options = {}; }
  if (input) {
    if (options.hideTruth) { return ""; }
    return "\u2713";
  } else {
    if (options.hideFalse) { return ""; }
    return "\u2718";
  }
}));
