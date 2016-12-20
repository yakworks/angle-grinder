angular.module("contactApp", ["angleGrinder"])
  .constant('RestContext', 'api')
  .controller('ListCtrl', ListCtrl)
  .config([
    "RoutesServProvider", function ( RoutesServ) {
      RoutesServ.setRoutes({contact: {"/": {page: "list"}}});
    }
  ]);
