import ngSvelteShim from 'angle-grinder/src/ng/utils/ngSvelteShim'
import AvatarsIndex from './Avatars/index.svelte'
import ButtonsExample from './buttons/index.svelte'
// import avatarsDemoMod from './avatars'

const appMod = angular.module('svelte.demo.components', [])

appMod
  .component('svelteAvatarsIndex', {
    controller: ngSvelteShim(AvatarsIndex)
  })
  .component('svelteDemoAvatar', {
    controller: ngSvelteShim(ButtonsExample)
  })

export default appMod.name
