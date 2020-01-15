/* @ngInject */
export default class AppCtrl {
  constructor($scope, appConfigSvc) {
    this.config = appConfigSvc.config
    $scope.appConfig = appConfigSvc.config
    // this.url = 'https://github.com/preboot/angular-webpack'
    // this.title = 'Hello from Angular!'
  }
}

// the ngInject prevent us from having to do this
// AppCtrl.$inject = ['randomNames'];
