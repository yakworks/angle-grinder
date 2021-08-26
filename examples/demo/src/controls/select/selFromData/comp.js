import template from './comp.html'

class controller {
  vm = {
    singleColor: 'blue',
    multiColorTags: ['red', 'blue'],
    singlePickId: 1,
    singlePick: { id: 2 },
    multiPick: [
      {
        id: 1,
        name: 'Option 1'
      },
      {
        id: 2,
        name: 'Option 2'
      }
    ],
    custRest: {
      id: 2,
      num: 'foo',
      name: 'Yodo'
    },
    custRestMulti: [
      {
        id: 2,
        num: 'foo',
        name: 'Yodo'
      },
      {
        id: 3,
        name: 'Omba'
      }
    ]
  }

  vm2 = {
    singleColor: 'yellow',
    multiColorTags: ['yellow', 'blue'],
    singlePick: { id: 3 },
    multiPick: [
      {
        id: 3,
        name: 'Option 3'
      }
    ]
  }

  picklistData = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ]

  colorData = ['red', 'blue', 'yellow']

  singleColorOpts = {
    // useDataObject: false,
    data: this.colorData
  }

  multiColorOpts = {
    useDataObject: false,
    multiple: true,
    data: this.colorData
  }

  singlePickOpts = {
    useDataObject: true,
    initSelection: true,
    data: this.picklistData
  }

  multiPickOpts = {
    useDataObject: true,
    multiple: true,
    closeOnSelect: false,
    data: this.picklistData,
    showSelectAll: true
  }

  custApiData = { results: () => this.customerApi.picklist() }

  custRestOpts = {
    useDataObject: true,
    data: this.custApiData
  }

  custRestMultiOpts = {
    useDataObject: true,
    multiple: true,
    closeOnSelect: false,
    data: this.custApiData,
    showSelectAll: true
  }

  constructor(localStoreApi) {
    this.customerApi = localStoreApi.customer
  }

  changeModelData(){
    this.vm = this.vm2
  }

  clearData(){
    this.vm = {}
  }
}
controller.$inject = ['localStoreApi']
const COMP = 'demoSelDataInput'
export default angular.module(`ag.demo.${COMP}`, [])
  .component(COMP, { template, controller }).name
