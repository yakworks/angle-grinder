import angular from 'angular'

const app = angular.module('app')
/**
 * Config for the router
 */
app.config(function ($stateProvider, $urlRouterProvider, stateHelperProvider) {

  //$urlRouterProvider.otherwise("/app/ui/elements");
  $urlRouterProvider.otherwise("/app/dashboard");

  let dashStates = {
    name: 'dashboard',
    //template: require("./dashboards/dashboard.html"),
    template: require("./dashboards/dashyak.html"),
    //resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
    data:{
      icon: "fa fa-home"
    }
  }

  let formStates = {
    name: 'forms',
    template: '<div ui-view class="fade-in-up"></div>',
    data:{
      icon: "fa fa-home"
    },
    abstract: true,
    children: [
      {
        name: 'input-components',
        template: require("./forms/input-components/index.html")
      },
      {
        name: 'elements',
        template: require("./forms/form_elements.html"),
      },
      {
        name: 'xeditable',
        template: require("./forms/form_xeditable.html"),
        data: { title: 'X-Editable Elements'},
        // ncyBreadcrumb: {
        //   label: 'Grids'
        // },
      },
      {
        name: 'horizontal-examples',
        template: require("./forms/horizontal-examples/index.html"),
      }
    ]
  }

  let uiStates = {
    name: 'ui',
    template: '<div ui-view class="fade-in-up"></div>',
    title: 'UI Elements',
    abstract: true,
    children: [
      {
        name: 'alerts',
        template: require("./ui/alerts/alerts.html"),
      },
      {
        name: 'elements',
        template: require("./ui/elements/ui_elements.html"),
        title: 'Elements',
        icon: 'ti-layout-media-left-alt',
      },
      {
        name: 'buttons',
        template: require("./ui/buttons/ui_buttons.html"),
      },
      {
        name: 'icons',
        template: require("./ui/icons/ui_icons.html"),
      },
      {
        name: 'letter-icons',
        component: 'letterIcons',
      },
      {
        name: 'modals',
        template: require("./ui/modals/ui_modals.html"),
      },
      {
        name: 'panels',
        template: require("./ui/panels/ui_panels.html"),
      },
      {
        name: 'toggle',
        template: require("./ui/toggle/ui_toggle.html"),
      },
      {
        name: 'tabs',
        template: require("./ui/tabs/ui_tabs.html"),
      }
    ]
  }

  let gridsStates = {
    name: 'grids',
    abstract: true,
    template: '<div ui-view class="fade-in-up"></div>',
    //data: { title: 'Grids'},
    // ncyBreadcrumb: {
    //   label: 'Grids'
    // },
    children: [
      {
        name: 'edit',
        template: require("./grids/list.html"),
        controller: "gridExample.ListCtrl",
        controllerAs: "$ctrl",
      }
    ]
  }

  let appRoot = {
    name: 'app',
    url: '/app',
    template: require("./app.html"),
    abstract: true,
    children: [ dashStates, formStates, uiStates, gridsStates ]
  }

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
