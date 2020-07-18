import controller from './listCtrl'
import template from './list.html'

export default angular
  .module('app')
  .component('restApiGrid', {
    template,
    controller
  })
  .name // .name returns the module name
