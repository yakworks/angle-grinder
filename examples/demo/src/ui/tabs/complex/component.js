import template from './component.html'
import '../../../grids/basicGrid/component'
import '../../../forms/xedit-form/xedit1/comp'

class controller {
  vm = {
    dueDate: new Date()
  }

}

export default angular
  .module('app')
  .component('complexDemoTabs', {
    template,
    controller
  })
  .name // .name returns the module name
