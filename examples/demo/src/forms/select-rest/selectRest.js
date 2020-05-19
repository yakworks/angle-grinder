import template from './select-rest.html'

class controller {
  vm = {
    multiCountryData: [
      {
        "name": "United States",
        "code": "US",
        "id": 229,
        "num": "US"
      },
      {
        "name": "Ukraine",
        "code": "UA",
        "id": 226,
        "num": "UA"
      }
    ]
  }
}

export default angular.module('ag.demo.selectRest', [])
  .component('selRestDemo', { template, controller })
  .name
