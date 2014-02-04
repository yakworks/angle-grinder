forms = angular.module("angleGrinder.forms")

forms.directive "agPanelsRow", ->
  restrict: "C"
  controller: ["$log", "$scope", "$element", "$timeout", ($log, $scope, $element, $timeout) ->
    # an array with all panels in the current row
    @panels = []

    equalizeHeights = =>
      # get the max height
      heights = @panels.map (panel) -> panel.height()
      maxHeight = Math.max.apply(null, heights)

      $log.debug "[agPanelsRow] equalizing heights for", $element, "max height is #{maxHeight}px"

      # iterate thought all panels and re-calculate the height
      for $panel in @panels
        # default padding
        paddings = 30

        # add heading and footer
        paddings += $panel.find(".panel-heading").outerHeight()
        paddings += $panel.find(".panel-footer").outerHeight()

        $panel.find(".panel-body").css("min-height", maxHeight - paddings)

    unregister = $scope.$watch ->
      # do nothing when the element is not visible
      # for instance the tab isn't active
      return unless $element.is(":visible")

      # equzlize heights
      $timeout -> equalizeHeights()

      # unredister the watch because it should run only once
      unregister()

    return
  ]

forms.directive "agPanel", ->
  restrict: "C"
  require: "^agPanelsRow"

  link: (scope, element, attrs, ctrl) ->

    # add the current panel to the stack
    ctrl.panels.push(element)
