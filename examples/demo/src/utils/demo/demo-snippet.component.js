let template = `
<uib-tabset class="tabbable" active="active">
  <uib-tab index="0" heading="html" ng-if="$ctrl.rawHtml">
    <div hljs hljs-source="$ctrl.rawHtml" hljs-language="html"></div>
  </uib-tab>
  <uib-tab heading="javascript" ng-if="$ctrl.rawJs">
    <perfect-scrollbar class="scroller sidebar-container" style="max-height: {{$ctrl.maxHeight}}; position: relative;">
      <div hljs hljs-source="$ctrl.rawJs" hljs-language="javascript"></div>
    </perfect-scrollbar>
  </uib-tab>
  <uib-tab heading="docs" ng-if="$ctrl.rawMd">
    <div class='api-docs' markdown-to-html="$ctrl.rawMd"></div>
  </uib-tab>
</uib-tabset>
`

class controller {
  $onInit() {
    this.maxHeight = this.maxHeight || '300px'
  }
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
