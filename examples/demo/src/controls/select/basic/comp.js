import template from './comp.html'

/* @ngInject */
class controller {
  colorData = ['red', 'green', 'blue']
  dayData = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  fooData = [
    { id: 1, name: 'Foo 1' },
    { id: 2, name: 'Foo 2' },
    { id: 3, name: 'Foo 3' },
    { id: 4, name: 'Foo bar bazz buzz' },
    { id: 5, name: 'buzz blaz big' }
  ]

  custApiData = { results: () => this.customerApi.pickList() }

  constructor(localStoreApi) {
    this.customerApi = localStoreApi.customer
  }

  // $onInit() {
  //   this.custApiData = { results: () => this.customerApi.pickList() }
  // }
}

const COMP = 'demoSelInput'
export default angular.module(`ag.demo.${COMP}`, [])
  .component(COMP, { template, controller }).name
