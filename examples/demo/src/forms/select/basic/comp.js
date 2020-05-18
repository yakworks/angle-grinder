import template from './comp.html'
import { convertSelect2Data } from 'angle-grinder/src/ng/select2/helpers'

class controller {
  colorData = ['red', 'green', 'blue']
  dayData = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

  colorOpts = {
    data: convertSelect2Data(this.colorData)
  }

  fooOpts = {
    allowClear: true,
    // placeholder: 'select a foo',
    useDataObject: true,
    data: [
      { id: 1, name: 'Foo 1' },
      { id: 2, name: 'Foo 2' },
      { id: 3, name: 'Foo 3' }
    ]
  }
}

const COMP = 'demoSelInput'
export default angular.module(`ag.demo.${COMP}`, [])
  .component(COMP, { template, controller }).name
