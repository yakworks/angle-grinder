import angular from 'angular'
import appRoot from '../../routerStates.js'

/**
 * Clip-Two Main Controller
 */
const app = angular.module('app')
app.controller('SideNavCtrl',
  function($scope) {
    $scope.sideMenuItems = appRoot.children
    console.log('$scope.sideMenuItems ', $scope.sideMenuItems)
    // [
    //   {
    //     title: "Dashboard",
    //     url: "/dashboard",
    //     //templateUrl: require("./dashboards/dashyak.html"),
    //     icon: "fa fa-home",
    //     sref: "app.dashboard"
    //   },
    //   {
    //     title: "Elements",
    //     icon: "fa fa-flask",
    //     sref: "app.ui",
    //     children: [
    //       {
    //         title: "Alerts",
    //         sref: "app.ui.alerts"
    //       },
    //       {
    //         title: "Elements",
    //         sref: "app.ui.elements"
    //       },
    //       {
    //         title: "Buttons",
    //         sref: "app.ui.buttons"
    //       },
    //       {
    //         title: "Icons",
    //         sref: "app.ui.icons"
    //       },
    //       {
    //         title: "Letter Icons",
    //         sref: "app.ui.letter-icons"
    //       },
    //       {
    //         title: "Modals",
    //         sref: "app.ui.modals"
    //       },
    //       {
    //         title: "Panels",
    //         sref: "app.ui.panels"
    //       },
    //       {
    //         title: "Tabs",
    //         sref: "app.ui.tabs"
    //       },
    //       {
    //         title: "Toggle",
    //         sref: "app.ui.toggle"
    //       }
    //     ]
    //   },
    //   {
    //     title: "Forms",
    //     icon: "fa fa-file-text-o",
    //     sref: "app.forms",
    //     children: [
    //       {
    //         title: "Form Examples",
    //         sref: "app.forms.horizontal-examples"
    //       },
    //       {
    //         title: "Form AG Inputs",
    //         sref: "app.forms.input-components"
    //       },
    //       {
    //         title: "Form Elements",
    //         sref: "app.forms.elements"
    //       },
    //       {
    //         title: "Xeditable",
    //         sref: "app.forms.xeditable"
    //       },

    //     ]
    //   },
    //   {
    //     title: "Grids",
    //     icon: "fa fa-table ",
    //     sref: "app.grids",
    //     children: [
    //       {
    //         title: "Edit",
    //         sref: "app.grids.edit"
    //       },
    //       {
    //         title: "Panel",
    //         sref: "app.grids.Panel"
    //       }
    //     ]
    //   },
    // ];
  }
)
