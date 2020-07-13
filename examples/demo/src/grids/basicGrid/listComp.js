//import controller from './listCtrl'
import template from './list.html'
import BaseListCtrl from 'angle-grinder/src/ng/gridz/list/BaseListCtrl'
import buildOptions from "./listCtrlOptions"
import localStoreApi from '../../store/LocalStoreApi'
import Log from 'angle-grinder/src/utils/Log'
import Swal from 'angle-grinder/src/tools/swal'
import _ from 'lodash'

class ListCtrl extends BaseListCtrl {
  isLoaded = false

  editFormTpl = require('./templates/editDialog.html')
  massUpdateTpl = require('./templates/massUpdateForm.html')

  // static $inject = _.union(super.$inject, ['restDataStore', '$timeout'])

  constructor(...args) {
    super(...args)
    this.dataApi = localStoreApi.invoice
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
    template: require('./templates/searchForm.html')
  })
  .name
