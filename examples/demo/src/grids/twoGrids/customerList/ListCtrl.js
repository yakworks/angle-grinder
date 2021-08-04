import BaseListCtrl from 'angle-grinder/src/ng/gridz/list/BaseListCtrl'
import restStoreApi from '../../../store/RestStoreApi'
import toast from 'angle-grinder/src/tools/toast'
import _ from 'lodash'

export default class ListCtrl extends BaseListCtrl {
  static $inject = _.union(super.$inject, ['dataStoreApi', '$state', 'selectedRow'])
  apiKey = 'customer'
  eventHandlers = {
    onSelect: (event, id) => {
      this.selectedRow.setSelectedIds(this.gridCtrl?.getSelectedRowIds())
    }
  }

  constructor(...args) {
    super(...args)
    this.dataApi = restStoreApi.customer
  }

  async $onInit() {
    this.isConfigured = false
    this.cfg = {}
    await this.doConfig()
    this.cfg = _.merge(this.cfg, { gridOptions: { rowNum: 5, selectFirstRow: true, multiboxonly: true } })

  }
}
