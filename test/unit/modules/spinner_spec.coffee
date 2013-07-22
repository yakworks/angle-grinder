describe "module: angleGrinder.spinner", ->
  beforeEach module("angleGrinder.spinner")

  describe "service: httpRequestTracker", ->
    $http = null
    httpRequestTracker = null

    beforeEach inject ($injector) ->
      httpRequestTracker = $injector.get("httpRequestTracker")
      $http = $injector.get("$http")

    describe "when no requests is progress", ->
      it "does not report pending requests", ->
        expect(httpRequestTracker.hasPendingRequests()).toBeFalsy()

    describe "when some requests are in progress", ->
      beforeEach -> $http.pendingRequests.push({})

      it "reports pending requests", ->
        expect(httpRequestTracker.hasPendingRequests()).toBeTruthy()

    describe "when jquery ajax request is in progress", ->
      beforeEach -> httpRequestTracker.jqueryAjaxRequest = true

      it "reports pending request", ->
        expect(httpRequestTracker.hasPendingRequests()).toBeTruthy()

    describe "jquery AJAX calls", ->
      describe "on ajaxStart", ->
        beforeEach inject ($timeout) ->
          httpRequestTracker.jqueryAjaxRequest = false
          jQuery.event.trigger("ajaxStart")
          $timeout.flush()

        it "it sets #jqueryAjaxRequest flag to true", ->
          expect(httpRequestTracker.jqueryAjaxRequest).toBeTruthy()

      describe "on ajaxStop", ->
        beforeEach inject ($timeout) ->
          httpRequestTracker.jqueryAjaxRequest = true
          jQuery.event.trigger("ajaxStop")
          $timeout.flush()

        it "it sets #jqueryAjaxRequest flag to false", ->
          expect(httpRequestTracker.jqueryAjaxRequest).toBeFalsy()

  describe "controller", ->
    httpRequestTracker = null
    controller = null
    $scope = null

    beforeEach inject ($injector, $rootScope, $controller) ->
      httpRequestTracker = $injector.get("httpRequestTracker")
      $scope = $rootScope.$new()
      controller = $controller "spinner",
        $scope: $scope

    describe "#showSpinner", ->
      describe "when there is a pending request", ->
        beforeEach ->
          spyOn(httpRequestTracker, "hasPendingRequests").andReturn(true)

        it "returns true", ->
          expect($scope.showSpinner()).toBeTruthy()

      describe "otherwise", ->
        beforeEach ->
          spyOn(httpRequestTracker, "hasPendingRequests").andReturn(false)

        it "returns false", ->
          expect($scope.showSpinner()).toBeFalsy()

  describe "directive: spinner", ->
    element = null

    beforeEach inject ($compile, $rootScope) ->
      $scope = $rootScope
      $scope.showSpinner = -> false

      element = angular.element """
        <spinner></spinner>
      """
      $compile(element)($scope)
      $scope.$apply()

    it "renders the spinner", ->
      img = element.find("img")

      expect(img.length).toBe(1)
      expect(img.attr("src")).toEqual("/images/ajax-loader.gif")
