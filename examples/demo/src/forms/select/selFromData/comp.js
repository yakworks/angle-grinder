import template from './comp.html'

class controller {
  vm = { selected: { id: 2 } } // set default value
  selectData = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ]

  sel2Opts = {
    allowClear: true,
    placeholder: 'select a foo',
    useDataObject: true,
    data: this.selectData
  }
}

const COMP = 'demoSelDataInput'
export default angular.module(`ag.demo.${COMP}`, [])
  .component(COMP, { template, controller }).name
