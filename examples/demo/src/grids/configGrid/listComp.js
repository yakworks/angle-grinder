//import controller from './listCtrl'
import template from './list.html'
import BaseListCtrl from 'angle-grinder/src/ng/gridz/list/BaseListCtrl'
import restStoreApi from '../../store/RestStoreApi'
import buildOptions from "./listCtrlOptions"
import Log from 'angle-grinder/src/utils/Log'
import Swal from 'angle-grinder/src/tools/swal'
import _ from 'lodash'

class ListCtrl extends BaseListCtrl {
  isLoaded = false

  editFormTpl = require('../basicGrid/templates/editDialog.html')
  massUpdateTpl = require('../basicGrid/templates/massUpdateForm.html')

  //static $inject = _.union(super.$inject, ['dataStores', 'appConfigApi'])

  constructor(...args) {
    super(...args)
    this.dataApi = restStoreApi.invoice
  }

  $onInit() {
    _.defaults(this, buildOptions(this))
    // simulate
    // this.$timeout(() => this.isInit = true, 1000)
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
  .module('ag.demo.appConfigGridDemo', [])
  .component('configGridDemo', { template, controller: ListCtrl })
  .component('configSearchForm', {
    template: require('./form/searchForm.html')
  })
  .name
