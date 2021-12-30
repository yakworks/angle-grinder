// import _ from 'lodash'

// TODO change to https://github.com/likeastore/ngDialog#api
import growl from "../../../tools/growl"
export default class EditModalCtrl {
  /* @ngInject */
  constructor($uibModalInstance, $scope, dataApi, vm, ctx, title) {
    this.modal = $uibModalInstance
    this.$scope = $scope
    this.dataApi = dataApi
    this.vm = vm
    this.ctx = ctx
    this.title = title
  }

  async save() {
    // call the agForm submit so it brodcasts and shows the errors
    const { agForm } = this.$scope
    agForm.submit()
    if (agForm.form.$invalid || agForm.form.$pristine) return
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

  async handleError(er) {
    const { agForm } = this.$scope
    let problem = await er.response.json()

    let messages = []
    if(problem.errors){
      messages = problem.errors.map(er => er.message)
    } else if(problem.detail) {
      messages.push(problem.detail)
    }
    growl.error(messages.join('/n'), problem.title)
    agForm.setServerErrors(er.response)
    // console.error("handleError errors", errors)
  }
}
