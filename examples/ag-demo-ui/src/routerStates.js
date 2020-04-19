const orgEditState = {
  name: 'edit',
  url: '/{id}',
  template: require('../public/templates/tabbedOrg/show.html'),
  controller: 'org.ShowCtrl',
  sidenavItem: false,
  resolve: {
    org: ['$transition$', 'resourceResolver', ($transition$, resourceResolver) => resourceResolver($transition$.params().id)]
  }
}

const orgCreate = {
  name: 'create',
  url: '/create',
  component: 'orgForm',
  resolve: { org: ['Resource', Resource => new Resource()] }
}

const orgListStates = {
  name: 'list',
  component: 'orgList'
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
  template: require('../public/templates/user/list.html'),
  controller: 'user.ListCtrl',
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
  name: 'app',
  template: require('./packet/index.html')
}

export const fresh = {
  ...baseState,
  name: 'app',
  component: 'freshApp'
}

export default { packet, fresh }
// export default appRoot
