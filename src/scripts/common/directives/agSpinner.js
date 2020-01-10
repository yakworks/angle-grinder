/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const spinner = angular.module('angleGrinder.spinner', ['angleGrinder.common'])

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
