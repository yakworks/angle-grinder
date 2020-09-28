
const dashStates = {
  name: 'dashboard',
  // template: require("./dashboards/dashboard.html"),
  template: require('./dashboards/dashyak.html'),
  // resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
  data: {
    icon: 'mdi mdi-monitor-dashboard'
  }
}

const formStates = {
  name: 'controls',
  template: '<div ui-view class="fade-in-up"></div>',
  data: {
    icon: 'mdi mdi-id-card'
  },
  abstract: true,
  children: [
    {
      name: 'inputs',
      component: 'agInputDemoIndex'
    },
    {
      name: 'input-wildcard',
      component: 'agInputWildcardIndex'
    },
    {
      name: 'input-list',
      component: 'agInputListDemoIndex'
    },
    {
      name: 'amount',
      component: 'agAmountDemoIndex'
    },
    {
      name: 'textarea',
      component: 'textareaDemoIndex'
    },
    {
      name: 'selects',
      component: 'sel2DemoIndex'
    },
    {
      name: 'selects-rest',
      component: 'selRestDemoIndex'
    },
    {
      name: 'checkbox',
      component: 'checkboxDemoIndex'
    },
    {
      name: 'datepicker',
      component: 'datepickerDemoIndex'
    },
    {
      name: 'formly-example',
      component: 'agFormlyDemoIndex'
    },
    {
      name: 'xedit',
      component: 'xeditDemoIndex'
    },
    {
      name: 'validations',
      component: 'validationDemoIndex'
    },
    {
      name: 'horizontal-sandbox',
      template: require('./controls/horizontal-sandbox/index.html')
    },
    {
      name: 'select2-sandbox',
      component: 'select2DemoIndex'
    }
  ]
}

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
      template: require('./ui/alerts/alerts.html')
    },
    {
      name: 'elements',
      template: require('./ui/elements/ui_elements.html'),
      title: 'Elements',
      icon: 'ti-layout-media-left-alt'
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
      children: [{name: 'basic', component: 'basicTabsExample'}, {name: 'complex', component: 'complexTabsExample'}]

    }
  ]
}

const gridsStates = {
  name: 'grids',
  abstract: true,
  template: '<div ui-view class="fade-in-up"></div>',
  data: {
    icon: 'mdi mdi-table-large'
  },
  children: [
    {
      name: 'Edit Customer',
      isMenuItem: false,
      url: '/customer/:id',
      component: 'customRestEditDemo'
    },
    {
      name: 'vanilla-agGridList',
      url: '/customer',
      component: 'agGridList',
      data: { title: 'Vanilla rest agGridList'},
      resolve: {
        apiKey: () => "customer",
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

const levelStates = {
  name: 'levels',
  abstract: true,
  template: '<div ui-view class="fade-in-up"></div>',
  data: {
    icon: 'fas fa-plug '
  },
  children: [
    {
      name: 'Foo Fuzz',
      children: [
        {
          name: 'level3a',
          data: {
            title: 'Foo Bar Baz Buzz Boogaloo',
          },
          template: '<h4>level3a</h4>'
        },
        {
          name: 'level3b',
          template: '<h4>level3b</h4>'
        }
      ]
    },
    {
      name: 'Bar Bazz',
      children: [
        {
          name: 'level3c',
          data: {
            title: 'Bar Bazz Boogaloo',
          },
          template: '<h4>level3c</h4>'
        },
        {
          name: 'level3d',
          template: '<h4>level3d</h4>'
        }
      ]
    },
  ]
}

export const packet = {
  name: 'packet',
  url: '/packet',
  template: require('./packet/index.html'),
  abstract: true,
  children: [dashStates, componentsStates, formStates, uiStates, gridsStates]
}

export const fresh = {
  name: 'fresh',
  url: '/fresh',
  component: 'freshApp',
  abstract: true,
  children: [dashStates, componentsStates, formStates, uiStates, gridsStates,levelStates]
}

export default { packet, fresh }
// export default appRoot
