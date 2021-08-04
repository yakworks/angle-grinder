// import controller from './listCtrl'
// import template from './list.html'
import BaseListCtrl from 'angle-grinder/src/ng/gridz/list/BaseListCtrl'
import restStoreApi from '../../../store/RestStoreApi'
import toast from 'angle-grinder/src/tools/toast'
import _ from 'lodash'

export default class ListCtrl extends BaseListCtrl {
  apiKey = 'invoice'
  initSearch = { name: 'Yodo' }
  // bulkUpdateTemplate = require('../basicGrid/templates/bulkUpdateForm.html')
  eventHandlers = {
    onSelect: (event, id) => {
      toast.success(`Selected row with id = ${id}`)
    }
  }

  // static $inject = _.union(super.$inject, ['someService'])
  constructor(...args) {
    super(...args)
    this.dataApi = restStoreApi.invoice
  }

  async $onInit() {
    this.isConfigured = false
    // console.log("ListCtrl ", this)
    this.cfg = {}
    await this.doConfig()
    this.totals = await this.dataApi.countTotals()
    this.updateFooter({
      amount: 'Total',
      ...this.totals
    })
  }

  fireToolbarAction(btnItem, event) {
    super.fireToolbarAction(btnItem, event)
    // if btnItem.key is the same name as function then it will be fired
    if (btnItem.key === 'showSelected') this.displaySelectedRowsData()
  }

  displaySelectedRowsData() {
    // console.log("displaySelectedRowsData")
    this.selectedRowsData = this.gridCtrl.getSelectedRows()
  }

  // these are called because the super.fireToolbarAction will look for same function name
  // as the key
  async import() {
    console.log('import')
    await this.dataApi.getA
    toast.success('import something')
  }

  async ptp() {
    const result = await this.dataApi.postAction('ptp')
    this.handleResults(result)
  }
}
