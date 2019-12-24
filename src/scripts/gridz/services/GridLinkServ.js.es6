/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const gridz = angular.module("angleGrinder.gridz");

// Generic method for generating links inside jqGrid
gridz.service("GridLinkServ", [
  "pathWithContext", "FlattenServ", (pathWithContext, FlattenServ) => (function(path, name, idField, rowData) {
  if (rowData == null) { rowData = {}; }
  if (!name) { return ""; }

  let href = pathWithContext(path);

  // append id to the path (if given)
  if (idField?) {
    const id = FlattenServ(rowData)[idField];
    if (!id?) { return ""; }

    href += `#/${id}`;
  }

  return `\
<a href="${href}">${name}</a>\
`;
})
]);
