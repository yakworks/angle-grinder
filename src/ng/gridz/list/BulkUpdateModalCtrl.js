// import _ from 'lodash'

// see https://stackoverflow.com/questions/53349705/constructor-and-class-properties-within-javascript-mixins
// and https://alligator.io/js/class-composition/ for class composition
export default class EditModalCtrl {
  /* @ngInject */
  constructor($uibModalInstance, $scope, dataApi, vm, cfg, selectedIds) {
    this.modal = $uibModalInstance
    this.$scope = $scope
    this.dataApi = dataApi
    this.vm = vm
    this.cfg = cfg
    this.selectedIds = selectedIds
  }

  async save() {
    // call the agForm submit so it brodcasts and shows the errors
    const { agForm } = this.$scope
    agForm.submit()
    if (agForm.form.$invalid || agForm.form.$pristine) return
    this.isSaving = true
    try {
      const params = { ids: this.selectedIds, data: this.vm }
      const results = await this.dataApi.bulkUpdate(params)
      this.modal.close(results)
    } catch (er) {
      this.handleError(er)
    } finally {
      this.isSaving = false
    }
  }

  cancel() {
    // prevents the "Possibly unhandled rejection: cancel"
    this.modal.result.catch(() => this.modal.close())
    this.modal.dismiss('cancel')
  }

  handleError(er) {
    // FIXME handle a graceful way of displayiing errors
    console.error(er)
  }
}
