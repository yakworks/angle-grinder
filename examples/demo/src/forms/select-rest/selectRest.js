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
    useDataObject: true,
    multiple: true,
    closeOnSelect: false,
    formatResult: (item) => {
      return `
        <table class="table table-condensed select-rest-result">
          <tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
          </tr>
        </table>`
    }
  }
}

export default angular.module('ag.demo.selectRest', [])
  .component('selRestDemo', { template, controller })
  .name
