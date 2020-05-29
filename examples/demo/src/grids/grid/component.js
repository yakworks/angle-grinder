import controller from './listCtrl'
import template from './list.html'

export default angular
  .module('app')
  .component('demoGrid', {
    template,
    controller,
    controllerAs: '$ctrl'
  })
  .name // .name returns the module name
