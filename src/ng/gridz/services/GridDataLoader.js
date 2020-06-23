import angular from 'angular'
import gridzModule from '../gridzModule'
import _ from 'lodash'

const gridz = angular.module(gridzModule)

class GridDataLoader {
  constructor($log, $http, $document) {
    // url - data source url
    // gridCtrl - grid controller instance
    return function(url, gridCtrl) { // see http://www.trirand.com/jqgridwiki/doku.php?id=wiki:retrieving_data
      return function(params, loadingDivSelector) {
        // load grid data
        const promise = $http.get(url, { params })
        promise.then(function(response) {
          $log.debug('[gridz] grid data loaded', gridCtrl, response)
          return gridCtrl.addJSONData(response.data)
        })

        // show/hide the loading animation
        const loadingEl = $document.find('#' + $.jgrid.jqID(loadingDivSelector))
        loadingEl.show()
        return promise.finally(function() {
          // list of urls for pending requests
          const pendingUrls = _.map($http.pendingRequests, it => it.url)
          // hide "Loading" for grid only if thereis no pending requests for this grid
          if (!Array.from(pendingUrls).includes(url)) {
            return loadingEl.hide()
          }
        })
      }
    }
  }
}

gridz.service('GridDataLoader', GridDataLoader)
