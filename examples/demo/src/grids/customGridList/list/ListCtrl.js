//import controller from './listCtrl'
// import template from './list.html'
import BaseListCtrl from 'angle-grinder/src/ng/gridz/list/BaseListCtrl'
import restStoreApi from '../../../store/RestStoreApi'
import toast from 'angle-grinder/src/tools/toast'
import _ from 'lodash'

export default class ListCtrl extends BaseListCtrl {
  apiKey = 'invoice'

  // massUpdateTemplate = require('../basicGrid/templates/massUpdateForm.html')

  //static $inject = _.union(super.$inject, ['someService'])
  constructor(...args) {
    super(...args)
    this.dataApi = restStoreApi.invoice
  }

  $onInit() {
    this.isConfigured = false
    // console.log("ListCtrl ", this)
    this.cfg = {}
    this.doConfig()
  }

  fireToolbarAction(btnItem, event) {
    super.fireToolbarAction(btnItem, event)
    // if btnItem.key is the same name as function then it will be fired
    if(btnItem.key === 'showSelected') this.displaySelectedRowsData()
  }

  displaySelectedRowsData() {
    // console.log("displaySelectedRowsData")
    this.selectedRowsData = this.gridCtrl.getSelectedRows()
  }

  // these are called because the super.fireToolbarAction will look for same function name
  // as the key
  import() {
    console.log("import")
    toast.success('import something')
  }

  ptp() {
    toast.success('ptp')
  }
}

