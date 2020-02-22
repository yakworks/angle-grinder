const template = `
<div class="example-section mb-4">
  <div class="example is-vertical">
    <div class="example-component" ng-transclude>
    </div>
    <div class="codeview">
      <demo-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' max-height="{{$ctrl.maxHeight}}"></demo-snippet>
    </div>
  </div>
</div>
`

class controller {
  // $onInit() {
  //   this.maxHeight = this.maxHeight || '300px'
  //   console.log("rawHtml", this.rawHtml)
  // }
}

// Define and export component
export default {
  transclude: true,
  bindings: {
    rawHtml: '<',
    rawJs: '<',
    rawMd: '<',
    maxHeight: '@'
  },
  controller,
  template
};
