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
    }
  ]
}

export default componentsStates
