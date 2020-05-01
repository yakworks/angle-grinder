import appState from 'angle-grinder/src/tools/AppState'
import { filterChildren } from '../../utils'

class controller {
  constructor($element, $location) {
    this.$location = $location
    this.$element = $element
    this.$state = appState.$state
    this.appState = appState
    this.sideMenuItems = filterChildren(appState.routerStates).children
  }

  getCurrentUrl = () => this.$location.absUrl().split('#')[0].split('/')[3]

  // $onInit() {
  //   super.onInit()
  //   super.validate()
  // }

  $onChanges(changesObj) {
    console.log('sidebar $onChanges(changesObj)', changesObj)
  }
}

export default angular.module('app.sidebar', [])
  .component('appSidebar', {
    controller,
    template: require('./index.html')
    // require: {
    //   ngModelCtrl: 'ngModel',
    // },
    // bindings: {
    //   ngModel: '=',
    // }
  })
  .name
