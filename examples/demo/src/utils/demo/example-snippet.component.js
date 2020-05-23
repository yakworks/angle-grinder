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
  /* @ngInject */
  constructor($element, $timeout) {
    this.$element = $element
    this.$timeout = $timeout
  }
  $postLink() {
    this.$timeout(() => {
      let eComp = $(this.$element).find('.example-component')
      $(this.$element).find('.hljs-container').css('max-height', eComp.innerHeight() - 50);
    })
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
}
