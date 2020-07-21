import template from './component.html'
import toast from 'angle-grinder/src/tools/toast'

class controller {
  content = 'Click Me'

  btnClick = function(event) {
    toast.success('Clicked event')
  }
}

export default angular
  .module('ag.demo.buttonDemo', [])
  .component('buttonDemo', {
    template,
    controller
  })
  .name
