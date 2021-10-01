import ngSvelteShim from 'angle-grinder/src/ng/utils/ngSvelteShim'
import ngSvelteMod from './AngularSvelte'
import Avatars from './Avatars/Index.svelte'
import Buttons from './Buttons/Index.svelte'
import Cards from './Cards/Index.svelte'
import Charts from './Charts/Index.svelte'
import Colors from './Colors/Index.svelte'
import FormsLib from './Forms/forms-lib/Index.svelte'
import FormBasic from './Forms/basic/Index.svelte'
import FormList from './Forms/list/Index.svelte'
import Growl from './Growl/Index.svelte'
import Items from './Items/Index.svelte'
import Lists from './Lists/Index.svelte'
import Selects from './Selects/Index.svelte'
import Gridz from './Gridz/Index.svelte'
import Toolbar from './Toolbar/Index.svelte'
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
  .component('svelteColorsIndex', {
    controller: ngSvelteShim(Colors)
  })
  .component('svelteFormBasicIndex', {
    controller: ngSvelteShim(FormBasic)
  })
  .component('svelteFormsLibIndex', {
    controller: ngSvelteShim(FormsLib)
  })
  .component('svelteFormListIndex', {
    controller: ngSvelteShim(FormList)
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
  .component('svelteGridzIndex', {
    controller: ngSvelteShim(Gridz)
  })
  .component('svelteToolbarIndex', {
    controller: ngSvelteShim(Toolbar)
  })

export default appMod.name
