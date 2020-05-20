import orgShowCaseCtrl from './orgShowCaseCtrl'
import ShowCtrl from './showCtrl'
import adminOrgTabs from './tabbedOrgModule'
import FormCtrl from '../user/form/formCtrl'

var module = angular.module(adminOrgTabs)
module
  .controller('user.FormCtrl', FormCtrl)
  .controller('tabbedOrg.orgShowCaseCtrl', orgShowCaseCtrl)
  .controller('tabbedOrg.ShowCtrl', ShowCtrl)

module.config(function(resourceBuilderProvider) {
  resourceBuilderProvider.setRestContext('/api')
})
export default adminOrgTabs
