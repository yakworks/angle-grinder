import template from './component.html'
import ngSvelteShim from 'angle-grinder/src/ng/utils/ngSvelteShim'
import Hello from './Hello.svelte'

class controller {
  data = {
    name: 'Rand'
  }
}

const appMod = angular.module('ag.demo.svelte', [])

appMod.component('svelteHello', {
  controller: ngSvelteShim(Hello,
    // {
    //   events: {
    //     change: 'onChange',
    //   }
    // }
  ),
  bindings: {
    data: '<',
    // onChange: '&'
  }
})


appMod.component('ngSvelteDemo', {
  template,
  controller
})

export default appMod.name
