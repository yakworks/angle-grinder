/* eslint-disable no-unused-vars */
import angular from 'angular'
import gridzModule from './gridzModule'
import _ from 'lodash'

var gridz = angular.module(gridzModule)

gridz.controller('gridPagerCtrlMixin', [
  '$log', '$scope', '$parse', '$location', '$q', 'gridName', 'currentId', 'path',
  function($log, $scope, $parse, $location, $q, gridName, currentId, path) {
    const currIdGetter = $parse(currentId)
    const currIdSetter = currIdGetter.assign

    // watch for the current id changes
    $scope.$watch(currentId, function(id, oldId) {
      if (_.isNil(id)) { return }
      if (id === oldId) { return }

      return $location.path(path.replace(':id', id))
    })

    // retrieve the grid
    const getGrid = () => $parse(gridName)($scope)

    // retrieve row ids on the current grid view
    const getGridIds = () => getGrid().getIds()

    // load the previous page and yields row ids
    const prevGridPage = function() {
      const deferred = $q.defer()

      const promise = getGrid().prevPage()
      promise.then(function() {
        const ids = getGridIds()
        $log.debug('[agGrid] previous page was loaded', ids)
        return deferred.resolve(ids)
      })

      return deferred.promise
    }

    // load the next page and yields new ids
    const nextGridPage = function() {
      const deferred = $q.defer()

      const promise = getGrid().nextPage()
      promise.then(function() {
        const ids = getGridIds()
        $log.debug('[agGrid] next page was loaded', ids)
        return deferred.resolve(ids)
      })

      return deferred.promise
    }

    // get the current state
    const getCurrent = function() {
      const ids = getGridIds()
      return [ids, ids.indexOf(currIdGetter($scope).toString())]
    }

    this.goTo = function(index) {
      // console.log(index)
      const [ids, indx] = Array.from(getCurrent())
      return currIdSetter($scope, ids[index])
    }

    this.getIndex = function() {
      const ids = getGridIds()
      return ids.indexOf(currIdGetter($scope).toString())
    }

    this.getIds = () => getGridIds()

    // return true when a grid in the background is loaded
    // and the pager can be displayed
    this.show = () => !_.isNil(getGrid())

    // return true when the current row is not the first one
    this.hasPrevRow = function() {
      const [ids, indx] = Array.from(getCurrent())

      if (!getGrid().isFirstPage()) { return true }
      return indx !== 0
    }

    // return true when the current row is not the last one
    this.hasNextRow = function() {
      const [ids, indx] = Array.from(getCurrent())

      if (!getGrid().isLastPage()) { return true }
      return indx !== (ids.length - 1)
    }

    // navigates to the previous row
    this.prevRow = function() {
      const [ids, indx] = Array.from(getCurrent())

      if (indx > 0) {
        // get the previous id from the cached array of row ids
        return currIdSetter($scope, ids[indx - 1])
      } else {
        // load the previos page and get the last id
        return prevGridPage().then(ids => currIdSetter($scope, ids[ids.length - 1]))
      }
    }

    // navigates to the next row
    this.nextRow = function() {
      const [ids, indx] = Array.from(getCurrent())

      if (indx < (ids.length - 1)) {
        // get the next id from the cached array of row ids
        return currIdSetter($scope, ids[indx + 1])
      } else {
        // load the next page and get the first id
        return nextGridPage().then(ids => currIdSetter($scope, ids[0]))
      }
    }

    return this
  }
])
