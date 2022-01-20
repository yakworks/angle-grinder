<script>
  import { ApexChart } from '@yakit/svelte'
  import { themeColors, randomizeArray } from './chartHelpers'

  var sparklineData = [472, 454, 547, 385, 562, 247, 652, 318, 379, 391, 622, 515, 355, 415, 358, 271, 932, 534, 615, 278, 546, 435, 192, 465];

  const sparkOpts = {
    chart: {
      id: 'sparkline1',
      // group: 'sparklines',
      type: 'area',
      height: 130,
      sparkline: {
        enabled: true
      }
    },
    colors: [themeColors.primary],
    stroke: {
      width: [2],
      curve: 'straight'
    },
    fill: {
      opacity: 1
    },
    series: [{
      name: 'Total Sales',
      data: randomizeArray(sparklineData)
    }],
    labels: [...Array(24).keys()].map(n => `2020-10-0${n + 1}`),
    yaxis: {
      min: 0
    },
    xaxis: {
      type: 'datetime'
    },
    title: {
      text: 'Total Sales',
      offsetX: 5,
      style: {
        fontSize: '24px',
        cssClass: 'apexcharts-yaxis-title',
        color: themeColors.lightText
      }
    },
    subtitle: {
      text: '9,374',
      offsetX: 5,
      style: {
        fontSize: '24px',
        fontWeight: '600',
        cssClass: 'apexcharts-yaxis-title'
      }
    }
  }

</script>

<ApexChart options={sparkOpts}></ApexChart>
