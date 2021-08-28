import BaseEditCtrl from 'angle-grinder/src/ng/gridz/list/BaseEditCtrl'
// import appState from 'angle-grinder/src/tools/AppState'
import _ from 'lodash'
import appConfigApi from 'angle-grinder/src/dataApi/AppConfigApi'

export default class EditCtrl extends BaseEditCtrl {
  vm = {}
  isSaving = false

  cfg = {}
  static $inject = _.union(super.$inject, ['$stateParams', '$state', 'dataStoreApi'])

  async $onInit() {
    this.isConfigured = false
    this.id = this.$stateParams.id
    this.dataApi = this.dataStoreApi[this.apiKey]
    this.vm = await this.dataApi.get(this.id)
    this.cfg = await appConfigApi.getConfig(this.apiKey)
    this.editFormFields = this.splitFormInColumns(this.cfg.editForm)
    this.isConfigured = true
  }

  async save() {
    if (this.editForm.$invalid || this.editForm.$pristine) return
    this.isSaving = true
    try {
      const savedItem = await this.dataApi.save(this.vm)
      this.modal.close(savedItem)
    } catch (er) {
      this.handleError(er)
    } finally {
      this.isSaving = false
    }
  }

  splitFormInColumns(fields) {
    const chunks = _.chunk(fields, Math.ceil(fields.length / 5))
    const result = {}
    chunks.forEach((chunk, i) => {
      result[`column${i + 1}`] = chunk
    })
    return result
  }

  post = async () => {
    await this.dataApi.postAction('post', { id: this.id })
    this.vm = await this.dataApi.get(this.id)
  }

  correct = async () => {
    await this.dataApi.postAction('runCorrection', { ids: [this.id] })
    this.vm = await this.dataApi.get(this.id)
  }

  delete = async () => {
    await this.dataApi.remove(this.id)
    this.$state.go('rcm.receivables.arBatch.list')
  }

  reloadBatch = async () => {
    this.vm = await this.dataApi.get(this.id)
  }
}
