import ButtonsExample from './buttons/ButtonsExample.svelte'
import ngSvelteShim from 'angle-grinder/src/ng/utils/ngSvelteShim'
// import avatarsDemoMod from './avatars'

const appMod = angular.module('svelte.demo.components', [])

appMod.component('svelteButtonsDemo', {
  controller: ngSvelteShim(ButtonsExample),
  // bindings: {
  //   data: '<',
  //   // onChange: '&'
  // }
})

export default appMod.name
