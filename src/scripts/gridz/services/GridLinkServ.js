/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var gridz = angular.module("angleGrinder.gridz")


class GridLinkServClass{
  constructor(pathWithContext, FlattenServ){

    let fn = (function(path, name, idField, rowData) {
    if (rowData == null) { rowData = {} }
    if (!name) { return "" }

    let href = pathWithContext(path)

    // append id to the path (if given)
    if (!_.isNil(idField)) {
      const id = FlattenServ(rowData)[idField]
      if (_.isNil(id)) { return "" }

      href += `#/${id}`
    }

    return `\
<a href="${href}">${name}</a>\
`
  })
    return fn
  }
}

GridLinkServClass.$inject = ["pathWithContext", "FlattenServ"]
// Generic method for generating links inside jqGrid
gridz.service("GridLinkServ", GridLinkServClass)
