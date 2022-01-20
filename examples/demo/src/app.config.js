// import angular from 'angular'
import _ from 'lodash'
import appName from './app.module'
import './config.router'
import appState from '@yakit/ui/AppState'
import apiHolder from '@yakit/core/stores/apiHolder'
import dataApiFactory from './store/dataApiFactory'
import { KyFactory } from "@yakit/core/stores/ky";

KyFactory.enableAuthHeader()
KyFactory.defaults.prefixUrl = configData.base_url

apiHolder.dataApiFactory = dataApiFactory

const app = angular.module(appName)
// export default app.name

app.run(function($rootScope, $state, $stateParams) {

  // window.onbeforeunload = function(){
  //   sessionStorage.setItem("origin", window.location.href);
  // }

  // window.onload = function(){
  //   console.log("************window.location.href", window.location.href)
  //   if(window.location.href == sessionStorage.getItem("origin")){
  //       console.log("************clearing storage", window.location.href)
  //       sessionStorage.clear();
  //   }
  // }

  'ngInject';
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
  // setClientConfig({
  //   // configData comes from index.html - to be able to change backend url on fly after build, takes data from `config.js` in root folder of the app
  //   // eslint-disable-next-line no-undef
  //   prefixUrl: configData.base_url
  // })

})
