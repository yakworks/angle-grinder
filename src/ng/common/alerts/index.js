import angular from 'angular'
import Alerts from './Alerts'

const MOD_NAME = 'angleGrinder.alerts'
export default MOD_NAME

angular.module(MOD_NAME, [])
  .value('alertTimeout', 3000)
  .service('alerts', Alerts)
