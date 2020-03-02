import appState from 'angle-grinder/src/tools/AppState'

class controller {
  constructor() {
    this.appState = appState
  }
}

export default angular.module('app.topNavbar',[])
  .component('appTopNavbar', {
    controller,
    template: require('./top-navbar.html')
  })
  .name
