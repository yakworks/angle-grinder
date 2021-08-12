import { themeColors, randomizeArray } from './chartData'

const sparkOpts = {
  series: [{
    name: 'Ratio',
    data: [2.3, 3.1, 4.0, 10.1, 4.0]
  }],
  chart: {
    height: 200,
    type: 'bar',
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%";
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ["#304758"]
    }
  },
  xaxis: {
    categories: ["May", "Jun", "Jul", "Aug", "Sep"],
    // position: 'top',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        }
      }
    },
    tooltip: {
      enabled: true,
    }
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val) {
        return val + "%";
      }
    }

  },
  colors: [themeColors.green, themeColors.secondary, themeColors.orange],
  title: {
    text: 'Profit Evolution',
    align: 'left',
    offsetX: 5,
    offsetY: 5,
    floating: false,
    style: {
      fontSize: '16px',
      cssClass: 'apexcharts-yaxis-title',
      color: themeColors.lightText
    }
  },
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
