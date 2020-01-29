import '~/vendor'
import angular from 'angular'
import exampleAppName from './example.module'
import routes from './routes'
import eg from './grids/exampleGrid'
import udg from './grids/usersDialogGrid'
import ug from './grids/usersGrid'
import './controllers'
import SidebarCtrl from './controllers/sidebarCtrl'
import 'google-code-prettify/src/prettify'
// Styles
import '~/styles/vendor.css.js'
import '~/styles/all.css.js'
import '../../examples/packet/src/assets/styles.scss'
import '../../examples/packet/src/assets/plugins.scss'
import './docs.css'

const emod = angular.module(exampleAppName)

emod.controller('testController', function() {
    this.hello = 'hello 1'
    console.log('hello 1')
  })
  .controller('testController2', function() {
    this.hello = 'hello 2!'
    console.log('hello 2')
  })
  .controller('testController3', $scope => {
    $scope.hello = 'hello 3!'
    console.log('hello 3')
  })

emod.controller('SidebarCtrl', SidebarCtrl)

const app = () => {
  return {
    template: require('./app.html'),
    //controller: 'AppCtrl',
    //controllerAs: 'appCtrl'
  }
}

// the es6 pattern is to setup the module and then export the string name of the module
emod.directive('app', app)
  // .service('appConfigSvc', AppConfigSvc)
  // .controller('AppCtrl', AppCtrl)

emod.directive('navbarTop', () => {
  return {
    template: require('./templates/navbarTop.html'),
    //controller: 'AppCtrl',
    //controllerAs: 'appCtrl'
  }
})

export default exampleAppName
