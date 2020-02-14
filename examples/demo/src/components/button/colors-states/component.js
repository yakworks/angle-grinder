import template from './component.html';
import toast from '~/components/toast'

class controller {
  content = 'Click Me'
  loading = false

}

export default angular
  .module('ag.demo.buttonColorsDemo', [])
  .component('buttonColorsDemo', {
    template,
    controller
  })
  .name;
