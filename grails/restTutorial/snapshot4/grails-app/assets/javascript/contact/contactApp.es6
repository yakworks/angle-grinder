angular.module("contactApp", ["angleGrinder"])
.constant('RestContext', 'api')
.controller('ListCtrl', ListCtrl)
.config([
  "$routeProvider", "ResourceTemplateServ", function($routeProvider, ResourceTemplateServ) {
    return $routeProvider.when("/", {
      templateUrl: ResourceTemplateServ("/contact", "list"),
      controller: "ListCtrl"
    }).otherwise({
      redirectTo: "/"
    });
  }
]);
