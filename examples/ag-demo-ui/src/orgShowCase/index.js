import ListCtrl from './listCtrl'
import FormCtrl from './formCtrl'
import '../org/index'
import adminOrg from '../org/adminOrgModule'

angular.module("admin.org")
  .controller("orgShowCase.FormCtrl", FormCtrl)
  .controller("orgShowCase.ListCtrl", ListCtrl);
export default adminOrg
