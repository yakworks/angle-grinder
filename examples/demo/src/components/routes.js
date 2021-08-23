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
      name: 'cards',
      component: 'cardsDemoIndex'
    },
    {
      name: 'charts',
      component: 'chartsDemoIndex'
    },
    {
      name: 'colors',
      component: 'colorsDemoIndex'
    },
    {
      name: 'contextMenu',
      component: 'contextMenuIndex'
    },
    {
      name: 'letter-icons',
      component: 'letterIcons'
    },
    {
      name: 'lists',
      component: 'listsDemoIndex'
    },
    {
      name: 'modals',
      template: require('./modals/ui_modals.html')
    },
    {
      name: 'sweetalert',
      component: 'sweetalertDemoIndex'
    },
    {
      name: 'tabs',
      children: [{ name: 'basic', component: 'basicTabsExample' }, { name: 'complex', component: 'complexTabsExample' }]

    },
    {
      name: 'tiles-cards',
      data: {
        title: 'Tiles & Cards'
      },
      component: 'tilesCardsIndex'
    },
    {
      name: 'toast',
      template: require('./toast/toast.html')
    },
    {
      name: 'toolbar',
      component: 'toolbarDemoIndex'
    }
  ]
}

export default componentsStates
