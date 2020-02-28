import appState from 'angle-grinder/src/tools/AppState'
import appRoot from '../../routerStates.js'

class controller {

  constructor() {
    this.appState = appState
    this.sideMenuItems = appRoot.children
  }
}

export default angular.module('app.sidebar',[])
  .component('appSidebar', {
    controller,
    template: require('./index.html')
  })
  .name
