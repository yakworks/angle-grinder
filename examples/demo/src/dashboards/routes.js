const dashStates = {
  name: 'dashboard',
  // template: require("./dashboards/dashboard.html"),
  template: require('./dashyak.html'),
  // resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
  data: {
    icon: 'mdi mdi-monitor-dashboard'
  }
}

export default dashStates
