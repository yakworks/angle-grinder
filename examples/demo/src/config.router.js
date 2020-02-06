import angular from 'angular'

import appRoot from './routerStates.js'

const app = angular.module('app')
/**
 * Config for the router
 */
app.config(function ($stateProvider, $urlRouterProvider, stateHelperProvider) {

  //$urlRouterProvider.otherwise("/app/ui/elements");
  $urlRouterProvider.otherwise("/app/dashboard");

  stateHelperProvider.state(appRoot)

  // $stateProvider.state('app.grids.panel', {
  //   url: '/panel',
  //   template: require("./grids/panel.html"),
  //   title: 'Panel',
  //   ncyBreadcrumb: {
  //     label: 'Panel'
  //   }
  // })

})

//Custom UI Bootstrap Calendar Popup Template
app.run(function ($templateCache) {
  //let url = './views/partials/sidebar.html'
  $templateCache.put('route/app.forms.input-components.html', require("./forms/input-components/index.html"))
});
