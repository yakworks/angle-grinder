import agForm from './agForm'
import ngModel from './ngModel'

export default angular
  .module('ag.form', [])
  .directive('agForm', agForm)
  .directive('ngModel', ngModel)
  .name
