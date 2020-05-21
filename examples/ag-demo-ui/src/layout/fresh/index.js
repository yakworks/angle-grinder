import template from './index.html'
import sidenavModule from 'angle-grinder/src/ng/sidenav'
import appbarModule from './appbar'

// import appRoot from '../routerStates.js'
import appState from 'angle-grinder/src/tools/AppState'

class controller {
  constructor() {
    this.msg = 'hello'
    this.appState = appState
  }

  $onInit() {
    this.theme = 'white'
    this.state = false
    this.menuTitle = 'menu'
    this.settings = {
      close: true,
      closeIcon: 'fa fa-times'
    }
    this.items = [
      {
        name: 'first item',
        link: '//google.com',
        icon: 'fa fa-google',
        target: '_blank'
      },
      {
        name: 'second item',
        link: '',
        icon: '',
        target: ''
      }
    ]
  }
}

export default angular
  .module('demo.fresh', [sidenavModule, appbarModule])
  .component('freshApp', { template, controller })
  .name
