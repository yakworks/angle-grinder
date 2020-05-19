import template from './comp.html'

class controller {
  vm = {
    selected: { id: 2 },
    selectedColors: ['red', 'blue'],
    selectedMulti: [
      {
        "id": 1,
        "name": "Option 1"
      },
      {
        "id": 2,
        "name": "Option 2"
      }
    ]
  }

  selectData = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ]

  sel2Opts = {
    // placeholder: 'select a foo',
    useDataObject: true,
    data: this.selectData
  }

  multiOpts = {
    placeholder: 'select many foos',
    useDataObject: true,
    multiple: true,
    data: this.selectData
  }
  multiTagsOpts = {
    placeholder: 'select some tags',
    multiple: true,
    data: ['red','blue','yellow']
  }
}

const COMP = 'demoSelDataInput'
export default angular.module(`ag.demo.${COMP}`, [])
  .component(COMP, { template, controller }).name
