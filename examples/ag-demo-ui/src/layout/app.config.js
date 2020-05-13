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
    isSidebarFixed: true, // DEPRECATED true if you want to initialize the template with fixed sidebar
    isSidenavFixed: true, // true if you want to initialize the template with fixed sidebar
    isFooterFixed: false, // true if you want to initialize the template with fixed footer
    theme: 'light', // indicate the theme chosen for your project
    logo: 'assets/images/yak-logo1.png', // relative path of the project logo
    logoWidth: 150,
    logoCollapsed: 'public/assets/yak-white.png', // relative path of the collapsed logo
    logoCollapsedHeight: 23 // relative path of the collapsed logo
  }
  _.merge(appState.layout, defaultLayout)

  const info = {
    name: 'Grails Yak Works Template', // name of your project
    author: 'YakWorks', // author's name or company name
    description: 'Grails - Angular Admin Template', // brief description
    version: '1.0', // current version
    year: ((new Date()).getFullYear()) // automatic current year (for copyright information)
  }
  _.merge(appState.info, info)

  // GLOBAL APP SCOPE
  // set below basic information
  const appConfig = {
    name: 'Grails Yak Works Demo', // name of your project
    author: 'YakWorks', // author's name or company name
    description: 'Grails Angular Bootstrap Demo', // brief description
    version: '1.0', // current version
    year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
    isMobile: (function() { // true if the browser is a mobile device
      var check = false
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        check = true
      };
      return check
    })(),
    layout: {}
  }
  _.merge(appConfig.layout, defaultLayout)
  $rootScope.app = appConfig

  $rootScope.user = {
    name: 'Peter',
    job: 'ng-Dev',
    picture: 'app/img/user/02.jpg'
  }

  // appState defaults
  appState.sidenav.open = true

  $rootScope.appState = appState
})

app.constant('APP_MEDIAQUERY', {
  desktopXL: 1200,
  desktop: 992,
  tablet: 768,
  mobile: 480
})
// Angular-Loading-Bar
// configuration
app.config(function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeBar = true
  cfpLoadingBarProvider.includeSpinner = false
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
app.run(function($templateCache) {
  // let url = './views/partials/sidebar.html'
  $templateCache.put('./app/sidebar/index.html', require('./packet/sidenav/index.html'))
  $templateCache.put('./views/partials/top-navbar.html', require('./views/partials/top-navbar.html'))
  $templateCache.put('./views/partials/main-content.html', require('./views/partials/main-content.html'))
  $templateCache.put('./views/partials/footer.html', require('./views/partials/footer.html'))
  $templateCache.put('./views/partials/settings.html', require('./views/partials/settings.html'))
  $templateCache.put('./views/partials/off-sidebar.html', require('./views/partials/off-sidebar.html'))
})

// Custom UI Bootstrap Calendar Popup Template
app.run(function($templateCache) {
  $templateCache.put('uib/template/datepickerPopup/popup.html',
    '<div>\n' +
    "  <ul class=\"uib-datepicker-popup clip-datepicker dropdown-menu\" dropdown-nested ng-if=\"isOpen\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\n" +
    '    <li ng-transclude></li>\n' +
    '    <li ng-if="showButtonBar" class="uib-button-bar">\n' +
    '    <span class="btn-group pull-left">\n' +
    "      <button type=\"button\" class=\"btn btn-sm btn-primary btn-o uib-datepicker-current\" ng-click=\"select('today', $event)\" ng-disabled=\"isDisabled('today')\">{{ getText('current') }}</button>\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-primary btn-o uib-clear\" ng-click=\"select(null, $event)\">{{ getText('clear') }}</button>\n" +
    '    </span>\n' +
    "      <button type=\"button\" class=\"btn btn-sm btn-primary pull-right uib-close\" ng-click=\"close($event)\">{{ getText('close') }}</button>\n" +
    '    </li>\n' +
    '  </ul>\n' +
    '</div>\n' +
    '')
  $templateCache.put('uib/template/datepicker/year.html',
    '<table class="uib-yearpicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n' +
    '  <thead>\n' +
    '    <tr>\n' +
    '      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n' +
    '      <th colspan="{{::columns - 2}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n' +
    '      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n' +
    '    </tr>\n' +
    '  </thead>\n' +
    '  <tbody>\n' +
    '    <tr class="uib-years" ng-repeat="row in rows track by $index">\n' +
    '      <td ng-repeat="dt in row" class="uib-year text-center" role="gridcell"\n' +
    '        id="{{::dt.uid}}"\n' +
    '        ng-class="::dt.customClass">\n' +
    '        <button type="button" class="btn btn-default"\n' +
    '          uib-is-class="\n' +
    "            'btn-current' for selectedDt,\n" +
    "            'active' for activeDt\n" +
    '            on dt"\n' +
    '          ng-click="select(dt.date)"\n' +
    '          ng-disabled="::dt.disabled"\n' +
    "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    '      </td>\n' +
    '    </tr>\n' +
    '  </tbody>\n' +
    '</table>\n' +
    '')
  $templateCache.put('uib/template/datepicker/month.html',
    '<table class="uib-monthpicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n' +
    '  <thead>\n' +
    '    <tr>\n' +
    '      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n' +
    '      <th><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n' +
    '      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n' +
    '    </tr>\n' +
    '  </thead>\n' +
    '  <tbody>\n' +
    '    <tr class="uib-months" ng-repeat="row in rows track by $index">\n' +
    '      <td ng-repeat="dt in row" class="uib-month text-center" role="gridcell"\n' +
    '        id="{{::dt.uid}}"\n' +
    '        ng-class="::dt.customClass">\n' +
    '        <button type="button" class="btn btn-default"\n' +
    '          uib-is-class="\n' +
    "            'btn-current' for selectedDt,\n" +
    "            'active' for activeDt\n" +
    '            on dt"\n' +
    '          ng-click="select(dt.date)"\n' +
    '          ng-disabled="::dt.disabled"\n' +
    "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    '      </td>\n' +
    '    </tr>\n' +
    '  </tbody>\n' +
    '</table>\n' +
    '')
})
