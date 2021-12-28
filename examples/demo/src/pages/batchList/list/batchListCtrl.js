import BaseListCtrl from 'angle-grinder/src/ng/gridz/list/BaseListCtrl'

import { union } from 'lodash'

export default class BatchListCtrl extends BaseListCtrl {
  static $inject = union(super.$inject, ['dataStoreApi', '$state'])
  searchModel = {}
  async $onInit() {
    this.isConfigured = false
    this.dataApi = this.dataStoreApi[this.apiKey]
    this.cfg = {}
    await super.doConfig()
  }

  async correct() {
    const ids = this.gridCtrl.getSelectedRows()?.map(row => row.id)
    const result = await this.dataStoreApi.arBatch.postAction('runCorrection', { ids })
  }
}
