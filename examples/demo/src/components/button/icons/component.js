import template from './component.html'
import toast from '@yakit/ui/growl'

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
  .module('ag.demo.buttonIconsDemo', [])
  .component('buttonIconsDemo', {
    template: template,
    controller: ClrController
  })
  .name
