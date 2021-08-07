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
      <button class="card-header-icon" aria-label="edit"
        ng-click="form.$show()"
        ng-if="!form.$visible">
        <span class="icon"><i class="far fa-edit"></i></span>
      </button>
    </header>
    `
  })
])
