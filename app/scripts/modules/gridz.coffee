gridz = angular.module("angleGrinder.gridz", ["ui.select2"])

gridz.directive "agGrid", [
  "hasSearchFilters", (hasSearchFilters) ->
    link = ($scope, element, attrs) ->
      $grid = $("#grid", element)

      gridOptions = $scope.$eval(attrs.agGrid)
      $grid.gridz(gridOptions)

      invokeEditItemDialogFor = (id) ->
        $scope.$apply -> $scope.editDialog id

      # flash the given row
      flashRowFor = (item, complete = ->) ->
        $row = $($grid[0].rows.namedItem(item.id))

        $row.css "background-color", "#DFF0D8"
        $row.delay(100).fadeOut "medium", ->
          $row.css "background-color", ""

        $row.fadeIn "fast", -> complete()

      # handles click on edit action insite the dropdown menu
      $grid.on "editAction", (event, id) ->
        event.preventDefault()
        invokeEditItemDialogFor(id)

      # handles click on the cell with `editActionLink` formatter
      $grid.on "click", "a.editActionLink", (event) ->
        event.preventDefault()
        id = $(this).parents("tr:first").attr("id")
        invokeEditItemDialogFor(id)

      $grid.on "deleteAction", (event, id) ->
        event.preventDefault()
        $scope.$apply -> $scope.deleteItem id

      # emit `gridzLoadComplete` event
      $grid.on "jqGridAfterLoadComplete", ->
        $scope.$broadcast "gridzLoadComplete"

      # catch broadcast event after save. This will need to change
      $scope.$on "itemUpdated", (event, item) ->
        if $grid.jqGrid("getInd", item.id)
          $grid.jqGrid "setRowData", item.id, item
        else
          $grid.jqGrid "addRowData", item.id, item, "first"

        flashRowFor item

      $scope.$on "itemDeleted", (event, item) ->
        flashRowFor item, ->
          $grid.jqGrid "delRowData", item.id

      $scope.$on "searchUpdated", (event, filters) ->
        params =
          search: hasSearchFilters(filters)
          postData: filters: JSON.stringify(filters)

        $grid.setGridParam(params).trigger "reloadGrid"

    restrict: "A"
    template: """
              <table id="grid"></table>
              <div id="gridPager"></div>
              """
    link: link
]

# Takes a nested Javascript object and flatten it.
# see: https://github.com/hughsk/flat
gridz.value "flatten", (target, opts = delimiter: ".") ->
  delimiter = opts.delimiter

  getKey = (key, prev) ->
    if prev then prev + delimiter + key else key

  step = (object, prev) ->
    angular.forEach Object.keys(object), (key) ->
      isArray = opts.safe and object[key] instanceof Array
      type = Object::toString.call(object[key])
      isObject = type is "[object Object]" or type is "[object Array]"

      return step(object[key], getKey(key, prev)) if not isArray and isObject
      output[getKey(key, prev)] = object[key]

  output = {}
  step target
  output

# Retunrs true if `filters` contain at least one non-empty search field
hasSearchFilters = (filters) ->
  for _, value of filters
    continue unless value?

    if typeof value is "string"
      return true if $.trim(value) isnt ""
    else
      return true

  return false

gridz.value "hasSearchFilters", hasSearchFilters

gridz.directive "agSearchButton", ->
  restrict: "E"
  replace: true
  template: """
    <button type="button" ng-click="advancedSearch(search)" ng-class="{disabled: searching}" class="btn btn-info">
      <i class="icon-search icon-white"></i> Search<span ng-show="searching">...</span>
    </button>
  """

gridz.directive "agResetSearchButton", ->
  restrict: "E"
  replace: true
  template: """
    <button type="button" ng-click="resetSearch()" ng-class="{disabled: searching}" class="btn">
      <i class="icon-remove"></i> Reset<span ng-show="searching">...</span>
    </button>
  """

gridz.directive "agSearchForm", ["$rootScope", ($rootScope) ->
  restrict: "A"
  scope: false
  link: ($scope, element, attrs) ->
    $scope.searching = false
    $scope.search = {}

    # Trigger search action for the grid
    $scope.advancedSearch = (search) ->
      $scope.searching = true
      $rootScope.$broadcast "searchUpdated", search

    # Listen to grid load complete action
    $scope.$on "gridzLoadComplete", ->
      $scope.searching = false

    # Reset the search form and trigger grid reload
    $scope.resetSearch = ->
      $scope.search = {}
      $scope.advancedSearch($scope.search)
]

# Creates select2 component along with the "show" button
# Options:
#   `select-options` takes select2 options from the controller
#   `ng-model` takes a model
gridz.directive "agSelect2", ["$rootScope", "$compile", ($rootScope, $compile) ->
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
    pre: ($scope, $element, attrs) ->
      options = angular.copy $scope.selectOptions or {}
      $scope.options = options

      # set the default `minimumInputLength`
      options.minimumInputLength or= 1

      # set the default `width
      options.width or= "resolve"

      # create `ajax`
      if not options.ajax? and attrs.selectAjaxUrl?
        options.ajax =
          url: attrs.selectAjaxUrl
          quietMillis: 500 # Number of milliseconds to wait for the user to stop typing before issuing the ajax request
          data: (term, page) ->
            q: term # search term (query params)
            max: 20, page: page
            sort: "name", order: "asc"
          results: (result, page) ->
            more = page < result.total
            results: result.rows, more: more

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
      $element.find("button.open").click ->
        $element.find("input").select2 "open"

  template: """
    <div>
      <input ui-select2="options" multiple ng-model="ngModel" type="text"/>
      <button class="btn open" type="button">
        <i class="icon-search"></i>
      </button>
    </div>
  """
]
