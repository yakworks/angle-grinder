//import controller from './listCtrl'
import template from './list.html'
import BaseListCtrl from 'angle-grinder/src/ng/gridz/list/BaseListCtrl'
import buildOptions from "./listCtrlOptions"
import Log from 'angle-grinder/src/utils/Log'
import Swal from 'angle-grinder/src/tools/swal'
import _ from 'lodash'

class ListCtrl extends BaseListCtrl {
  isLoaded = false

  editFormTpl = require('./form/editDialog.html')
  massUpdateTpl = require('./form/massUpdateForm.html')

  static $inject = _.union(super.$inject, ['restDataStore', '$timeout'])

  constructor(...args) {
    super(...args)
    this.dataStore = this.restDataStore.invoiceApi
  }

  $onInit() {
    _.defaults(this, buildOptions(this))
  }

  displaySelectedRowsData() {
    console.log("displaySelectedRowsData")
    this.selectedRowsData = this.gridCtrl.getSelectedRows()
  }

  import() {
    console.log("import")
    Swal.fire('import something')
  }

}

export default angular
  .module('ag.demo.basicGridDemo', [])
  .component('basicGridDemo', {
    template: template,
    controller: ListCtrl
  })
  .component('basicSearchForm', {
    template: require('./form/searchForm.html')
  })
  .name
