/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class IndexCtrl extends BaseCtrl {
  static initClass() {
  
    this.register("exampleApp", "panels.IndexCtrl");
    this.inject("$scope", "exampleGrid", "sampleData");
  }

  initialize() {
    this.$scope.title = "Panels";

    this.$scope.contents = [];

    this.$scope.addContent = () => {
      const content = { body: `new row [${new Date()}]` };
      return this.$scope.contents.push(content);
    };

    this.$scope.removeContent = () => {
      return this.$scope.contents.pop();
    };

    this.data = this.sampleData.generate(100);
    this.$scope.data = this.data;

    const selectedRow = function() { return this.$log.debug("exampleGrid selected row:", arguments); }.bind(this);
    this.$scope.gridOptions = this.exampleGrid({data: this.data, onSelectRow: selectedRow});
    this.$scope.otherGridOptions = this.exampleGrid({data: this.data, pager: false});
    return this.$scope.selectedRowsData = [];
  }
}
IndexCtrl.initClass();
