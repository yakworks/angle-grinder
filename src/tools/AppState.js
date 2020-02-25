/**
 * Generic singleton global for app state and ui-router $state
 * replaces the $rootScope that was overused in angular
 */
// import _ from 'lodash'

class AppState {
  // the ui-router state instance
  $state

  // the app object
  app = {
    name: 'Demo', // name of your project
    author: 'YakWorks', // author's name or company name
    description: 'Angular Grinder Angular Library', // brief description
    version: '4.0.x'
  }

  // currently logged in user info
  user = {}

  static factory() {
    return new AppState()
  }

  constructor() {
    this._debug = false
  }

  /**
   * the title of the current active state page/component
   */
  get title() {
    return this.$state.current.data.title
  }

  /**
   * construct the page title from app name and title to show on head and browser tab
   */
  get pageTitle() {
    return this.app.name + ' - ' + (this.title || this.app.description)
  }

  get version() {
    // TODO for now hardcoded, should read from config or server files
    return this.app.version
  }
}

const _instance = AppState.factory()

export default _instance
