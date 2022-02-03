<script>
  import { onMount } from 'svelte'
  import { ApexChart } from '@yakit/svelte'
  import { themeColors, randomizeArray, secondaryColor } from './chartHelpers'
  import ky from 'ky'

  // let options
  let sparklineData = [46, 44, 43, 43, 42, 42, 41, 41, 40, 40, 38, 38]
  let labels = [...Array(12).keys()].map(n => `2020-${n + 1}`)

  // sparkOpts.colors = [themeColors.secondary]
  // sparkOpts.labels = labels
  // sparkOpts.series[0].data = randomizeArray(sparklineData)
  // sparkOpts.title.style.color: themeColors.lightText
  export let options

  onMount(async () => {
    const chartCfgs = await ky.get('/data/charts.json').json();

    let opts = chartCfgs.dsoSparkLine

    opts.colors = [secondaryColor]
    opts.labels = labels
    opts.series[0].data = randomizeArray(sparklineData)
    opts.title.style.color = themeColors.lightText

    options = opts

	});
</script>

<ApexChart {options} ></ApexChart>

