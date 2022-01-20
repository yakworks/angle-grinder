<script>
  import { onMount } from 'svelte'
  import { ApexChart } from '@yakit/svelte'
  import { themeColors, randomizeArray, primaryColor, secondaryColor} from './chartHelpers'

  // let options
  let sparklineData = [46, 44, 43, 43, 42, 42, 41, 41, 40, 40, 38, 38]
  let labels = [...Array(12).keys()].map(n => `2020-${n + 1}`)

  // sparkOpts.colors = [themeColors.secondary]
  // sparkOpts.labels = labels
  // sparkOpts.series[0].data = randomizeArray(sparklineData)
  // sparkOpts.title.style.color: themeColors.lightText
  let options = {
    chart: {
      id: 'sparkline1',
      type: 'area',
      height: 80,
      sparkline: {
        enabled: true
      }
    },
    colors: [themeColors.secondary],
    stroke: {
      width: [1],
      curve: 'straight'
    },
    fill: {
      opacity: 1
    },
    series: [{
      name: 'DSO',
    }],
    labels: labels,
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
      }
    },
    subtitle: {
      align: 'right',
      text: '38',
      offsetX: -5,
      offsetY: 3,
      floating: true,
      style: {
        fontSize: '24px',
        fontWeight: '600',
        cssClass: 'apexcharts-yaxis-title'
      }
    }
  }

  // options.colors = ['orange','white']
  options.labels = labels
  options.series[0].data = randomizeArray(sparklineData)
  options.title.style.color = themeColors.lightText

</script>

<ApexChart {options} ></ApexChart>

