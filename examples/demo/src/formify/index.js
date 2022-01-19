import ngSvelteShim from 'angle-grinder/src/ng/utils/ngSvelteShim'
import ngSvelteMod from '../svelte/AngularSvelte'
import BasicForm from './basic/Index.svelte'
import SearchForm from './search/Index.svelte'

const appMod = angular.module('svelte.formify.demo', [ngSvelteMod])

appMod
  .component('formifyBasicIndex', {
    controller: ngSvelteShim(BasicForm)
  })
  .component('formifyDynamicIndex', {
    controller: ngSvelteShim(SearchForm)
  })


export default appMod.name
