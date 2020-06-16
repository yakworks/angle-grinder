import controller from './index'
import template from './ui_tabs.html'

export default angular
  .module('app')
  .component('demoTabs', {
    template,
    controller
  })
  .name // .name returns the module name
