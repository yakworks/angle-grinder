import ngSvelteShim from 'angle-grinder/src/ng/utils/ngSvelteShim'
import Avatars from './Avatars/index.svelte'
import Buttons from './Buttons/index.svelte'
// import avatarsDemoMod from './avatars'

const appMod = angular.module('svelte.demo.components', [])

appMod
  .component('svelteAvatarsIndex', {
    controller: ngSvelteShim(Avatars)
  })
  .component('svelteButtonsIndex', {
    controller: ngSvelteShim(Buttons)
  })

export default appMod.name
