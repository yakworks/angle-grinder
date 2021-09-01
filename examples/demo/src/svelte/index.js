import ngSvelteShim from 'angle-grinder/src/ng/utils/ngSvelteShim'
import Avatars from './Avatars/Index.svelte'
import Buttons from './Buttons/Index.svelte'
import FormSimple from './Forms/simple/Index.svelte'
import FormFields from './Forms/fields/Index.svelte'
// import avatarsDemoMod from './avatars'

const appMod = angular.module('svelte.demo.components', [])

appMod
  .component('svelteAvatarsIndex', {
    controller: ngSvelteShim(Avatars)
  })
  .component('svelteButtonsIndex', {
    controller: ngSvelteShim(Buttons)
  })
  .component('svelteFormSimpleIndex', {
    controller: ngSvelteShim(FormSimple)
  })
  .component('svelteFormFieldsIndex', {
    controller: ngSvelteShim(FormFields)
  })

export default appMod.name
