/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.common");

app.constant("contextPath", $("body").data("contextPath"));

// Generate a template url for the given resource and path
app.constant("ResourceTemplateServ", function(resource, path) {
  const parts = [];

  parts.push($("body").data("contextPath"));
  parts.push(resource.replace(/^\//, ""));
  parts.push(path);

  return parts.join("/");
});
