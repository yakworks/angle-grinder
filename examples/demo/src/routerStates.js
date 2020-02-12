
const dashStates = {
  name: 'dashboard',
  // template: require("./dashboards/dashboard.html"),
  template: require('./dashboards/dashyak.html'),
  // resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
  data: {
    icon: 'fa fa-home'
  }
}

const formStates = {
  name: 'forms',
  template: '<div ui-view class="fade-in-up"></div>',
  data: {
    icon: 'fa fa-flask'
  },
  abstract: true,
  children: [
    {
      name: 'input-components',
      template: require('./forms/input-components/index.html')
    },
    {
      name: 'validations',
      template: require('./forms/validations/index.html')
    },
    {
      name: 'horizontal-examples',
      template: require('./forms/horizontal-examples/index.html')
    },
    {
      name: 'select2',
      template: require('./forms/select2/index.html')
    },
    {
      name: 'elements',
      template: require('./forms/form_elements.html')
    },
    {
      name: 'xeditable',
      template: require('./forms/form_xeditable.html'),
      data: { title: 'X-Editable Elements' }
      // ncyBreadcrumb: {
      //   label: 'Grids'
      // },
    }
  ]
}

const uiStates = {
  name: 'ui',
  template: '<div ui-view class="fade-in-up"></div>',
  abstract: true,
  data: {
    title: 'UI Elements',
    icon: 'fa fa-file-text-o'
  },
  children: [
    {
      name: 'alerts',
      template: require('./ui/alerts/alerts.html')
    },
    {
      name: 'elements',
      template: require('./ui/elements/ui_elements.html'),
      title: 'Elements',
      icon: 'ti-layout-media-left-alt'
    },
    {
      name: 'buttons',
      template: require('./ui/buttons/ui_buttons.html')
    },
    {
      name: 'icons',
      template: require('./ui/icons/ui_icons.html')
    },
    {
      name: 'letter-icons',
      component: 'letterIcons'
    },
    {
      name: 'modals',
      template: require('./ui/modals/ui_modals.html')
    },
    {
      name: 'panels',
      template: require('./ui/panels/ui_panels.html')
    },
    {
      name: 'toggle',
      template: require('./ui/toggle/ui_toggle.html')
    },
    {
      name: 'tabs',
      template: require('./ui/tabs/ui_tabs.html')
    }
  ]
}

const gridsStates = {
  name: 'grids',
  abstract: true,
  template: '<div ui-view class="fade-in-up"></div>',
  data: {
    icon: 'fa fa-table '
  },
  // data: { title: 'Grids'},
  // ncyBreadcrumb: {
  //   label: 'Grids'
  // },
  children: [
    {
      name: 'edit',
      template: require('./grids/list.html'),
      controller: 'gridExample.ListCtrl',
      controllerAs: '$ctrl'
    }
  ]
}

const componentsStates = {
  name: 'components',
  abstract: true,
  template: '<div ui-view class="fade-in-up"></div>',
  data: {
    icon: 'fa fa-plug '
  },
  // data: { title: 'Grids'},
  // ncyBreadcrumb: {
  //   label: 'Grids'
  // },
  children: [
    {
      name: 'dropdown',
      component: 'dropdownDemoIndex'
    }
  ]
}

const appRoot = {
  name: 'app',
  url: '/app',
  template: require('./app.html'),
  abstract: true,
  children: [dashStates, componentsStates, formStates, uiStates, gridsStates]
}

export default appRoot
