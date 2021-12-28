import dataApiFactory from '~/store/dataApiFactory'

const componentsStates = {
  name: 'svelteDataListComponents',
  template: '<div ui-view class="view"></div>',
  abstract: true,
  data: {
    title: 'Svelte List/Grids',
    icon: 'mdi mdi-table-large'
  },
  children: [
    { name: 'simpleGrid', component: 'svelteSimpleGridzIndex' },
    {
      name: 'customerGrid',
      component: 'svelteCustGridzIndex',
      resolve: {
        dataApi: () => {
          let ds = dataApiFactory.customer
          return ds
        }
      }
    }
  ]

}

export default componentsStates
