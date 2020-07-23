import template from './comp.html'

class controller {
  reset(){
    this.vm = {}
  }
}

export default angular.module('ag.demo.inputHorizontalDemo', [])
.component('inputHorizontalDemo', {template, controller})
.name
