(function() {
  var $rootScope
  // var $$http
  /* eslint-disable no-empty */
  /* globals window document angular */
  function $$await(v) {
    if (!$rootScope && typeof angular !== 'undefined') {
      var $el = angular.element(document.body)
      var $injector = $el.injector
      if (typeof $injector === 'function') {
        $rootScope = $injector.call($el).get('$rootScope')
        // $$http = $injector.call($el).get('$http')
      }
    }

    $rootScope && $rootScope.$$phase == null && $rootScope.$applyAsync()
    return v
  }

  window.$$await = $$await
})()
