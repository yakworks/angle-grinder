import template from './component.html'
import cardWithText from './card-with-text'
import cardNotification from './card-notification'

const comps = angular.module('ag.demo.tilesCardComps', [])
  .directive('cardWithText', cardWithText)
  .directive('cardNotification', cardNotification)
  .name

class controller {

  player = {
    gold: 100
  }

}

export default angular.module('ag.demo.tilesPage', [
  comps
])
  .component('tilesDemo', { template, controller })
  .name
