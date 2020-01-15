import angular from 'angular'
import exAppMod from './example.module'

angular.module(exAppMod).config([
  "$provide", "$routeProvider",
  ($provide, $routeProvider) => $routeProvider
    .when("/",
      {template: require("./templates/angleGrinder.html")})

    .when("/documentation",
      {template: require("./templates/documentation.html")})

    .when("/examples",
      {redirectTo: "/examples/gridExample"})

    .when("/examples/gridExample", {
      template: require("./templates/gridExample/list.html"),
      controller: "gridExample.ListCtrl"
    }).when("/examples/usersDialog", {
      template: require("./templates/usersDialog/list.html"),
      controller: "usersDialog.ListCtrl"
    }).when("/examples/users", {
      template: require("./templates/users/list.html"),
      controller: "users.ListCtrl"
    }).when("/examples/users/create", {
      template: require("./templates/users/form.html"),
      controller: "users.FormCtrl",
      resolve: { user: ["Users", Users => new Users()]
    }
    })

    .when("/examples/users/:id", {
      template: require("./templates/users/show.html"),
      controller: "users.ShowCtrl",
      resolve: { user: [
        "$route", "userResolver", ($route, userResolver) => userResolver($route.current.params.id)
      ]
    }
    })

    .when("/examples/users/:id/edit", {
      template: require("./templates/users/form.html"),
      controller: "users.FormCtrl",
      resolve: { user: [
        "$route", "userResolver", ($route, userResolver) => userResolver($route.current.params.id)
      ]
    }
    })

    .when("/examples/fileUpload", {
      template: require("./templates/fileUpload/index.html"),
      controller: "fileUpload.IndexCtrl"
    }).when("/examples/tabs", {
      template: require("./templates/tabs/index.html"),
      controller: "tabs.IndexCtrl"
    }).when("/examples/panels", {
      template: require("./templates/panels/index.html"),
      controller: "panels.IndexCtrl"
    }).when("/examples/xeditable", {
      template: require("./templates/xeditable/index.html"),
      controller: "xeditable.IndexCtrl"
    }).otherwise({redirectTo: "/"})
]);
