import angular from 'angular'
import commonModule from '../commonModule'

const spinner = angular.module(commonModule)

/*
Use css to set the spinner animation image:
```
  li.spinner i.spin:before {
    content: url('/img/ajax-loader.gif')
  }
```
*/
spinner.directive('agSpinner', () => ({
  replace: true,
  restrict: 'E',

  controller: [
    '$scope', 'pendingRequests',
    ($scope, pendingRequests) => $scope.showSpinner = () => pendingRequests.any()
  ],

  template: `\
<li class="spinner">
  <a href="#"><i ng-class="{spin: showSpinner()}"></i></a>
</li>\
`
}))
