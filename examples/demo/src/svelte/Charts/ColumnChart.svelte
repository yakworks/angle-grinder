<script>
  import { ApexChart } from '@yakit/svelte'
  import { chart } from '@yakit/svelte/Charts/apexChartRender'
  import { themeColors, randomizeArray } from './chartHelpers'

  const options = {
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
    colors: [themeColors.success, themeColors.secondary, themeColors.secondary],
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

</script>

<!-- <div use:chart={options}>
</div> -->
<ApexChart {options}></ApexChart>
