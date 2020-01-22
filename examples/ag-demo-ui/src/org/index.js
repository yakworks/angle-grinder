import ListCtrl from './listCtrl'
import FormCtrl from './formCtrl'
import ShowCtrl from './showCtrl'
import MassUpdateFormCtrl from './MassUpdateFormCtrl'
import adminOrg from './adminOrgModule'

angular.module("admin.org")
  .controller("org.FormCtrl", FormCtrl)
  .controller("org.ListCtrl", ListCtrl)
  .controller("org.ShowCtrl", ShowCtrl)
  .controller("org.MassUpdateFormCtrl", MassUpdateFormCtrl)

export default adminOrg
