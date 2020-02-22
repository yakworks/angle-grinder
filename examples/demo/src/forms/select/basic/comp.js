import template from './comp.html';
import {convertSelect2Data} from 'angle-grinder/scripts/select2/helpers'

class controller {

  colorData = ['red', 'green']

  colorOpts = {
    data: convertSelect2Data(this.colorData)
  }
}

const COMP = 'demoSelInput'
export default angular.module(`ag.demo.${COMP}`, [])
  .component(COMP, { template, controller}).name
