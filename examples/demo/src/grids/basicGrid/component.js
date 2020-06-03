import controller from './listCtrl'
import template from './list.html'

export default angular
  .module('app')
  .component('basicDemoGrid', {
    template,
    controller
  })
  .component('basicSearchForm', {
    template: require('./form/searchForm.html')
  })
  .name // .name returns the module name
