import angular from 'angular'
import rmod from './module'
import * as directives from './directives'
import MasterCtrl from './controllers/MasterCtrl'
import AlertCtrl from './controllers/alert-ctrl'
import 'bootstrap/dist/css/bootstrap.css'
import "font-awesome/css/font-awesome.css";
import 'rdash-ui/dist/css/rdash.css'
import './assets/paper-dashboard.css'

const app = () => {
  return {
    template: require('./app.html'),
    controller: MasterCtrl,
    //controllerAs: 'appCtrl'
  }
}

angular.module(rmod).directive('app', app)

angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
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
