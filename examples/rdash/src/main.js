import angular from 'angular'
import rmod from './module'
import * as directives from './directives'
import MasterCtrl from './controllers/MasterCtrl'
import AlertCtrl from './controllers/alert-ctrl'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/animate.min.css'
import './assets/css/paper-dashboard.css'
import 'font-awesome/css/font-awesome.css'
import './assets/css/themify-icons.css'
import './assets/css/app.css'
//import 'rdash-ui/dist/css/rdash.css'


angular.module(rmod).directive('app', () => {
  return {
    template: require('./app.html'),
    controller: MasterCtrl,
    //controllerAs: 'appCtrl'
  }
})
.directive('sidebarRdash', () => {
  return {
    template: require('./sidebar/sidebar.comp1.html'),
  }
})
.directive('sidebarPaper', () => ({
  template: require('./sidebar/sidebar.comp.paper.html'),
}))
.directive('navbarTop', () => ({
  template: require('./sidebar/navbar.comp.html'),
}))

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes
    $urlRouterProvider.otherwise('/');
    // Application routes
    $stateProvider
      .state('index', {
        name: 'dashboard',
        url: '/',
        templateUrl: 'templates/dashboard.html'
      })
      .state('tables', {
        name: 'tables',
        url: '/tables',
        templateUrl: 'templates/tables.html'
      });
  }
]);


export default rmod
