import angular from "angular";
import adminOrg from '../org/adminOrgModule'

const MOD_NAME = 'admin.orgTabs'
export default MOD_NAME
angular.module(MOD_NAME, [adminOrg]);

