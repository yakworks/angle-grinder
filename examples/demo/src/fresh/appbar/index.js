import appState from 'angle-grinder/src/tools/AppState'
import { toggleSidenav } from '../sidenav'

class controller {
  constructor($element) {
    this.$element = $element
    this.appState = appState
  }

  toggleSidenav() {
    toggleSidenav()
  }

  get title() {
    return appState.title
  }

  // $postLink() {
  // }
}

export default angular.module('demo.fresh.appbar', [])
  .component('freshAppbar', {
    controller,
    template: require('./index.html')
  })
  .name
