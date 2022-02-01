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
    },
    {
      name: 'dynamicForm',
      component: 'formifyDynamicIndex'
    },
    {
      name: 'dynamicColsForm',
      component: 'formifyDynamicColsIndex'
    },
    {
      name: 'searchForm',
      component: 'formifySearchIndex'
    }
  ]

}

export default componentsStates
