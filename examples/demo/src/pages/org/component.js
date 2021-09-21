import template from './component.html'

class controller {
  // vm = {
  //   name: 'Rand'
  // }

  $onInit() {
    this.vm = {
      name: 'Rand'
    }
  }
}

export default angular.module('ag.demo.orgShowDemo', [])
  .component('orgShowDemo', {
    template,
    controller,
    bindings: {
      vm: '<'
    }
  })
  .name
