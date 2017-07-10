gridz = angular.module("angleGrinder.gridz")

# Creates select2 component along with the "show" button
# Options:
#   `select-options` takes select2 options from the controller
#   `ng-model` takes a model
gridz.directive "agSelect2", [
  "$rootScope", "$compile", "$log", "pathWithContext",
  ($rootScope, $compile, $log, pathWithContext) ->
    restrict: "E"
    replace: true
    transclude: true

    scope:
      selectOptions: "="
      ngModel: "="

    compile: (element, attrs, transclude) ->
      # find a template for the result item
      resultTemplate = null
      scope = $rootScope.$new()

      transclude scope, (clone) ->
        for element in clone
          if element instanceof HTMLElement and element.getAttribute("ag-select2-result")?
            resultTemplate = element.outerHTML
            break

      # pre linking function
      pre: (scope, element, attrs) ->
        options = angular.copy scope.selectOptions or {multiple: false}
        if attrs.selectMultiple?
          options.multiple = attrs.selectMultiple == "true"
        scope.options = options

        # read `minimumInputLength` option from the attribute
        options.minimumInputLength ?= 1
        scope.showFill = attrs.fillAll and attrs.fillAll is "true"
        if attrs.selectMinimumInputLength?
          options.minimumInputLength = parseInt(attrs.selectMinimumInputLength)
        if attrs.selectAll?
          options.minimumInputLength = 0
        # set the default `width`
        options.width ?= "resolve"

        # create `ajax`
        if not options.ajax? and attrs.selectAjaxUrl?
          options.ajax =
            url: pathWithContext(attrs.selectAjaxUrl)
            data: (term, page) ->
              q: term # search term (query params)
              max: 20, page: page
              sort: "name", order: "asc"
            results: (data, page) ->
              more = page < data.total
              results: data.rows, more: more

          # read `quietMillis` option from the attribute
          # Number of milliseconds to wait for the user to
          # stop typing before issuing the ajax request
          options.ajax.quietMillis = 500
          if attrs.selectAjaxQuietMillis?
            options.ajax.quietMillis = parseInt(attrs.selectAjaxQuietMillis)

        # create `formatResult` function from the given template
        if resultTemplate?
          options.formatResult ?= (item) ->

            options = interpolate: /\{\{(.+?)\}\}/g
            angular.element(_.template(resultTemplate, { item: item }, options))

        # create default `formatSelection` method
        options.formatSelection ?= (item) -> item.name

        $log.debug "[forms] initializing AgSelect2 component", scope.options

    template: """
      <div class="input-group">
        <input ui-select2="options" ng-model="ngModel" class="form-control" type="hidden"/>
        <select-fill ng-if="showFill"></select-fill>
      </div>

    """
]

gridz.directive "agSelect2Open", ->
  restrict: "E"
  replace: true
  scope: true
  controller: ["$scope", "$element", ($scope, $element) ->
    $scope.openSelect2 = ->
      selectEl = $element.parent().find(".select2-container")
      selectEl.select2 "open"
      return
  ]
  template: """
      <span class="input-group-btn">
        <button class="btn open-select2 btn-default " type="button" ng-click="openSelect2()"><i class="fa fa-search"></i></button>
      </span>
  """

gridz.directive "selectFill", [
  "$http", "pathWithContext", "$parse",
  ($http,pathWithContext, $parse) ->
    restrict: "E"
    replace: true
    priority: 2000
    link: (scope, $element, attrs) ->
      scope.fill = ->
        selectEl= $element.parent().parent().find("div[select-ajax-url]")[0]
        $http.get(pathWithContext(selectEl.attributes['select-ajax-url'].value)).then (resp)->
          model = $parse(selectEl.attributes['ng-model'].value)
          model.assign scope.$parent.$parent, resp.data.rows
    template: """
       <span class="input-group-btn">
         <button class="btn open-select2 btn-default " type="button" ng-click="fill()"><i class="fa fa-truck"></i></button>
       </span>
  """
]
