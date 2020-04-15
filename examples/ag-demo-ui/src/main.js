import '~/vendor'
import angular from 'angular'
import uibootstrap from 'angular-ui-bootstrap' // uibootstrap is just a string with the name of the module
import Org from './org/index'
import OrgTab from './tabbedOrg/index'
import User from './user/index'
import OrgShowCase from './orgShowCase/index'
import '~/styles/vendor.css.js'
import '~/styles/all.scss' // using ~/ points to the main projects src dir
// import './app.css'
import './AppCtrl'
import './app.config'

const forms = angular.module('angleGrinder.forms')

// Just an example for configuring dates formats
forms.config([
  'agDateProvider', function(provider) {
    provider.setViewFormat('MM/DD/YY')
    return provider.setLocalDateFormat('YYYY-MM-DD')
  }
])

/*
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
*/
