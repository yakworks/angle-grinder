import template from './component.html'
import toast from 'angle-grinder/src/tools/toast'

class ClrController {
  content = 'Click Me'
  loading = false

  /* @ngInject */
  constructor($timeout) {
    this.$timeout = $timeout
  }

  btnClick = function(event) {
    // ('btnClick event ', event)
    toast.success('It is done')
  }

  toggleLoading = (event) => {
    this.loading = !this.loading
    this.$timeout(() => {
      this.loading = !this.loading
    }, 3000)
  }
}

export default angular
  .module('ag.demo.buttonColorsDemo', [])
  .component('buttonColorsDemo', {
    template: template,
    controller: ClrController
  })
  .name
