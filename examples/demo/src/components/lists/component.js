import template from './component.html'
import cardList from './card-list'
import cardListDense from './card-list-dense'
import cardListLong from './card-list-long'

const comps = angular.module('ag.demo.listsComps', [])
  .directive('cardList', cardList)
  .directive('cardListDense', cardListDense)
  .directive('cardListLong', cardListLong)
  .name

class controller {
  items = [
    { name: 'Health Potion', cost: 4, icon: 'fas fa-flask' },
    { name: 'Mana Potion', cost: 5, icon: 'mdi mdi-flask-outline' },
    { name: 'Iron Sword', cost: 12, icon: 'mdi mdi-sword' }
  ]
}

export default angular.module('ag.demo.listsDemo', [
  comps
])
  .component('listsDemo', { template, controller })
  .name
