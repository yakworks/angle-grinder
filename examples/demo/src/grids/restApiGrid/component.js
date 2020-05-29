import controller from './listCtrl'
import template from '../grid/list.html'

export default angular
  .module('app')
  .component('restApiGrid', {
    template,
    controller,
    controllerAs: '$ctrl'
  })
  .name // .name returns the module name
