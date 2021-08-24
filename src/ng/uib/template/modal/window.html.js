angular.module('uib/template/modal/window.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('uib/template/modal/window.html', `
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card  {{size ? 'modal-' + size : ''}}" uib-modal-transclude></div>
    </div>
    `)
}])
