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
    //template: require("./dashboards/dashboard.html"),
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
  .state('app.ui.modals', {
    url: '/modals',
    template: require("./ui/modals/ui_modals.html"),
    title: 'Modals',
    ncyBreadcrumb: {
      label: 'Modals'
    }
  })
  .state('app.ui.panels', {
    url: '/panels',
    template: require("./ui/panels/ui_panels.html"),
    title: 'Panels',
    ncyBreadcrumb: {
      label: 'Panels'
    }
  })
  .state('app.ui.toggle', {
    url: '/toggle',
    template: require("./ui/toggle/ui_toggle.html"),
    title: 'Toggle',
    ncyBreadcrumb: {
      label: 'Toggle'
    }
  })
  .state('app.ui.tabs', {
    url: '/tabs',
    template: require("./ui/tabs/ui_tabs.html"),
    title: 'Tabs',
    ncyBreadcrumb: {
      label: 'Tabs'
    }
  })
  /** FORMS */
  .state('app.forms', {
    url: '/grids',
    template: '<div ui-view class="fade-in-up"></div>',
    title: 'Grids',
    ncyBreadcrumb: {
      label: 'Grids'
    }
  })
  .state('app.forms.elements', {
    url: '/elements',
    template: require("./forms/form_elements.html"),
    title: 'Form Elements',
    ncyBreadcrumb: {
      label: 'Elements'
    }
  })
  .state('app.forms.xeditable', {
    url: '/xeditable',
    template: require("./forms/form_xeditable.html"),
    title: 'Form Xeditable',
    ncyBreadcrumb: {
      label: 'Xeditable'
    }
  })
  .state('app.forms.cust', {
    url: '/cust',
    template: require("./forms/customer.html"),
    title: 'Form Cust Example',
    ncyBreadcrumb: {
      label: 'cust example'
    }
  })

  /** GRIDS */
  .state('app.grids', {
    url: '/grids',
    template: '<div ui-view class="fade-in-up"></div>',
    title: 'Grids',
    ncyBreadcrumb: {
      label: 'Grids'
    }
  })
  .state('app.grids.edit', {
    url: '/edit',
    template: require("./grids/list.html"),
    title: 'Edit',
    controller: "gridExample.ListCtrl",
    controllerAs: "$ctrl",
    ncyBreadcrumb: {
      label: 'Edit'
    }
  })
  // .state('app.grids.panel', {
  //   url: '/panel',
  //   template: require("./grids/panel.html"),
  //   title: 'Panel',
  //   ncyBreadcrumb: {
  //     label: 'Panel'
  //   }
  // })
})
