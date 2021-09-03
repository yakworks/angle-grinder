import ApexCharts from "apexcharts"
window.ApexCharts = ApexCharts;

export const chart = (node, options) => {
  const myChart = new ApexCharts(node, options)
  myChart.render()

  return {
    update(options) {
      myChart.updateOptions(options)
    },
    destroy() {
      myChart.destroy()
    }
  }
}
