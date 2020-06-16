import controller from './index'
import template from './complex_tabs.html'
import '../../../grids/restGrid/component'
import '../../../forms/xedit-form/xedit1/comp'

export default angular
  .module('app')
  .component('complexDemoTabs', {
    template,
    controller
  })
  .name // .name returns the module name
