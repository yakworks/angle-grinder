angular.module("contactApp", ["angleGrinder"]);
app.constant('RestContext', 'api');
angular.module("contactApp").config([
  "$routeProvider", "ResourceTemplateServ", function($routeProvider, ResourceTemplateServ) {
    return $routeProvider.when("/", {
      templateUrl: ResourceTemplateServ("/contact", "list"),
      controller: "ListCtrl"
    }).otherwise({
      redirectTo: "/"
    });
  }
]);
