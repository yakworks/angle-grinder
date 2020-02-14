import template from './component.html';
import toast from '~/components/toast'

class controller {
  content = 'Click Me'

  btnClick = function(event){
    console.log("btnClick event ", event)
    toast.success("It is done")
  }
}

export default angular
  .module('ag.demo.buttonDemo', [])
  .component('buttonDemo', {
    template,
    controller
  })
  .name;
