const flexStates = {
  name: 'flex-table',
  abstract: true,
  template: `\
  <div class="page">
    <div class="page-content">
      <div class="block"><div ui-view></div></div>
    </div>
  </div>`,
  data: {
    icon: 'mdi mdi-table-row'
  },
  children: [
    {
      name: 'card-table',
      data: { title: 'Flex Card Table' },
      component: 'flexCardDemoIndex'
      // template: require('./card-table/component.html')
    },
    {
      name: 'select-table',
      data: { title: 'Select Table' },
      template: require('./select-table/component.html')
    }
  ]
}

export default flexStates
