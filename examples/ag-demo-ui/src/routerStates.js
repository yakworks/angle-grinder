const orgEditState = {
  name: 'edit',
  url: '/{id}',
  template: require('../public/templates/org/form.html'),
  controller: 'org.FormCtrl',
  sidenavItem: false,
  resolve: {
    org:  ($transition$, resourceResolver) => resourceResolver($transition$.params().id)
  }
}

const orgCreate = {
  name: 'create',
  url: '/create',
  controller: 'org.FormCtrl',
  template: require('../public/templates/org/form.html'),
  resolve: { org: ['Resource', Resource => new Resource()] }
}

const orgListStates = {
  name: 'list',
  url: '',
  // template: require("./dashboards/dashboard.html"),
  template: require('../public/templates/org/list.html'),
  controller: 'org.ListCtrl',
}

const org = {
  name: 'org',
  abstract: true,
  url: '/org',
  data: {
    icon: 'mdi mdi-monitor-dashboard'
  },
  children: [orgListStates, orgEditState, orgCreate]
}

const userStates = {
  name: 'user',
  // template: require("./dashboards/dashboard.html"),
  template: require('../public/templates/user/list.html'),
  controller: 'user.ListCtrl',
  // resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
  data: {
    icon: 'mdi mdi-monitor-dashboard'
  }
}


const baseState = {
  abstract: true,
  children: [org, userStates]
}

export const packet = {
  ...baseState,
  name: 'packet',
  url: '/packet',
  template: require('./packet/index.html'),
}

export const fresh = {
  ...baseState,
  name: 'fresh',
  url: '/fresh',
  component: 'freshApp'
}

export default { packet, fresh }
// export default appRoot
