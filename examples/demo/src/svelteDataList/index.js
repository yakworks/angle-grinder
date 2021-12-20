import ngSvelteShim from 'angle-grinder/src/ng/utils/ngSvelteShim'
import ngSvelteMod from '../svelte/AngularSvelte'
import SimpleGridz from './simple/Index.svelte'
import CustGridz from './customer/Index.svelte'

const appMod = angular.module('svelte.list.demo.components', [ngSvelteMod])

appMod
  .component('svelteSimpleGridzIndex', {
    bindings: {
      foo: '<',
      dataApi: '<'
    },
    controller: ngSvelteShim(SimpleGridz)
  })
  .component('svelteCustGridzIndex', {
    bindings: {
      foo: '<',
      dataApi: '<'
    },
    controller: ngSvelteShim(CustGridz)
  })

export default appMod.name
