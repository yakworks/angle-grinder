import angular from 'angular'
import _ from 'lodash'
import appName from './app.module'
import './config.router'
import appState from 'angle-grinder/src/tools/AppState'
import {setClientConfig} from "../../../src/dataApi/ky";

const app = angular.module(appName)
// export default app.name

app.run(function($rootScope, $state, $stateParams) {
  // Set the ui-router state vars to global root to access them from any scope
  $rootScope.$state = $state
  appState.$state = $state
  $rootScope.$stateParams = $stateParams

  const userInfo = {
    id: '123',
    name: 'Peter Schiff',
    job: 'Bot Wrangler',
    picture: 'app/img/user/02.jpg'
  }
  _.merge(appState.user, userInfo)

  const defaultLayout = {
    isNavbarFixed: true, // true if you want to initialize the template with fixed header
    isSidenavFixed: true, // true if you want to initialize the template with fixed sidebar
    isFooterFixed: false, // true if you want to initialize the template with fixed footer
    theme: 'light', // indicate the theme chosen for your project
    logo: 'assets/images/logos/yak-white.svg', // relative path of the project logo
    logoWidth: 150,
    logoCollapsed: 'assets/images/yak-white.png', // relative path of the collapsed logo
    logoCollapsedHeight: 23 // relative path of the collapsed logo
  }

  _.merge(appState.layout, defaultLayout)

  const info = {
    name: 'Yak Works Template', // name of your project
    author: 'YakWorks', // author's name or company name
    description: 'Angular Admin Template', // brief description
    version: '1.0', // current version
    year: ((new Date()).getFullYear()) // automatic current year (for copyright information)
  }
  _.merge(appState.info, info)

  // appState defaults
  appState.sidenav.open = true

  $rootScope.appState = appState
  setClientConfig({
    // configData comes from index.html - to be able to change backend url on fly after build, takes data from `config.js` in root folder of the app
    // eslint-disable-next-line no-undef
    prefixUrl: configData.base_url
  })
})
