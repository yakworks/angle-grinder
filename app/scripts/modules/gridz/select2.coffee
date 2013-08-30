gridz = angular.module("angleGrinder.gridz")

# Creates select2 component along with the "show" button
# Options:
#   `select-options` takes select2 options from the controller
#   `ng-model` takes a model
gridz.directive "agSelect2", [
  "$rootScope", "$compile", "pathWithContext",
  ($rootScope, $compile, pathWithContext) ->
    restrict: "E"
    replace: true
    transclude: true

    scope:
      selectOptions: "="
      ngModel: "="

    compile: ($element, attrs, transclude) ->
      # find a template for the result item
      resultTemplate = null
      scope = $rootScope.$new()
      transclude scope, (clone) ->
        for element in clone
          if element instanceof HTMLElement and element.getAttribute("ag-select2-result")?
            resultTemplate = element.outerHTML
            break

      # pre linking function
      pre: ($scope, element, attrs) ->
        options = angular.copy $scope.selectOptions or {}
        $scope.options = options

        # read `minimumInputLength` option from the attribute
        options.minimumInputLength or= 1
        if attrs.selectMinimumInputLength?
          options.minimumInputLength = parseInt(attrs.selectMinimumInputLength)

        # set the default `minimumInputLength`

        # set the default `width
        options.width or= "resolve"

        # create `ajax`
        if not options.ajax? and attrs.selectAjaxUrl?
          options.ajax =
            url: pathWithContext(attrs.selectAjaxUrl)
            data: (term, page) ->
              q: term # search term (query params)
              max: 20, page: page
              sort: "name", order: "asc"
            results: (result, page) ->
              more = page < result.total
              results: result.rows, more: more

          # read `quietMillis` option from the attribute
          # Number of milliseconds to wait for the user to
          # stop typing before issuing the ajax request
          options.ajax.quietMillis = 500
          if attrs.selectAjaxQuietMillis?
            options.ajax.quietMillis = parseInt(attrs.selectAjaxQuietMillis)

        # create `formatResult` function from the given template
        if resultTemplate?
          options.formatResult or= (item) ->
            scope = $scope.$new()
            scope.item = item

            resultElement = angular.element(resultTemplate)
            $compile(resultElement)(scope)

        # create default `formatSelection` method
        options.formatSelection or= (item) -> item.name

        # bind `click` event on the open button
        element.find("button.open").click ->
          element.find("input").select2 "open"

    template: """
      <div>
        <input ui-select2="options" multiple ng-model="ngModel" type="text"/>
        <button class="btn open" type="button">
          <i class="icon-search"></i>
        </button>
      </div>
    """
]
