const gridsStates = {
  name: 'grids',
  abstract: true,
  template: '<div ui-view class="fade-in-up"></div>',
  data: {
    icon: 'mdi mdi-table-large'
  },
  children: [
    {
      name: 'vanilla-agGridList',
      data: { title: 'Vanilla rest agGridList'},
      abstract: 'fresh.grid.vanilla-agGridList.list',
      url: '/customer',
      children: [{
        name: 'list',
        isMenuItem: false,
        url: '',
        component: 'agGridList'
      },{
        name: 'Edit Customer',
        isMenuItem: false,
        url: '/:id',
        component: 'customRestEditDemo'
      }],
      resolve: {
        apiKey: () => "customer",
        notification: () => ({
          class: "is-primary is-light",
          text: "Uses ui-router to send rest apiKey to generic agGridList component"
        })
      }
    },
    {
      name: 'vanilla-initSearch',
      data: { title: 'Vanilla init search'},
      abstract: 'fresh.grid.vanilla-agGridList.list',
      url: '/customer',
      children: [{
        name: 'list',
        isMenuItem: false,
        url: '',
        component: 'agGridList'
      },{
        name: 'Edit Customer',
        isMenuItem: false,
        url: '/:id',
        component: 'customRestEditDemo'
      }],
      resolve: {
        apiKey: () => "customer",
        initSearch: () => ({name: 'Yodo'}),
        notification: () => ({
          class: "is-primary is-light",
          text: "Uses ui-router to send rest apiKey to generic agGridList component"
        })
      }
    },
    {
      name: 'editOnly-agGridList',
      url: '/tag',
      component: 'agGridList',
      data: { title: 'Edit Only agGridList'},
      resolve: {
        apiKey: () => "tag",
        notification: () => ({
          class: "is-primary is-light",
          text: "Uses ui-router to send rest apiKey to generic agGridList component, configured to only allow editing desc"
        })
      }
    },
    {
      name: 'two-grids',
      data: { title: 'Two grids'},
      component: 'twoGrids'
    },
    {
      name: 'override-rest-grid',
      data: { title: 'Custom Grid Component'},
      component: 'basicGridRestIndex'
    },
    {
      name: 'basic-grid',
      component: 'basicGridIndex',
      url: '/foo'
    },
    {
      name: 'Legacy Demo Grid',
      component: 'legacyGridIndex'
    }
    // {
    //   name: 'Rest Demo Grid',
    //   component: 'restGridExample'
    // }
  ]
}

export default gridsStates
