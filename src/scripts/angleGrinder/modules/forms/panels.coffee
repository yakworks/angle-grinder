forms = angular.module("angleGrinder.forms")

forms.value "getRealPanelHeight", (el) ->
  bodyEl = el.find(".panel-body:visible")
  oldHeight = bodyEl.height()

  bodyEl.css("min-height", "auto")
  height = el.height()
  bodyEl.css("min-height", oldHeight)

  return height

forms.directive "agPanelsRow", [
  "getRealPanelHeight", (getHeight) ->
    restrict: "C"
    controller: ->
      @panels = []

      @registerPanel = (el) ->
        @panels.push($(el))

      @maxHeight = ->
        highest = _.max(@panels, (el) -> getHeight(el))
        getHeight(highest)

      # returns true when all panels are equalized
      @allEqual = ->
        heights = _.chain(@panels).map((el) -> getHeight(el)).value()
        _.all(heights, (height) -> height is heights[0])

      @equalize = ->
        return if @allEqual()

        maxHeight = @maxHeight()

        angular.forEach @panels, (el) ->
          bodyEl = el.find(".panel-body")

          # default padding
          paddings = parseInt(bodyEl.css("padding-top")) + parseInt(bodyEl.css("padding-bottom"))

          # add heading and footer
          paddings += el.find(".panel-heading").outerHeight()
          paddings += el.find(".panel-footer").outerHeight()

          bodyEl.css("min-height", maxHeight - paddings)

      return this
]

forms.directive "agPanel", [
  "getRealPanelHeight", (getHeight) ->
    restrict: "C"
    require: "^agPanelsRow"

    link: (scope, element, attrs, ctrl) ->

      # add the current panel to the stack
      ctrl.registerPanel(element)

      elementHeight = -> getHeight(element)
      scope.$watch elementHeight, -> ctrl.equalize()
]
