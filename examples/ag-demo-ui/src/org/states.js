const orgEditState = {
  name: 'edit',
  url: '/{id}',
  template: require('../../public/templates/tabbedOrg/show.html'),
  controller: 'org.ShowCtrl',
  sidenavItem: false,
  resolve: {
    org: ['$transition$', 'resourceResolver', ($transition$, resourceResolver) => resourceResolver($transition$.params().id)]
  }
}

const orgCreate = {
  name: 'create',
  url: '/create',
  sidenavItem: false,
  component: 'orgForm',
  resolve: { org: ['Resource', Resource => new Resource()] }
}

const orgListStates = {
  name: 'list',
  sidenavItem: false,
  url:'/',
  component: 'orgList'
}

export default {
  name: 'org',
  abstract: true,
  url: '^',
  data: {
    href: 'org',
    title: 'Org',
    icon: 'mdi mdi-monitor-dashboard'
  },
  children: [orgListStates, orgEditState, orgCreate]
}
