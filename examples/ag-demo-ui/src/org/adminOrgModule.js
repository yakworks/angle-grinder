import angular from 'angular'
import angleGrinder from '~/angle-grinder'
import contactModule from '../contact'
import noteModule from '../note'

const MOD_NAME = 'admin.org'
const org = angular.module(MOD_NAME, [angleGrinder, contactModule, noteModule])
org.config(function(resourceBuilderProvider) {
  resourceBuilderProvider.setRestContext('/api')
})
org.config(function($stateProvider, $urlRouterProvider) {
  console.log('orgAdmin App config')
  const list = {
    name: 'list',
    controller: 'org.ListCtrl',
    url: '/',
    template: require('../../public/templates/org/list.html')
  }

  const create = {
    name: 'create',
    url: '/create',
    controller: 'org.FormCtrl',
    template: require('../../public/templates/org/form.html'),
    resolve: { org: ['Resource', Resource => new Resource()] }
  }

  const show = {
    name: 'show',
    url: '/{id}',
    template: require('../../public/templates/tabbedOrg/show.html'),
    resolve: {
      org: [
        '$transition$', 'resourceResolver', ($transition$, resourceResolver) => resourceResolver($transition$.params().id)
      ]
    }
  }

  const edit = {
    name: 'edit',
    url: '/{id}/edit',
    template: require('../../public/templates/org/form.html'),
    controller: 'org.FormCtrl',
    resolve: {
      org: [
        '$transition$', 'resourceResolver', ($transition$, resourceResolver) => resourceResolver($transition$.params().id)
      ]
    }
  }
  $stateProvider.state(list)
  $stateProvider.state(create)
  $stateProvider.state(show)
  $urlRouterProvider.otherwise('/')
})

/* org.config([
  "$routeProvider", $routeProvider => $routeProvider
    .when("/", {
      templateUrl: "../templates/org/list.html",
      controller: "org.ListCtrl"
    }).when("/create", {
      templateUrl: "../templates/org/form.html",
      controller: "org.FormCtrl",
      resolve: { org: ["Resource", Resource => new Resource()]
      }
    })

    .when("/:id", {
      templateUrl: "../templates/tabbedOrg/show.html",
      controller: "org.ShowCtrl",
      resolve: { org: [
          "$route", "resourceResolver", ($route, resourceResolver) => resourceResolver($route.current.params.id)
        ]
      }
    })

    .when("/:id/edit", {
      templateUrl: "../templates/org/form.html",
      controller: "org.FormCtrl",
      resolve: { org: [
          "$route", "resourceResolver", ($route, resourceResolver) => resourceResolver($route.current.params.id)
        ]
      }
    })

    .otherwise({redirectTo: "/"})
]); */
export default MOD_NAME
