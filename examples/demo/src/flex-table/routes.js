const flexStates = {
  name: 'flex-table',
  abstract: true,
  template: '<div ui-view class="fade-in-up"></div>',
  data: {
    icon: 'mdi mdi-table-row'
  },
  children: [
    {
      name: 'card-table',
      data: { title: 'Flex Card Table' },
      template: require('./card-table/component.html')
    },
    {
      name: 'select-table',
      data: { title: 'Select Table' },
      template: require('./select-table/component.html')
    }
  ]
}

export default flexStates
