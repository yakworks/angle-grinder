import _ from 'lodash'

const template = `
<div class="example-section mb-4">
  <div class="example" ng-class="$ctrl.direction">
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

  $onInit() {
    this.direction = !_.isUndefined(this.isHorizontal) ? 'is-horizontal' : 'is-vertical'
  }

  $postLink() {
    this.$timeout(() => {
      const eComp = $(this.$element).find('.example-component')
      const srcHeight = eComp.innerHeight() - 32
      $(this.$element).find('.hljs-container').css('max-height', (srcHeight < 300) ? 300 : srcHeight)
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
    maxHeight: '@',
    isHorizontal: '@'
  },
  controller,
  template
}
