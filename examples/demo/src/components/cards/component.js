import template from './component.html'
import cardSimple from './card-simple'
import cardTitle from './card-title'
import cardHeader from './card-header'

const comps = angular.module('ag.demo.cardsComps', [])
  .directive('cardSimple', cardSimple)
  .directive('cardTitle', cardTitle)
  .directive('cardHeader', cardHeader)
  .name

class controller {
}

export default angular.module('ag.demo.cardsDemo', [
  comps
])
  .component('cardsDemo', { template, controller })
  .name
