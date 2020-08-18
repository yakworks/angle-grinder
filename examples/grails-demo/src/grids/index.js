import angular from 'angular'
import customGridList from './customGridList'
import store from '../store'

const gapp = angular.module('demo.gridz', [
  customGridList,
  store
])

export default gapp.name

