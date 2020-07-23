import appState from 'angle-grinder/src/tools/AppState'

class controller {
  constructor($element) {
    this.$element = $element
    this.appState = appState
  }

  get title() {
    return appState.title
  }

}

export default angular.module('demo.fresh.appbar', [])
  .component('freshAppbar', {
    controller,
    template: require('./index.html')
  })
  .name
