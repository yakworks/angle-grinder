import { themeColors, randomizeArray } from './chartData'

var sparklineData = [46, 44, 43, 43, 42, 42, 41, 41, 40, 40, 38, 38]

const mainColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary');

const sparkOpts = {
  chart: {
    id: 'sparkline1',
    type: 'area',
    height: 80,
    sparkline: {
      enabled: true
    }
  },
  colors: [mainColor],
  stroke: {
    width: [1],
    curve: 'straight'
  },
  fill: {
    opacity: 1
  },
  series: [{
    name: 'DSO',
    data: randomizeArray(sparklineData)
  }],
  labels: [...Array(12).keys()].map(n => `2020-${n + 1}`),
  yaxis: {
    min: 30
  },
  xaxis: {
    type: 'datetime'
  },
  tooltip: {
    x: {
      format: 'MMM'
    }
  },
  title: {
    text: 'DSO',
    offsetX: 5,
    floating: false,
    style: {
      fontSize: '24px',
      cssClass: 'apexcharts-yaxis-title',
      color: themeColors.lightText
    }
  },
  subtitle: {
    text: '38',
    offsetX: 5,
    floating: true,
    style: {
      fontSize: '24px',
      fontWeight: '600',
      cssClass: 'apexcharts-yaxis-title'
    }
  }
}

class controller {

  sparkOpts = sparkOpts
  // $onInit() {
  //   const el = this.$element[0]
  //   el.style.display = 'block'
  //   // var chart = new ApexCharts(el.querySelector("div"), angular.copy(scope.options));
  //   const chart = new ApexCharts(el.querySelector('div'), this.spark1)
  //   chart.render()
  // }
}

const template = '<div><apexcharts options="vm1.sparkOpts"></apexcharts></div>'
// const template = '<div>foo</div>'

export default () => ({
  // replace: true,
  controllerAs: 'vm1',
  scope: {},
  template: template,
  controller: controller
})
