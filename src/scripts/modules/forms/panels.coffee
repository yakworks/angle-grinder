forms = angular.module("angleGrinder.forms")

forms.directive "agPanelsRow", ->
  restrict: "C"
  controller: ["$scope", "$element", ($scope, $element) ->
    # an array with all panels in the current row
    @panels = []

    unregister = $scope.$watch =>
      # do nothing when the element is not visible
      # for instance the tab isn't active
      return unless $element.is(":visible")

      # get the max height
      heights = @panels.map (panel) -> panel.height()
      maxHeight = Math.max.apply(null, heights)

      # iterate thought all panels and re-calculate the height
      for $panel in @panels
        paddings = 30

        # add heding and footer
        paddings += $panel.find(".panel-heading").outerHeight()
        paddings += $panel.find(".panel-footer").outerHeight()

        $panel.find(".panel-body").css("min-height", maxHeight - paddings)

      unregister()

    return
  ]

forms.directive "agPanel", ->
  restrict: "C"
  require: "^agPanelsRow"

  link: (scope, element, attrs, ctrl) ->

    # add the current panel to the stack
    ctrl.panels.push(element)
