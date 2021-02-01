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
      name: 'elements',
      template: require('./elements/ui_elements.html'),
      title: 'Elements',
      icon: 'ti-layout-media-left-alt'
    },
    {
      name: 'icons',
      template: require('./icons/ui_icons.html')
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
      name: 'panels',
      template: require('./panels/ui_panels.html')
    },
    {
      name: 'toggle',
      template: require('./toggle/ui_toggle.html')
    },
    {
      name: 'tabs',
      children: [{name: 'basic', component: 'basicTabsExample'}, {name: 'complex', component: 'complexTabsExample'}]

    }
  ]
}

export default uiStates
