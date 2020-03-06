import appState from 'angle-grinder/src/tools/AppState'

class controller {
  constructor() {
    this.appState = appState
    this.layout = appState.layout
  }

  toggleSidenav(){
    this.appState.sidenav.open = !this.appState.sidenav.open
  }

}

export default angular.module('app.appbar',[])
  .component('appBar', {
    controller,
    controllerAs: '$appBarCtrl',
    template: require('./appbar.html')
  })
  .name
