import appState from 'angle-grinder/src/tools/AppState'

class controller {

  constructor() {
    this.year = appState.app.copyrightYear
    this.author = appState.app.author
  }
}

export default angular.module('app.footer',[])
  .component('appFooter', {
    controller,
    template: require('./footer.html')
  })
  .name
