import ListDataApiCtrl from 'angle-grinder/src/ng/gridz/list-datastore/ListDataApiCtrl'
import dataApiFactory from '../../../store/dataApiFactory'
import _ from 'lodash'

export default class ListCtrl extends ListDataApiCtrl {
  static $inject = _.union(super.$inject, ['$state', 'selectedRow'])
  apiKey = 'customer'
  eventHandlers = {
    onSelect: (event, id) => {
      this.selectedRow.setSelectedIds(this.gridCtrl?.getSelectedRowIds())
    }
  }

  constructor(...args) {
    super(...args)
    this.dataApi = dataApiFactory.customer
  }

  async $onInit() {
    this.isConfigured = false
    this.cfg = {}
    await this.doConfig()
    this.cfg = _.merge(this.cfg, { gridOptions: { rowNum: 5, selectFirstRow: true, multiboxonly: true } })

  }
}
