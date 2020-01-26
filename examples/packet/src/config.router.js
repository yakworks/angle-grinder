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
    template: require("./dashboards/dashboard.html"),
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
  .state('app.ui.alerts', {
    url: '/alerts',
    template: require("./ui/alerts/alerts.html"),
    title: 'Alerts',
    ncyBreadcrumb: {
      label: 'Alerts'
    }
  })
  .state('app.ui.elements', {
    url: '/elements',
    template: require("./ui/elements/ui_elements.html"),
    title: 'Elements',
    icon: 'ti-layout-media-left-alt',
    ncyBreadcrumb: {
      label: 'Elements'
    }
  })
  .state('app.ui.buttons', {
    url: '/buttons',
    template: require("./ui/buttons/ui_buttons.html"),
    title: 'Buttons',
    ncyBreadcrumb: {
      label: 'Buttons'
    }
  })
  .state('app.ui.icons', {
    url: '/icons',
    template: require("./ui/icons/ui_icons.html"),
    title: 'Icons',
    ncyBreadcrumb: {
      label: 'Icons'
    }
  })
  .state('app.ui.letter-icons', {
    url: '/letter-icons',
    component: 'letterIcons',
    title: 'Letter Icons',
    ncyBreadcrumb: {
      label: 'Letter Icons'
    }
  })
})
