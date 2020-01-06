/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.common")

// Convert line braks to html
app.filter("newLines", () => (function(text) {
  if (!angular.isString(text)) { return text }
  return text.replace(/\n/g, "<br />")
}))
