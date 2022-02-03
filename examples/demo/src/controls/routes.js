const formStates = {
  name: 'form-controls',
  template: `\
  <div class="page">
    <div class="page-content">
      <div class="block"><div ui-view></div></div>
    </div>
  </div>`,
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
      name: 'date5',
      component: 'date5DemoIndex'
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
