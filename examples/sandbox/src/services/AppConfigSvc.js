/* @ngInject */
export default class AppConfigSvc {
  constructor() {
    this.config = {}
    this.config.url = 'https://github.com/preboot/angular-webpack'
    this.config.title = 'Hello from the service'
  }
}

// AppCtrl.$inject = ['randomNames'];
