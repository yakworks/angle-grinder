angular.module("tutorial")
  .constant('RestContext', 'api')
  .controller('ListCtrl', ListCtrl)
  .config([
    "RoutesServProvider", function ( RoutesServ) {
      RoutesServ.setRoutes({contact: {"/": {page: "list"}}});
    }
  ]);
