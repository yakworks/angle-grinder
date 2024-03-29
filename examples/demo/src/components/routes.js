const componentsStates = {
  name: 'ngComponents',
  abstract: true,
  template: `\
  <div class="page">
    <div class="page-content">
      <div class="block"><div ui-view></div></div>
    </div>
  </div>`,
  // template: '<div ui-view class="fade-in-up"></div>',
  data: {
    title: 'ng Components',
    icon: 'fas fa-plug'
  },
  // data: { title: 'Grids'},
  // ncyBreadcrumb: {
  //   label: 'Grids'
  // },
  children: [
    {
      name: 'avatars',
      component: 'avatarDemoIndex'
    },
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
      name: 'toolbar',
      component: 'toolbarDemoIndex'
    }
  ]
}

export default componentsStates
