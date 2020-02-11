import 'angular'
import 'angular-mocks'
import app from './app'

describe('app', () => {
  var $controller, $rootScope, $scope, appConfigSvc
  beforeEach(angular.mock.module(app))

  beforeEach(inject(function(_$controller_, _$rootScope_, _appConfigSvc_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_
    $rootScope = _$rootScope_
    $scope = $rootScope.$new()
    appConfigSvc = _appConfigSvc_
    // $scope.selectOptions = {foo: "bar"}
  }))

  describe('appConfigSvc', () => {
    it('should contain the starter url', () => {
      expect(appConfigSvc.config.url).toBe('https://github.com/preboot/angular-webpack')
    })
  })

  describe('AppCtrl', () => {
    let ctrl

    beforeEach(() => {
      ctrl = $controller('AppCtrl', { $scope, appConfigSvc })
    })

    it('should contain the starter url', () => {
      expect(ctrl.config.url).toBe('https://github.com/preboot/angular-webpack')
    })
  })
})
