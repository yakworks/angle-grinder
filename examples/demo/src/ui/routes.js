const uiStates = {
  name: 'ui',
  template: '<div ui-view class="fade-in-up"></div>',
  abstract: true,
  data: {
    title: 'UI Elements',
    icon: 'fas fa-flask'
  },
  children: [
    {
      name: 'alerts',
      template: require('./alerts/alerts.html')
    },
    {
      name: 'letter-icons',
      component: 'letterIcons'
    },
    {
      name: 'modals',
      template: require('./modals/ui_modals.html')
    },
    {
      name: 'tabs',
      children: [{ name: 'basic', component: 'basicTabsExample' }, { name: 'complex', component: 'complexTabsExample' }]

    }
  ]
}

export default uiStates
