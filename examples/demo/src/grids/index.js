import angular from 'angular'
import localStoreGrid from './localStoreGrid'
import customGridList from './customGridList'
import twoGrids from './twoGrids'

const gapp = angular.module('demo.gridz', [
  localStoreGrid,
  customGridList,
  twoGrids
])

export default gapp.name
