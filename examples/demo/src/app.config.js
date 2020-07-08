import angular from 'angular'
import _ from 'lodash'
import appName from './app.module'
import './config.router'
import appState from 'angle-grinder/src/tools/AppState'

const app = angular.module('app')
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
})

// translate config
app.config(function($translateProvider) {
  // prefix and suffix information  is required to specify a pattern
  // You can simply use the static-files loader with this pattern:
  $translateProvider.useStaticFilesLoader({
    prefix: 'assets/i18n/',
    suffix: '.json'
  })

  // Since you've now registered more then one translation table, angular-translate has to know which one to use.
  // This is where preferredLanguage(langKey) comes in.
  $translateProvider.preferredLanguage('en')

  // Store the language in the local storage
  // $translateProvider.useLocalStorage();

  // Enable sanitize
  $translateProvider.useSanitizeValueStrategy('sanitize')
})

// Angular-Loading-Bar
// configuration
app.config(function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeBar = true
  cfpLoadingBarProvider.includeSpinner = true
})

app.config(function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/)
})

// Angular-breadcrumb
// configuration
app.config(function($breadcrumbProvider) {
  $breadcrumbProvider.setOptions({
    template: '<ul class="breadcrumb"><li><a ui-sref="app.dashboard"><i class="fa fa-home margin-right-5 text-large text-dark"></i>Home</a></li><li ng-repeat="step in steps">{{step.ncyBreadcrumbLabel}}</li></ul>'
  })
})
// ng-storage
// set a prefix to avoid overwriting any local storage variables
// app.config(function ($localStorageProvider) {
//   $localStorageProvider.setKeyPrefix('yak-layout');
// });
// filter to convert html to plain text
app.filter('htmlToPlaintext', function() {
  return function(text) {
    return String(text).replace(/<[^>]+>/gm, '')
  }
})
// Custom UI Bootstrap Calendar Popup Template
// app.run(function($templateCache) {
//   // let url = './views/partials/sidebar.html'
//   $templateCache.put('./app/sidebar/index.html', require('./packet/sidenav/index.html'))
//   $templateCache.put('./views/partials/top-navbar.html', require('./views/partials/top-navbar.html'))
//   $templateCache.put('./views/partials/main-content.html', require('./views/partials/main-content.html'))
//   $templateCache.put('./views/partials/footer.html', require('./views/partials/footer.html'))
//   $templateCache.put('./views/partials/settings.html', require('./views/partials/settings.html'))
//   $templateCache.put('./views/partials/off-sidebar.html', require('./views/partials/off-sidebar.html'))
// })

// see https://stackoverflow.com/questions/45827733/replacing-http-with-fetch-api
app.run(normalizePromiseSideEffects);

normalizePromiseSideEffects.$inject = ['$rootScope'];

function normalizePromiseSideEffects($rootScope) {
  attachScopeApplicationToPromiseMethod('then');
  attachScopeApplicationToPromiseMethod('catch');
  attachScopeApplicationToPromiseMethod('finally');

  function attachScopeApplicationToPromiseMethod(methodName) {
    const NativePromiseAPI = window.Promise;
    const nativeImplementation = NativePromiseAPI.prototype[methodName];

    NativePromiseAPI.prototype[methodName] = function(...promiseArgs) {
      const newPromiseArgs = promiseArgs.map(wrapFunctionInScopeApplication);
      return nativeImplementation.bind(this)(...newPromiseArgs);
    };
  }

  function wrapFunctionInScopeApplication(fn) {
    if (!_.isFunction(fn) || fn.isScopeApplicationWrapped) {
      return fn;
    }

    const wrappedFn = (...args) => {
      const result = fn(...args);
      // this API is used since it's $q was using in AngularJS src
      $rootScope.$evalAsync();
      return result;
    };
    wrappedFn.isScopeApplicationWrapped = true;
    return wrappedFn;
  }
}
