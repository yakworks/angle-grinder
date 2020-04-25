import angular from 'angular'
import adminOrg from '../org/adminOrgModule'
import layout from '../layout/app.module'

const MOD_NAME = 'admin.orgTabs'
angular.module(MOD_NAME, [adminOrg, layout])
export default MOD_NAME
