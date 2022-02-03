import appState from '@yakit/ui/AppState'

class controller {
  constructor($rootScope) {
    this.appState = appState
    this.layout = appState.layout
    this.rootScope = $rootScope
  }

  toggleSidenav() {
    this.appState.sidenav.open = !this.appState.sidenav.open
  }

  toggleRightSidebar() {
    this.rootScope.toggle('off-sidebar')
  }
}

export default angular.module('app.appbar', [])
  .component('appBar', {
    controller,
    controllerAs: '$appBarCtrl',
    template: require('./appbar.html')
  })
  .name
