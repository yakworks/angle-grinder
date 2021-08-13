import template from './component.html'

class controller {
  vm = {
    dueDate: new Date()
  }

}

export default angular
  .module('demo.tabs.complex.comp', [])
  .component('complexDemoTabs', {
    template,
    controller
  })
  .name // .name returns the module name
