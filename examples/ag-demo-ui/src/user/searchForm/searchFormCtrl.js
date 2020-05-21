/* @ngInject */
export default class SearchForm {
  vm = {
    search: {contact: {type: []}},
    contactTypeSelectOptions: {
      multiple: true,
      simple_tags: true,
      tags: ['admin', 'customer']
    }
  }
}
