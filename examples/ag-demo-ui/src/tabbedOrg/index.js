import orgShowCaseCtrl from './orgShowCaseCtrl'
import ShowCtrl from './showCtrl'
import adminOrgTabs from './tabbedOrgModule'
import FormCtrl from '../user/formCtrl'

angular.module(adminOrgTabs)
  .controller("user.FormCtrl", FormCtrl)
  .controller("tabbedOrg.orgShowCaseCtrl", orgShowCaseCtrl)
  .controller("tabbedOrg.ShowCtrl", ShowCtrl);
export default adminOrgTabs
