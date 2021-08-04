
const dashStates = {
  name: 'dashboard',
  // template: require("./dashboards/dashboard.html"),
  template: require('./dashboards/dashyak.html'),
  // resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
  data: {
    icon: 'mdi mdi-monitor-dashboard'
  }
}

const gridsStates = {
  name: 'grids',
  abstract: true,
  template: '<div ui-view class="fade-in-up"></div>',
  data: {
    icon: 'fa fa-table '
  },
  children: [
    {
      name: 'customer',
      component: 'agGridList',
      data: { title: 'Vanilla rest agGridList' },
      resolve: {
        apiKey: () => "customer",
        notification: () => ({
          class: "is-primary is-light",
          text: "Uses ui-router to send rest apiKey to generic agGridList component"
        })
      }
    },
    {
      name: 'override-rest-grid',
      data: { title: 'Custom Grid Comp'},
      component: 'basicGridRestIndex'
    }
  ]
}

export const fresh = {
  name: 'grails',
  url: '/grails',
  component: 'freshApp',
  abstract: true,
  children: [dashStates, gridsStates]
}

export default { fresh }
// export default appRoot
