import appState from 'angle-grinder/src/tools/AppState'
/**
 * Main Application Controller
 */
const app = angular.module('app')
app.controller('AppCtrl',
  function($rootScope, $scope, $state, $window, $document, $timeout, Fullscreen, cfpLoadingBar, $transitions) {
    var $win = $($window); var $body = $('body')

    // the ui-router events, see https://stackoverflow.com/a/43553641
    $transitions.onStart({}, function(trans) {
      // start loading bar on stateChangeStart
      cfpLoadingBar.start()
      $scope.horizontalNavbarCollapsed = true
    })

    // the ui-router events, see https://stackoverflow.com/a/43553641
    $transitions.onSuccess({}, function(trans) {
      // stop loading bar on stateChangeSuccess
      $scope.$on('$viewContentLoaded', function(event) {
        cfpLoadingBar.complete()
      })

      // scroll top the page on change state
      $('#app .main-content').css({
        position: 'relative',
        top: 'auto'
      })

      $('footer').show()

      window.scrollTo(0, 0)

      if (angular.element('.email-reader').length) {
        angular.element('.email-reader').animate({
          scrollTop: 0
        }, 0)
      }

      // Save the route title
      $rootScope.currTitle = $state.current.data.title
    })

    $rootScope.pageTitle = function() {
      return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description)
    }

    var defaultlayout = $scope.app.defaultLayout
    // save settings to local storage
    var slay = localStorage.getItem('yak-layout')
    if (slay !== null) {
      $scope.app.layout = angular.copy(slay)
    }

    $scope.resetLayout = function() {
      $scope.loading_reset = true
      // start loading
      $timeout(function() {
        localStorage.removeItem('yak-layout')
        $scope.app.layout = angular.copy($rootScope.app.defaultLayout)
        $scope.loading_reset = false
        // stop loading
      }, 500)
    }
    $scope.saveLayout = function() {
      $scope.loading_save = true
      // start loading
      $timeout(function() {
        localStorage.setItem('yak-layout', angular.copy($scope.app.layout))
        // $localStorage.lay = angular.copy($scope.app.layout);
        $scope.loading_save = false
        // stop loading
      }, 500)
    }
    $scope.setLayout = function() {
      $scope.app.layout.isNavbarFixed = false
      $scope.app.layout.isSidebarClosed = false
      $scope.app.layout.isSidebarFixed = false
      $scope.app.layout.isFooterFixed = false
      $scope.app.layout.isBoxedPage = false
    }

    // global function to scroll page up
    $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 600)
    }

    // Fullscreen
    $scope.isFullscreen = false
    $scope.goFullscreen = function() {
      $scope.isFullscreen = !$scope.isFullscreen
      if (Fullscreen.isEnabled()) {
        Fullscreen.cancel()
      } else {
        Fullscreen.all()
      }

      // Set Fullscreen to a specific element (bad practice)
      // Fullscreen.enable( document.getElementById('img') )
    }

    // Function that find the exact height and width of the viewport in a cross-browser way
    var viewport = function() {
      var e = window; var a = 'inner'
      if (!('innerWidth' in window)) {
        a = 'client'
        e = document.documentElement || document.body
      }
      return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
      }
    }
    // function that adds information in a scope of the height and width of the page
    $scope.getWindowDimensions = function() {
      return {
        h: viewport().height,
        w: viewport().width
      }
    }
    // Detect when window is resized and set some variables
    $scope.$watch($scope.getWindowDimensions, function(newValue, oldValue) {
      $scope.windowHeight = newValue.h
      $scope.windowWidth = newValue.w

      if (newValue.w >= 992) {
        $scope.isLargeDevice = true
      } else {
        $scope.isLargeDevice = false
      }
      if (newValue.w < 992) {
        $scope.isSmallDevice = true
      } else {
        $scope.isSmallDevice = false
      }
      if (newValue.w <= 768) {
        $scope.isMobileDevice = true
      } else {
        $scope.isMobileDevice = false
      }
    }, true)
    // Apply on resize
    $win.on('resize', function() {
      $scope.$apply()
      if ($scope.isLargeDevice) {
        $('#app .main-content').css({
          position: 'relative',
          top: 'auto',
          width: 'auto'
        })
        $('footer').show()
      }
    })

    $scope.foo = 'bar'
  }
)
