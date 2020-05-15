import agForm from './agForm'
import ngModel from './ngModel'
import ServerErrorsService from './ServerErrorsService'

export default angular
  .module('ag.form', [])
  .directive('agForm', agForm)
  .directive('ngModel', ngModel)
  .service('serverErrorsService', ServerErrorsService)
  .name
