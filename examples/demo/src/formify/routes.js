const componentsStates = {
  name: 'svelteFormify',
  template: '<div ui-view class="view"></div>',
  abstract: true,
  data: {
    title: 'Formify',
    icon: 'mdi mdi-table-large'
  },
  children: [
    {
      name: 'basic',
      component: 'formifyBasicIndex'
    }
  ]

}

export default componentsStates
