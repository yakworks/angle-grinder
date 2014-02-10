gridz = angular.module("angleGrinder.gridz")

# Service that handles pagination of an array of ids
gridz.value "idsArrayPager", (rowId, ids = []) ->
  # parse an array of row ids
  ids = [] if ids is ""
  ids = _.map(ids.split(","), (id) -> parseInt(id)) if typeof ids is "string"

  # return number of elements in the array
  length: -> ids.length

  # return the current row index
  currIndex: -> ids.indexOf(rowId)

  # return the previous id
  prev: -> @_get(@currIndex() - 1)

  # return the next id
  next: -> @_get(@currIndex() + 1)

  # @private
  _get: (indx) ->
    # slide to the end
    return ids[ids.length - 1] if indx < 0

    # slide to the beginning
    return ids[0] if indx > ids.length - 1

    # return next/prev id
    return ids[indx]

# Directive that creates a pager on the show page
# Example:
#   <div class="pager" ag-show-page-pager="user" ng-show="showPager()">
#     <a ui-sref="examples.users.show({ id: prevId(), ids: ids })">&#8592; prev</a> |
#     <a ui-sref="examples.users.show({ id: nextId(), ids: ids })">next &#8594;</a>
#   </div>
gridz.directive "agShowPagePager", [
  "$parse", "$stateParams", "$log", "idsArrayPager",
  ($parse, $stateParams, $log, idsArrayPager) ->
    restrict: "A"
    scope: true

    link: (scope, element, attrs) ->
      # get the current row from the parent scope
      row = $parse(attrs.agShowPagePager)(scope)
      $log.debug("current row:", row)

      # assing raw ids array to the scope
      # TODO make sure it works
      scope.ids = $stateParams.ids
      $log.debug("row ids:", scope.ids)

      # initialize the pager
      pager = idsArrayPager(row.id, scope.ids)

      # hide the pager when ids array is not given
      scope.showPager = -> pager.length() > 0

      # publish `next` and `prev` pager methods to the scope
      scope.prevId = -> pager.prev()
      scope.nextId = -> pager.next()
]

# Intercept all click events on links with `with-pager` class
# and append an array of ids from the current grid view to the path prams
# Example:
#  <div ag-grid="gridOptions"
#       ag-grid-with-pager="true"
#       ag-grid-name="orgGrid"></div>
gridz.directive "agGridWithPager", [
  "$state", "$log", ($state, $log) ->
    restrict: "A"

    # require grid controller
    require: "^agGrid"

    # TODO fix specs
    link: (scope, element, attrs, gridCtrl) ->

      # listen for click events on all links with the pager
      element.on "click", "a.with-pager", (event) ->
        event.preventDefault()

        $a = $(this)
        $log.debug("intercept click on", $a)

        # grab the row id and the state name
        # TODO raise an error when `row-id` or `ui-sref` is not defined
        id = $a.data("row-id")
        sref = $a.data("ui-sref")

        # grab ids from th current grid view
        ids = gridCtrl.getIds().join(",")

        # navigate to the show page with array of ids
        $state.go(sref, id: id, ids: ids)
]
