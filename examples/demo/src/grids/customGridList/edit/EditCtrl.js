import _ from "lodash";

export default class EditCtrl {
  vm={}
  /* @ngInject */
  constructor($stateParams, dataStoreApi) {
    this.$stateParams = $stateParams
    this.dataStoreApi = dataStoreApi
  }

  async $onInit() {
    this.dataApi = this.dataStoreApi[this.apiKey]
    this.vm = await this.dataApi.get(this.$stateParams.id)
  }
}
