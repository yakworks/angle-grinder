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

  userSelectOpts = {
    minimumInputLength: 0,
    multiple: true,
    closeOnSelect: true,
    formatResult: (item) => {
      return `
        <div>${item.name}</div>
        <small>&lt;${item.email}></small>
        <hr class="my-0">
      `
    }
  }
}

export default angular.module('ag.demo.selectRest', [])
  .component('selRestDemo', { template, controller })
  .name
