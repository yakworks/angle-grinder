const componentsStates = {
  name: 'components',
  abstract: true,
  template: '<div ui-view class="fade-in-up"></div>',
  data: {
    icon: 'fas fa-plug'
  },
  // data: { title: 'Grids'},
  // ncyBreadcrumb: {
  //   label: 'Grids'
  // },
  children: [
    {
      name: 'buttons',
      component: 'buttonDemoIndex'
    },
    {
      name: 'dropdown',
      component: 'dropdownDemoIndex'
    },
    {
      name: 'contextMenu',
      component: 'contextMenuIndex'
    },
    {
      name: 'toolbar',
      component: 'toolbarDemoIndex'
    },
    {
      name: 'sweetalert',
      component: 'sweetalertDemoIndex'
    }
  ]
}

export default componentsStates
