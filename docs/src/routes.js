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
      template: require("./controllers/gridExample/list.html"),
      controller: "gridExample.ListCtrl",
      controllerAs: "$ctrl"
    }).when("/examples/usersDialog", {
      template: require("./controllers/usersDialog/list.html"),
      controller: "usersDialog.ListCtrl"
    }).when("/examples/users", {
      template: require("./controllers/users/list.html"),
      controller: "users.ListCtrl"
    }).when("/examples/users/create", {
      template: require("./controllers/users/form.html"),
      controller: "users.FormCtrl",
      resolve: { user: ["Users", Users => new Users()]
    }
    })

    .when("/examples/users/:id", {
      template: require("./controllers/users/show.html"),
      controller: "users.ShowCtrl",
      resolve: { user: [
        "$route", "userResolver", ($route, userResolver) => userResolver($route.current.params.id)
      ]
    }
    })

    .when("/examples/users/:id/edit", {
      template: require("./controllers/users/form.html"),
      controller: "users.FormCtrl",
      resolve: { user: [
        "$route", "userResolver", ($route, userResolver) => userResolver($route.current.params.id)
      ]
    }
    })

    .when("/examples/fileUpload", {
      template: require("./controllers/fileUpload/index.html"),
      controller: "fileUpload.IndexCtrl"
    }).when("/examples/tabs", {
      template: require("./controllers/tabs/index.html"),
      controller: "tabs.IndexCtrl"
    }).when("/examples/panels", {
      template: require("./controllers/panels/index.html"),
      controller: "panels.IndexCtrl"
    }).when("/examples/xeditable", {
      template: require("./controllers/xeditable/index.html"),
      controller: "xeditable.IndexCtrl"
    }).otherwise({redirectTo: "/"})
]);
