import template from './agInput.html'
import toast from '@yakit/ui/growl'

class controller {
  content = 'Click Me'

  btnClick = function(event) {
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
