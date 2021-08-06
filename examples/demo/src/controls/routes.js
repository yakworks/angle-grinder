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
    }
  ]
}

export default formStates
