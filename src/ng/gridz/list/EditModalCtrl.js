// import _ from 'lodash'

// see https://stackoverflow.com/questions/53349705/constructor-and-class-properties-within-javascript-mixins
// and https://alligator.io/js/class-composition/ for class composition
export default class EditModalCtrl {
  constructor($uibModalInstance, $scope, dataApi, vm, cfg) {
    this.modal = $uibModalInstance
    this.$scope = $scope
    this.dataApi = dataApi
    this.vm = vm
    this.cfg = cfg
  }

  async save() {
    // call the agForm submit so it brodcasts and shows the errors
    this.$scope.agForm.submit()
    if (this.editFormCtrl.$invalid || this.editFormCtrl.$pristine) return
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
