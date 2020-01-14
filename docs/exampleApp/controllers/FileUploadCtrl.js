import BaseCtrl from '../../../src/scripts/utils/BaseCtrl'

export default class IndexCtrl extends BaseCtrl {
  static initClass() {

    this.register("exampleApp", "fileUpload.IndexCtrl");
    this.inject("$scope", "$http");
  }

  initialize() {

    this.$scope.queue = [];

    this.$scope.loadingFiles = true;
    return this.$http.get("/api/upload/list").then(response => {
      this.$scope.queue = response.data.files || [];
      return this.$scope.loadingFiles = false;
    });
  }
}
IndexCtrl.initClass();

class FileDestroyController extends BaseCtrl {
  static initClass() {

    this.register("exampleApp", "fileUpload.FileDestroyController");
    this.inject("$scope", "$http");
  }

  initialize() {
    const {
      file
    } = this.$scope;
    let state = null;

    if (file.url) {
      file.$state = () => state;

      return file.$destroy = () => {
        state = "pending";

        const onSuccess = () => {
          state = "resolved";
          return this.$scope.clear(file);
        };

        const onError = () => state = "rejected";

        return this.$http({url: file.deleteUrl, method: file.deleteType}).then(onSuccess, onError);
      };

    } else if (!file.$cancel && !file._index) {
      return file.$cancel = function() { return this.$scope.clear(file); };
    }
  }
}
FileDestroyController.initClass();
