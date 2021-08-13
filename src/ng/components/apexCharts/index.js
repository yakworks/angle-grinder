import ApexCharts from 'apexcharts'

export default angular.module('apexcharts', [])
  .directive('apexcharts', function() {
    return {
      restrict: 'EA',
      require: '?options',
      scope: {
        options: '='
      },
      link: function(scope, element, attr) {

        if (scope.options == null) {
          return
        }

        element[0].style.display = 'block'
        scope.$evalAsync(() => {
          var chart = new ApexCharts(element[0].querySelector('div'), angular.copy(scope.options))
          chart.render()
        })
        // setTimeout(function() {

        //   // chart.updateOptions(angular.copy(scope.options))
        // }, 100)

        // scope.$watch('options', function(val) {
        //   chart.updateOptions(angular.copy(val))
        // }, true)

      },

      template: '<div></div>'
    }
  })
  .name
