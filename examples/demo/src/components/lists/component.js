import template from './component.html'
import cardListBasic from './card-list-basic'
import cardListIcons from './card-list-icons'
import cardListDense from './card-list-dense'
import cardListLong from './card-list-long'

const comps = angular.module('ag.demo.listsComps', [])
  .directive('cardListIcons', cardListIcons)
  .directive('cardListDense', cardListDense)
  .directive('cardListLong', cardListLong)
  .directive('cardListBasic', cardListBasic)
  .name

class controller {
}

export default angular.module('ag.demo.listsDemo', [
  comps
])
  .component('listsDemo', { template, controller })
  .name
