import angular from 'angular'
import gridzModule from '../gridzModule'
import _ from 'lodash'

var gridz = angular.module(gridzModule)

class GridLinkServClass {
  constructor(pathWithContext, FlattenServ) {
    const fn = function(path, name, idField, rowData) {
      if (rowData == null) { rowData = {} }
      if (!name) { return '' }

      let href = pathWithContext(path)

      // append id to the path (if given)
      if (!_.isNil(idField)) {
        const id = FlattenServ(rowData)[idField]
        if (_.isNil(id)) { return '' }

        href += `#/${id}`
      }

      return `\
<a href="${href}">${name}</a>\
`
    }
    return fn
  }
}

GridLinkServClass.$inject = ['pathWithContext', 'FlattenServ']
// Generic method for generating links inside jqGrid
gridz.service('GridLinkServ', GridLinkServClass)
