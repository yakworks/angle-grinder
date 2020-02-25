import template from './component.html';
import toast from '~/tools/toast'

class controller {
  content = 'Click Me'

  btnClick = function(event){
    console.log("btnClick event ", event)
    toast.success("Hello, how are you?")
  }
}

export default angular
  .module('ag.demo.buttonDemo', [])
  .component('buttonDemo', {
    template,
    controller
  })
  .name;
