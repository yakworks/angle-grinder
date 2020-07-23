import appState from 'angle-grinder/src/tools/AppState'

/**
 * Main Application Controller
 */
class AppCtrl {
  constructor($rootScope, $scope, $document, $timeout, cfpLoadingBar, $transitions) {
    this.$rootScope = $rootScope
    this.$scope = $scope
    this.layout = appState.layout

    // this.routerTransitionsEvents()
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
    })

    $rootScope.pageTitle = function() {
      return appState.pageTitle
    }

    // global function to scroll page up
    $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 600)
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

      // Desktop
      if (newValue.w >= 1024) {
        appState.layout.isDektop = true
        appState.layout.isSidebarFixed = true
        appState.layout.isSidenavFixed = true
      } else {
        appState.layout.isDektop = false
        appState.layout.isSidebarFixed = false
        appState.layout.isSidenavFixed = false
      }
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

  }

  toggleSidenav() {
    appState.sidenav.open = !appState.sidenav.open
  }
}

const app = angular.module('app')
app.controller('AppCtrl', AppCtrl)
