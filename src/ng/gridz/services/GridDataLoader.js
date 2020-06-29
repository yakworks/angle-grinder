import angular from 'angular'
import gridzModule from '../gridzModule'
import _ from 'lodash'

/**
 * Dataloader for grid that talks to rest interface
 */
const gridz = angular.module(gridzModule)

class GridDataLoader {
  constructor($http) {
    const $injector = angular.element(document.body).injector()
    const http = $injector.get('$http')
    // url - data source url
    // gridCtrl - grid controller instance
    return function(url, gridCtrl) { // see http://www.trirand.com/jqgridwiki/doku.php?id=wiki:retrieving_data
      return function(params) {
        gridCtrl.toggleLoading(true)
        // load grid data
        return http.get(url, { params })
          .then(function(response) {
            return gridCtrl.addJSONData(response.data)
          })
          .finally(function() {
            // list of urls for pending requests
            const pendingUrls = _.map(http.pendingRequests, it => it.url)
            if (!Array.from(pendingUrls).includes(url)) {
              gridCtrl.toggleLoading(false)
            }
          })
      }
    }
  }
}

gridz.service('GridDataLoader', GridDataLoader)
