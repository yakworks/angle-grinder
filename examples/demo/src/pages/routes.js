const componentsStates = {
  name: 'pages',
  abstract: true,
  template: '<div ui-view class="fade-in-up"></div>',
  data: {
    icon: 'mdi mdi-book-open-page-variant'
  },
  children: [
    {
      name: 'show',
      data: {
        title: 'Customer'
      },
      component: 'orgShowDemoIndex'
    },
    {
      name: 'ngSvelteShim',
      component: 'ngSvelteDemoIndex'
    },
    {
      name: 'batch',
      data: { title: 'Intelligent Auto-Cash' },
      abstract: 'rcm.receivables.arBatch.list',
      url: '/batch',
      resolve: {
        apiKey: () => 'batch'
      },
      children: [{
        name: 'list',
        isMenuItem: false,
        url: '',
        component: 'batchList'
      }, {
        name: 'Edit Batch',
        isMenuItem: false,
        url: '/:id',
        component: 'batchEdit'
      }]
    }
  ]
}

export default componentsStates
