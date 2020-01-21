import angular from 'angular'

const app = angular.module('app')
/**
 * Config for the router
 */
app.config(function ($stateProvider, $urlRouterProvider) {

  //$urlRouterProvider.otherwise("/app/ui/elements");
  $urlRouterProvider.otherwise("/app/dashboard");

  $stateProvider.state('app', {
    url: "/app",
    template: require("./app.html"),
    //resolve: loadSequence('chartjs', 'chart.js', 'chatCtrl'),
    abstract: true
  })
  .state('app.dashboard', {
    url: "/dashboard",
    template: require("./dashboards/dashyak.html"),
    //resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
    title: 'Dashboard',
    ncyBreadcrumb: {
      label: 'Dashboard'
    }
  })
  .state('app.ui', {
    url: '/ui',
    template: '<div ui-view class="fade-in-up"></div>',
    title: 'UI Elements',
    ncyBreadcrumb: {
      label: 'UI Elements'
    }
  })
  .state('app.ui.elements', {
    url: '/elements',
    template: require("./ui/elements/ui_elements.html"),
    //templateUrl: "assets/views/ui_elements.html",
    title: 'Elements',
    icon: 'ti-layout-media-left-alt',
    ncyBreadcrumb: {
      label: 'Elements'
    }
  })
  // .state('app.ui.buttons', {
  //   url: '/buttons',
  //   templateUrl: "assets/views/ui_buttons.html",
  //   title: 'Buttons',
  //   resolve: loadSequence('laddaCtrl'),
  //   ncyBreadcrumb: {
  //     label: 'Buttons'
  //   }
  // })
})
