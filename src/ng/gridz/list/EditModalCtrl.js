// import _ from 'lodash'

// see https://stackoverflow.com/questions/53349705/constructor-and-class-properties-within-javascript-mixins
// and https://alligator.io/js/class-composition/ for class composition
export default class EditModalCtrl {
  constructor($uibModalInstance, $scope, dataApi, vm) {
    this.modal = $uibModalInstance
    this.$scope = $scope
    this.dataApi = dataApi
    this.vm = vm
  }

  async save() {
    // console.log('edit modal save scope', this.$scope)
    const { editForm } = this.$scope
    if (editForm.$invalid || editForm.$pristine) return
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
    // FIXME handle a graceful way of displayiing exception
    console.error(er)
  }
}
