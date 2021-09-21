import template from './comp.html'
import { colors, days, people } from '../../../data/sample'

/* @ngInject */
class controller {
  colorData = colors
  dayData = days
  // get just id and name from people data
  peopleData = people.map(p => {
    return { id: p.id, name: p.name }
  })

  custApiData = { results: () => this.customerApi.picklist() }

  constructor(localStoreApi) {
    this.customerApi = localStoreApi.customer
  }

  // $onInit() {
  //   this.custApiData = { results: () => this.customerApi.picklist() }
  // }
}

const COMP = 'demoSelInput'
export default angular.module(`ag.demo.${COMP}`, [])
  .component(COMP, { template, controller }).name
