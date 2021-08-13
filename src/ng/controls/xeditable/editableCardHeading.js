import angular from 'angular'

var app = angular.module('ag.xeditable')

app.directive('editableCardHeading', [
  () => ({
    restrict: 'A',
    transclude: true,
    replace: true,

    scope: { form: '=editableCardHeading' },

    template: `\
    <header class="card-header">
      <p class="card-header-title" ng-transclude></p>
      <ag-button button-class="card-header-icon"
        ng-if="!form.$visible"
        ng-click="form.$show()"
        icon="mdi mdi-pencil-outline">
      </ag-button>
    </header>
    `
  })
])
