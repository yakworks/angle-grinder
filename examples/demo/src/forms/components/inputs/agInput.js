import template from './agInput.html'
import toast from '~/tools/toast'

class controller {
  content = 'Click Me'

  btnClick = function(event) {
    console.log('btnClick event ', event)
    toast.success('It is done')
  }
}

export default angular
  .module('ag.demo.agInput', [])
  .component('agInputDemo', {
    template,
    controller
  })
  .name
