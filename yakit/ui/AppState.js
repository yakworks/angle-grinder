/**
 * Generic singleton global for app state and ui-router $state
 * replaces the $rootScope that was overused in angular
 */

class AppState {
  // api url
  apiUrl
  // the ui-router state instance
  $state

  //default dataApiFactory
  dataApiFactory

  // the app object
  info = {
    name: 'Demo', // name of your project
    author: 'YakWorks', // author's name or company name
    description: 'Angular Grinder Angular Library', // brief description
    version: '4.0.x',
    copyrightYear: '2020'
  }

  layout = {
    isNavbarFixed: true, // true if you want to initialize the template with fixed header
    isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
    isSidebarOpen: false, // true if you want to initialize the template with closed sidebar
    isFooterFixed: false // true if you want to initialize the template with fixed footer
    // theme: 'light', // indicate the theme chosen for your project
    // logo: 'assets/images/yak-logo1.png', // relative path of the project logo
    // logoWidth: 150,
    // logoCollapsed: 'assets/images/yak-white.png', // relative path of the collapsed logo
    // logoCollapsedHeight: 23 // relative path of the collapsed logo
  }

  // currently logged in user info
  user = {}

  sidenav = {
    open: true
  }

  static factory() {
    return new AppState()
  }

  constructor() {
    this._debug = false
  }

  /**
   * go to to the page key
   */
  go(pageKey){
    this.$state.go(pageKey)
  }

  /**
   * the title of the current active state page/component
   */
  get title() {
    return this.$state.current?.data?.title
  }

  setCurrentTitle(dataTitle) {
    this.$state.current.data.title = dataTitle
  }

  /**
   * construct the page title from app name and title to show on head and browser tab
   */
  get pageTitle() {
    return this.info.name + ' - ' + (this.title || this.info.description)
  }

  get version() {
    // TODO for now hardcoded, should read from config or server files
    return this.info.version
  }

}

const _instance = AppState.factory()

export default _instance
