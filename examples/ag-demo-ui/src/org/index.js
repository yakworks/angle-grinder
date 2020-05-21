import orgform from './form/component'
import orgList from './list/component'
import search from'./searchForm'
import ShowCtrl from './show/showCtrl'
import MassUpdateFormCtrl from './massUpdate/MassUpdateFormCtrl'
import adminOrg from './adminOrgModule'
import OrgSelectOptions from './orgSelectOptions'

angular.module(adminOrg)
  .controller('org.ShowCtrl', ShowCtrl)
  .controller('org.MassUpdateFormCtrl', MassUpdateFormCtrl)
  .service('orgSelectOptions', OrgSelectOptions)

export default adminOrg
