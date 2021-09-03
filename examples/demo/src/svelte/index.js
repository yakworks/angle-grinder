import ngSvelteShim from 'angle-grinder/src/ng/utils/ngSvelteShim'
import ngSvelteMod from './AngularSvelte'
import Avatars from './Avatars/Index.svelte'
import Buttons from './Buttons/Index.svelte'
import Cards from './Cards/Index.svelte'
import Charts from './Charts/Index.svelte'
import FormSimple from './Forms/simple/Index.svelte'
import FormFields from './Forms/fields/Index.svelte'
import Growl from './Growl/Index.svelte'
import Items from './Items/Index.svelte'
import Lists from './Lists/Index.svelte'
import Selects from './Selects/Index.svelte'
// import avatarsDemoMod from './avatars'

const appMod = angular.module('svelte.demo.components', [ngSvelteMod])

appMod
  .component('svelteAvatarsIndex', {
    controller: ngSvelteShim(Avatars)
  })
  .component('svelteButtonsIndex', {
    controller: ngSvelteShim(Buttons)
  })
  .component('svelteCardsIndex', {
    controller: ngSvelteShim(Cards)
  })
  .component('svelteChartsIndex', {
    controller: ngSvelteShim(Charts)
  })
  .component('svelteFormSimpleIndex', {
    controller: ngSvelteShim(FormSimple)
  })
  .component('svelteFormFieldsIndex', {
    controller: ngSvelteShim(FormFields)
  })
  .component('svelteGrowlIndex', {
    controller: ngSvelteShim(Growl)
  })
  .component('svelteItemsIndex', {
    controller: ngSvelteShim(Items)
  })
  .component('svelteListsIndex', {
    controller: ngSvelteShim(Lists)
  })
  .component('svelteSelectsIndex', {
    controller: ngSvelteShim(Selects)
  })

export default appMod.name
