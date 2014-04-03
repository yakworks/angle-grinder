gridz = angular.module("angleGrinder.gridz")

gridz.controller "gridPagerCtrlMixin", [
  "$log", "$scope", "$parse", "$location", "$q", "gridName", "currentId", "path"
  ($log, $scope, $parse, $location, $q, gridName, currentId, path) ->

    currIdGetter = $parse(currentId)
    currIdSetter = currIdGetter.assign

    # watch for the current id changes
    $scope.$watch currentId, (id, oldId) ->
      return unless id?
      return if id is oldId

      $location.path path.replace(":id", id)

    # retrieve the grid
    getGrid = -> $parse(gridName)($scope)

    # retrieve row ids on the current grid view
    getGridIds = ->
      getGrid().getIds()

    # load the previous page and yields row ids
    prevGridPage = ->
      deferred = $q.defer()

      promise = getGrid().prevPage()
      promise.then ->
        ids = getGridIds()
        $log.debug "[agGrid] previous page was loaded", ids
        deferred.resolve(ids)

      deferred.promise

    # load the next page and yields new ids
    nextGridPage = ->
      deferred = $q.defer()

      promise = getGrid().nextPage()
      promise.then ->
        ids = getGridIds()
        $log.debug "[agGrid] next page was loaded", ids
        deferred.resolve(ids)

      deferred.promise

    # get the current state
    getCurrent = ->
      ids = getGridIds()
      [ids, ids.indexOf(currIdGetter($scope).toString())]

    # return true when a grid in the background is loaded
    # and the pager can be displayed
    @show = -> getGrid()?

    # navigates to the previous row
    @prevRow = ->
      [ids, indx] = getCurrent()

      if indx > 0
        # get the previous id from the cached array of row ids
        currIdSetter $scope, ids[indx - 1]
      else
        # load the previos page and get the last id
        prevGridPage().then (ids) -> currIdSetter $scope, ids[ids.length - 1]

    # navigates to the next row
    @nextRow = ->
      [ids, indx] = getCurrent()

      if indx < ids.length - 1
        # get the next id from the cached array of row ids
        currIdSetter $scope, ids[indx + 1]
      else
        # load the next page and get the first id
        nextGridPage().then (ids) -> currIdSetter $scope, ids[0]

    return this
]
