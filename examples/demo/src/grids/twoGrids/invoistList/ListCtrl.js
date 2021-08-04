// import controller from './listCtrl'
// import template from './list.html'
import BaseListCtrl from 'angle-grinder/src/ng/gridz/list/BaseListCtrl'
import restStoreApi from '../../../store/RestStoreApi'
import toast from 'angle-grinder/src/tools/toast'
import _ from 'lodash'

export default class ListCtrl extends BaseListCtrl {
  static $inject = _.union(super.$inject, ['dataStoreApi', '$state', 'selectedRow'])
  apiKey = 'invoice'
  searchModel= {}
  eventHandlers = {
  }

  // static $inject = _.union(super.$inject, ['someService'])
  constructor(...args) {
    super(...args)
    this.dataApi = restStoreApi.invoice
  }

  async $onInit() {
    this.isConfigured = false
    this.cfg = {}
    await this.doConfig()
    this.searchModel.customerId = this.selectedRow.getSelectedId()
  }

  async $doCheck(){
    const selectedRow = this.selectedRow.getSelectedId()
    if (selectedRow && this.searchModel.customerId !== Number(selectedRow)) {
      this.searchModel.customerId = Number(selectedRow)
      this?.search(this.searchModel)
    }
  }

}
