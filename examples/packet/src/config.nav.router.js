'use strict';
/**
 * WIP, trying to set up so its external config
 */
let app = angular.module('app')
app.controller('SideNavCtrl',
  function ($scope) {

    // .state('app.dashboard', {
    //   url: "/dashboard",
    //   //template: require("./dashboards/dashboard.html"),
    //   template: require("./dashboards/dashyak.html"),
    //   //resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
    //   title: 'Dashboard',
    //   ncyBreadcrumb: {
    //     label: 'Dashboard'
    //   }
    // })
    // $stateProvider.state('app', {
    //   url: "/app",
    //   template: require("./app.html"),
    //   //resolve: loadSequence('chartjs', 'chart.js', 'chatCtrl'),
    //   abstract: true
    // })

    // let appNav = {
    //   'app': {
    //     'url':"/app",
    //     items: {
    //       'dashboard': {
    //         title: "Dashboard",
    //         url: "/dashboard",
    //         templateUrl: "router/dashboard.html",
    //         icon: "fa fa-home",
    //         sref: "app.dashboard"
    //       },
    //       'elements': {
    //         title: "Dashboard",
    //         url: "/dashboard",
    //         templateUrl: "router/dashboard.html",
    //         icon: "fa fa-home",
    //         sref: "app.dashboard"
    //       },
    //     }
    //   }
    // }

    $scope.sideMenuItems = [
      {
        title: "Dashboard",
        url: "/dashboard",
        templateUrl: require("./dashboards/dashyak.html"),
        icon: "fa fa-home",
        sref: "app.dashboard"
      },
      {
        title: "Elements",
        icon: "fa fa-flask",
        sref: "app.ui",
        items: [
          {
            title: "Alerts",
            sref: "app.ui.alerts"
          },
          {
            title: "Elements",
            sref: "app.ui.elements"
          },
          {
            title: "Buttons",
            sref: "app.ui.buttons"
          },
          {
            title: "Icons",
            sref: "app.ui.icons"
          },
          {
            title: "Letter Icons",
            sref: "app.ui.letter-icons"
          },
          {
            title: "Modals",
            sref: "app.ui.modals"
          },
          {
            title: "Panels",
            sref: "app.ui.panels"
          },
          {
            title: "Tabs",
            sref: "app.ui.tabs"
          },
          {
            title: "Toggle",
            sref: "app.ui.toggle"
          }
        ]
      },
      {
        title: "Forms",
        icon: "fa fa-file-text-o",
        sref: "app.forms",
        items: [
          {
            title: "Form Examples",
            sref: "app.forms.examples"
          },
          {
            title: "Form AG Inputs",
            sref: "app.forms.input-components"
          },
          {
            title: "Form Elements",
            sref: "app.forms.elements"
          },
          {
            title: "Xeditable",
            sref: "app.forms.xeditable"
          },

        ]
      },
      {
        title: "Grids",
        icon: "fa fa-table ",
        sref: "app.grids",
        items: [
          {
            title: "Edit",
            sref: "app.grids.edit"
          },
          {
            title: "Panel",
            sref: "app.grids.Panel"
          }
        ]
      },
    ];
  }
);


