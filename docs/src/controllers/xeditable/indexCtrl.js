import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'

export default class IndexCtrl extends BaseCtrl {
  static initClass() {

    this.register("exampleApp", "xeditable.IndexCtrl");
    this.inject("$scope", "exampleGrid", "sampleData");
  }

  initialize() {
    this.$scope.title = "X-editable";

    this.$scope.contracts = [
      {name: "first", id: 1}
    ,
      {name: "second", id: 2}
    ];

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
