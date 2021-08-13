import template from './component.html'
import chartSparkline from './chartSparkline'
import chartSparkline2 from './chartSparkline2'
import chartBar from './chartBar'
import chartColumn from './chartColumn'

const comps = angular.module('ag.demo.chartsComps', [])
  .directive('chartSparkline', chartSparkline)
  .directive('chartSparkline2', chartSparkline2)
  .directive('chartBar', chartBar)
  .directive('chartColumn', chartColumn)
  .name

class controller {
  foo = 'bar'
}

export default angular.module('ag.demo.chartPage', [
  comps
])
  .component('chartsDemo', { template, controller })
  .name
