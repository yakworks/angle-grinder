/* @ngInject */
export default class FormCtrl {
  constructor($http, orgSelectOptions) {
    this.orgSelectOptions = orgSelectOptions()
  }
}
