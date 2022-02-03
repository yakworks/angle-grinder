import template from './component.html'

import angular from 'angular'
import Swal from '@yakit/ui/swal'

class controller {
  vm = {
    tabs: [{
      title: 'Dynamic Title 1',
      content: 'Dynamic content 1'
    }, {
      title: 'Dynamic Title 2',
      content: 'Dynamic content 2',
      disabled: false
    }]
  }

  alertMe = () => {
    setTimeout(function() {
      Swal.fire({
        title: 'You\'ve selected the alert tab!',
        confirmButtonColor: '#007AFF'
      })
    })
  }
}

export default angular
  .module('demo.tabs.basic.comp', [])
  .component('demoTabs', {
    template,
    controller
  })
  .name // .name returns the module name
