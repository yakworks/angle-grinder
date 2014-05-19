gridz = angular.module "angleGrinder.gridz"

gridz.service "agGridDataLoader", [
  "$log", "$http", "$document",
  ($log, $http, $document) ->

    # Creates custom defined function for retrieving jgGrid data.
    # url - data source url
    # gridCtrl - grid controller instance
    (url, gridCtrl) ->

      # see http://www.trirand.com/jqgridwiki/doku.php?id=wiki:retrieving_data
      (params, loadingDivSelector) ->
        # load grid data
        promise = $http.get(url, params: params)
        promise.then (response) ->
          $log.debug "[gridz] grid data loaded", gridCtrl, response
          gridCtrl.addJSONData(response.data)

        # show/hide the loading animation
        loadingEl = $document.find("##{$.jgrid.jqID(loadingDivSelector)}")
        loadingEl.show()
        promise.finally -> loadingEl.hide()
]
