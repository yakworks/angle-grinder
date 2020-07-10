import template from './comp.html'

/* @ngInject */
class controller {
  vm = {
    singleColor: 'blue',
    multiColorTags: ['red', 'blue'],
    singlePickId: 1,
    singlePick: { id: 2 },
    multiPick: [
      {
        "id": 1,
        "name": "Option 1"
      },
      {
        "id": 2,
        "name": "Option 2"
      }
    ],
    custRest: {
      "id": 6,
      "num": 'foo',
      "name": "Thoughtstorm"
    },
    custRestMulti: [
      {
        "id": 5,
        "num": 'foo',
        "name": "Quimm"
      },
      {
        "id": 6,
        "name": "Thoughtstorm"
      }
    ]
  }
  vm2 = {
    singleColor: 'yellow',
    multiColorTags: ['yellow', 'blue'],
    singlePick: { id: 3 },
    multiPick: [
      {
        "id": 3,
        "name": "Option 3"
      }
    ]
  }

  picklistData = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ]
  colorData = ['red','blue','yellow']

  singleColorOpts = {
    //useDataObject: false,
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

  custApiData = { results: () => this.customerApi.pickList() }

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

  constructor(restDataStore) {
    this.customerApi = restDataStore.customerApi
  }

  changeModelData(){
    this.vm = this.vm2
  }
  clearData(){
    this.vm = {}
  }
}

const COMP = 'demoSelDataInput'
export default angular.module(`ag.demo.${COMP}`, [])
  .component(COMP, { template, controller }).name
