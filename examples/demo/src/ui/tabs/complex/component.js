import template from './component.html'

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
