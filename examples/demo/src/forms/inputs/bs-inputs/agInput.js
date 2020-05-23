import template from './agInput.html'
import toast from 'angle-grinder/src/tools/toast'

class controller {
  content = 'Click Me'

  btnClick = function(event) {
    console.log('btnClick event ', event)
    toast.success('It is done')
  }
}

export default angular
  .module('ag.demo.agInput', [])
  .component('bsInputDemo', {
    template,
    controller
  })
  .name
