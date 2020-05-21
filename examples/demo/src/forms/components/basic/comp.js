import template from './comp.html'

class controller {

  reset(){
    this.vm = {}
  }
}

export default angular.module('ag.demo.bulma', [])
.component('bulmaDemo', {template, controller})
.name
