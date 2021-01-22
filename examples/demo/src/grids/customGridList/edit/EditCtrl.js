import _ from "lodash";
import BaseEditCtrl from "angle-grinder/src/ng/gridz/list/BaseEditCtrl";

export default class EditCtrl extends BaseEditCtrl {
  vm = {}
  isSaving = false
  static $inject = _.union(super.$inject, ['$stateParams', 'dataStoreApi'])

  async $onInit() {
    this.dataApi = this.dataStoreApi[this.apiKey]
    this.vm = await this.dataApi.get(this.$stateParams.id)
    this.cfg = {}
    super.doConfig()
  }

  async save(agForm) {
    // call the agForm submit so it brodcasts and shows the errors
    agForm.submit()
    if (agForm.form.$invalid || agForm.form.$pristine) return
    this.isSaving = true
    try {
      const savedItem = await this.dataApi.save(this.vm)
    } catch (er) {
      this.handleError(er)
    } finally {
      this.isSaving = false
    }
  }

}
