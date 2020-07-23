import angular from 'angular'
import agGridMod from './ag-grid'
import formsMod from './forms'
import alertsMod from './alerts'

const MOD_NAME = 'ag.legacy'
export default MOD_NAME

angular.module(MOD_NAME, [
  agGridMod,
  formsMod,
  alertsMod
])
