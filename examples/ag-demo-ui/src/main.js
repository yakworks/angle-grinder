import angular from 'angular'
import uibootstrap from 'angular-ui-bootstrap' // uibootstrap is just a string with the name of the module
import AppCtrl from './sanityCheck/AppCtrl'
import AppConfigSvc from './sanityCheck/AppConfigSvc'
import '~/styles/all.js' //using ~/ points to the main projects src dir
import './app.css'

const app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'appCtrl'
  }
}

// the es6 pattern is to setup the module and then export the string name of the module
angular.module('app.module', [uibootstrap])
  .directive('app', app)
  .service('appConfigSvc', AppConfigSvc)
  .controller('AppCtrl', AppCtrl)

export default 'app.module'
