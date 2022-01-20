import appState from '@yakit/ui/AppState'

class controller {
  /* @ngInject */
  constructor($element) {
    this.$element = $element
    this.appState = appState
  }

  get title() {
    return appState.title
  }

  get isEdit() {
    return !!this.appState.$state.$current.params.id
  }

  goToParent() {
    appState.$state.go(appState.$state.$current.parent.abstract)
  }
}

export default angular.module('demo.fresh.appbar', [])
  .component('freshAppbar', {
    controller,
    template: require('./index.html')
  })
  .name
