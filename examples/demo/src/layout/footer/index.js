import appState from 'angle-grinder/src/tools/AppState'

class controller {

  constructor() {
    this.year = appState.info.copyrightYear
    this.author = appState.info.author
  }
}

export default angular.module('app.footer',[])
  .component('appFooter', {
    controller,
    template: require('./footer.html')
  })
  .name
