app = angular.module "angleGrinder.common"

app.directive "agSideMenu", [
  "$window", "$timeout", ($window, $timeout)->
    restrict: "A"

    link: (scope, element, attr) ->
      headerHeight = 0
      elScrollTopOriginal = 0
      $timeout ->
        header = angular.element(document.getElementById(attr.header))
        elScrollTopOriginal = element.offset().top
        headerHeight = angular.element(header)[0].offsetHeight if angular.element(header)[0]?

      window = angular.element($window)
      window.bind 'scroll', ()->
        if window[0].pageYOffset > headerHeight
          element.css('position', 'fixed').css('top', "#{attr.offset}px")
        if window[0].pageYOffset <= headerHeight
          element.css('position', 'relative')
]
