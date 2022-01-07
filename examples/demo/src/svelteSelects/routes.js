const componentsStates = {
  name: 'svelteSelectComponents',
  template: '<div ui-view class="view"></div>',
  abstract: true,
  data: {
    title: 'Svelte Selects',
    icon: 'mdi mdi-table-large'
  },
  children: [
    {
      name: 'simple',
      component: 'svelteSimpleSelectsIndex'
    },
    {
      name: 'simple-id',
      component: 'svelteSimpleSelectsIdIndex'
    },
    {
      name: 'select-in-list',
      component: 'svelteSelectsInListIndex'
    },
    {
      name: 'rest',
      component: 'svelteRestSelectsIndex'
    }
  ]

}

export default componentsStates
