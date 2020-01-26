'use strict';
/**
 * Clip-Two Main Controller
 */
let app = angular.module('app')
app.controller('SideNavCtrl',
  function ($scope) {

    $scope.sideMenuItems = [
      {
        title: "Dashboard",
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
            title: "Tabs",
            sref: "app.ui.tabs"
          },
          {
            title: "Toggle",
            sref: "app.ui.toggle"
          }
        ]
      }
    ];
  }
);


