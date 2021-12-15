// import controller from './listCtrl'
// import template from './list.html'
import ListDataApiCtrl from 'angle-grinder/src/ng/gridz/list-datastore/ListDataApiCtrl'
import dataApiFactory from '../../../store/RestApiFactory'
import _ from 'lodash'

export default class ListCtrl extends ListDataApiCtrl {
  static $inject = _.union(super.$inject, ['$state', 'selectedRow'])
  apiKey = 'invoice'
  searchModel= {}
  eventHandlers = {}

  // static $inject = _.union(super.$inject, ['someService'])
  constructor(...args) {
    super(...args)
    this.dataApi = dataApiFactory.invoice
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
