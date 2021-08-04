import template from './comp.html'

class controller {

  reset(){
    this.vm = {}
  }
}

export default angular.module('ag.demo.inputBasicDemo', [])
  .component('inputBasicDemo', { template, controller })
  .name
