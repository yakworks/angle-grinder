<script>
  import { ApexChart } from '@yakit/svelte'
  import { themeColors, randomizeArray, primaryColor, secondaryColor } from './chartHelpers'

  const options = {
    series: [{
      name: 'Disputes',
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      show: false,
      categories: ['Walmart', 'Costco', 'Binnys', 'Space X', 'Zerohedge', 'Wild Flower', 'Swig',
        'El Rancho', 'Acme Corp', 'Bobs'
      ],
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '14px',
          // fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        }
      }
    },
    grid: {
      show: false
    },
    colors: [secondaryColor],
    fill: {
      opacity: 0.5
    }
  }

</script>

<!-- <div use:chart={options}>
</div> -->
<ApexChart {options}></ApexChart>
